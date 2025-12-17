import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cluster from 'cluster';
import os from 'os';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";

dotenv.config();

// --- SCALABILITY: CLUSTERING ---
const numCPUs = os.cpus().length;

if (cluster.isPrimary && process.env.NODE_ENV === 'production') {
    console.log(`Primary ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) cluster.fork();
    cluster.on('exit', (worker) => cluster.fork());
} else {
    startServer();
}

function startServer() {
    const app = express();
    // Root health route
    app.get("/", (req, res) => {
        res.status(200).json({
            status: "OK",
            service: "NeuroFlux OS Backend",
            version: "2.5.0",
            uptime: process.uptime()
        });
});


    app.use(compression());
    app.use(helmet());
    app.use(cors());
    app.use(express.json());

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 2000, // Increased for dashboard polling
        message: 'Rate limit exceeded.'
    });
    app.use('/api/', limiter);

    // --- DATABASE LAYER ---
    const userSchema = new mongoose.Schema({
        id: { type: String, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: 'user' },
        bio: { type: String, default: '' },
        avatar: { type: String, default: '' },
        verified: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        usageCount: { type: Number, default: 0 },
        plan: { type: String, default: 'free' } // 'free', 'pro', 'enterprise'
    });

    const User = mongoose.model('User', userSchema);

    // In-Memory Cache for File DB (Speed optimization)
    let memoryCache = {
        users: [],
        organizations: [],
        logs: [],
        transactions: [], // New: Global transaction log
        globalSettings: {
            maintenanceMode: false,
            allowSignups: true,
            systemVersion: '2.5.0-RC1',
            lastBackup: new Date().toISOString()
        }
    };

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const DB_FILE = path.join(__dirname, 'db.json');

    // Helper to generate mock data if empty
    const generateMockData = () => {
        const plans = [
            { name: 'Starter', price: 29 },
            { name: 'Enterprise', price: 99 },
            { name: 'NeuroLink', price: 299 }
        ];

        // Generate some organizations with history
        if (memoryCache.organizations.length === 0) {
            for (let i = 0; i < 5; i++) {
                const plan = plans[Math.floor(Math.random() * plans.length)];
                const orgId = `org_${Date.now()}_${i}`;
                const joinDate = new Date(Date.now() - Math.random() * 10000000000);

                const org = {
                    id: orgId,
                    name: `NeuroCorp ${i + 1}`,
                    plan: plan.name,
                    status: 'Active',
                    licenseKey: `NFLX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                    createdAt: joinDate.toISOString(),
                    maxUsers: plan.name === 'Enterprise' ? 500 : 50,
                    renewalCount: Math.floor(Math.random() * 12),
                    totalRevenue: 0,
                    subscriptionHistory: []
                };

                // Generate subscription history
                let currentDate = new Date(joinDate);
                while (currentDate < new Date()) {
                    const amount = plan.price;
                    org.totalRevenue += amount;
                    const transaction = {
                        id: `tx_${Math.random().toString(36).substr(2, 9)}`,
                        orgId: org.id,
                        orgName: org.name,
                        amount: amount,
                        plan: plan.name,
                        date: currentDate.toISOString(),
                        type: org.subscriptionHistory.length === 0 ? 'Activation' : 'Renewal'
                    };
                    org.subscriptionHistory.push(transaction);
                    memoryCache.transactions.push(transaction);

                    // Advance 1 month
                    currentDate.setMonth(currentDate.getMonth() + 1);
                }
                memoryCache.organizations.push(org);
            }
        }
    };

    const connectDB = async () => {
        if (process.env.MONGO_URI) {
            try {
                await mongoose.connect(process.env.MONGO_URI);
                return 'mongo';
            } catch (err) { console.error('Mongo Failed, using File DB'); }
        }
        if (!fs.existsSync(DB_FILE)) {
            generateMockData();
            fs.writeFileSync(DB_FILE, JSON.stringify(memoryCache));
        }
        try {
            const data = fs.readFileSync(DB_FILE, 'utf-8');
            const loaded = JSON.parse(data);
            memoryCache = { ...memoryCache, ...loaded };
            if (memoryCache.organizations.length === 0) generateMockData(); // Ensure data exists
        } catch (e) {
            generateMockData();
            fs.writeFileSync(DB_FILE, JSON.stringify(memoryCache));
        }
        return 'memory';
    };

    let dbType = 'memory';
    connectDB().then(type => dbType = type);

    const saveDB = () => {
        if (dbType === 'memory') {
            fs.writeFile(DB_FILE, JSON.stringify(memoryCache, null, 2), () => { });
        }
    };

    const findUserByEmail = async (email) => {
        if (dbType === 'mongo') return await User.findOne({ email });
        return memoryCache.users.find(u => u.email === email);
    };

    const createUser = async (userData) => {
        if (dbType === 'mongo') {
            const newUser = new User(userData);
            await newUser.save();
            return newUser;
        }
        memoryCache.users.push(userData);
        saveDB();
        return userData;
    };

    const otpStore = new Map();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    // --- AUTH ROUTES ---
app.post('/api/auth/signup-init', async (req, res) => {
    const { name, email, password } = req.body;

    if (await findUserByEmail(email)) {
        return res.status(400).json({ message: 'User exists' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    otpStore.set(email, {
        name,
        email,
        password: hashedPassword,
        otp,
        expires: Date.now() + 600000
    });

await transporter.sendMail({
  from: `"NeuroFlux Security" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: `NeuroFlux OS Secure Verification • ${Date.now()}`,
  html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>NeuroFlux OTP</title>
</head>
<body style="margin:0;padding:0;background:#070b14;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#070b14;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="
          background:radial-gradient(circle at top,#111c3a,#0b1020);
          border-radius:18px;
          padding:36px;
          font-family:Arial,Helvetica,sans-serif;
          color:#ffffff;
          box-shadow:0 0 40px rgba(56,189,248,0.25);
        ">
          <!-- HEADER -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <div style="
                font-size:28px;
                font-weight:700;
                letter-spacing:1px;
                color:#38bdf8;
              ">
                NeuroFlux OS
              </div>
              <div style="font-size:12px;color:#9ca3af;margin-top:6px;">
                Secure Autonomous AI Platform
              </div>
            </td>
          </tr>

          <!-- SECURITY BADGE -->
          <tr>
            <td align="center" style="padding-bottom:22px;">
              <span style="
                display:inline-block;
                padding:6px 14px;
                border-radius:999px;
                background:rgba(56,189,248,0.12);
                color:#38bdf8;
                font-size:11px;
                letter-spacing:1px;
              ">
                🔐 ENCRYPTED • ZERO-TRUST AUTH
              </span>
            </td>
          </tr>

          <!-- TITLE -->
          <tr>
            <td style="padding-bottom:12px;">
              <h2 style="margin:0;font-size:20px;color:#ffffff;">
                Verify Your Identity
              </h2>
            </td>
          </tr>

          <!-- MESSAGE -->
          <tr>
            <td style="padding-bottom:24px;">
              <p style="margin:0;font-size:14px;line-height:1.7;color:#d1d5db;">
                A secure sign-in attempt was detected for your <b>NeuroFlux OS</b> account.
                Enter the one-time verification code below to continue.
              </p>
            </td>
          </tr>

          <!-- OTP BOX -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <div style="
                display:inline-block;
                padding:20px 26px;
                border-radius:14px;
                font-size:34px;
                font-weight:700;
                letter-spacing:8px;
                color:#ffffff;
                background:linear-gradient(135deg,#0ea5e9,#2563eb);
                box-shadow:
                  0 0 18px rgba(56,189,248,0.8),
                  inset 0 0 12px rgba(255,255,255,0.15);
              ">
                ${otp}
              </div>
            </td>
          </tr>

          <!-- INFO -->
          <tr>
            <td style="padding-bottom:22px;">
              <p style="margin:0;font-size:13px;color:#9ca3af;">
                ⏳ This code expires in <b>10 minutes</b>.<br/>
                🚫 Do not share this code with anyone — even NeuroFlux staff.
              </p>
            </td>
          </tr>

          <!-- DIVIDER -->
          <tr>
            <td style="padding:18px 0;">
              <div style="height:1px;background:#1f2a44;"></div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td align="center">
              <p style="margin:0;font-size:11px;color:#6b7280;line-height:1.6;">
                If this wasn’t you, your account is still safe.<br/>
                © ${new Date().getFullYear()} NeuroFlux OS · Security Systems
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
});



    res.json({ message: 'OTP sent to email' });
});


    app.post('/api/auth/verify', async (req, res) => {
        const { email, otp } = req.body;
        const record = otpStore.get(email);
        if (!record || record.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

        const newUser = {
            id: Date.now().toString(),
            name: record.name,
            email: record.email,
            password: record.password,
            role: 'user',
            verified: true,
            createdAt: new Date(),
            lastActive: new Date().toISOString(),
            currentAction: 'Dashboard Initialization'
        };
        await createUser(newUser);
        otpStore.delete(email);

        memoryCache.logs.push({
            id: Date.now().toString(),
            action: 'User Signup',
            user: newUser.name,
            timestamp: new Date().toISOString(),
            details: `New user verified: ${newUser.email}`,
            type: 'info'
        });
        saveDB();

        const token = jwt.sign({ id: newUser.id }, 'secret', { expiresIn: '24h' });

        res.json({ token, user: newUser });
    });

    app.post('/api/auth/login', async (req, res) => {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Update user activity
        if (dbType === 'memory') {
            const idx = memoryCache.users.findIndex(u => u.id === user.id);
            if (idx !== -1) {
                memoryCache.users[idx].lastActive = new Date().toISOString();
                memoryCache.users[idx].currentAction = 'Logged In';
                saveDB();
            }
        }

        memoryCache.logs.push({
            id: Date.now().toString(),
            action: 'User Login',
            user: user.name,
            timestamp: new Date().toISOString(),
            details: 'Successful authentication',
            type: 'info'
        });
        saveDB();

        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '24h' });
        res.json({ token, user });
    });

    // --- SUPER ADMIN & ADMIN ROUTES ---

    // 1. Global System Stats (Deep Telemetry)
    app.get('/api/admin/stats', (req, res) => {
        const cpus = os.cpus();
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;

        const stats = {
            totalUsers: memoryCache.users.length,
            totalOrgs: memoryCache.organizations.length,
            activeSessions: Math.floor(Math.random() * (memoryCache.users.length / 2)) + 1,
            systemHealth: 100 - (os.loadavg()[0] * 10),
            cpuLoad: Math.round(os.loadavg()[0] * 100) / 100,
            memoryUsage: Math.round((usedMem / totalMem) * 100),
            uptime: process.uptime(),
            platform: os.platform(),
            arch: os.arch(),
            cpuModel: cpus[0].model,
            cpuCores: cpus.length,
            networkInterfaces: Object.keys(os.networkInterfaces()).length,
            activeModules: 12,
            globalSettings: memoryCache.globalSettings
        };
        res.json(stats);
    });

    // 2. Revenue Analytics
    app.get('/api/admin/analytics/revenue', (req, res) => {
        const totalRevenue = memoryCache.transactions.reduce((acc, tx) => acc + tx.amount, 0);
        const currentMonth = new Date().getMonth();
        const mrr = memoryCache.transactions
            .filter(tx => new Date(tx.date).getMonth() === currentMonth)
            .reduce((acc, tx) => acc + tx.amount, 0);

        res.json({
            totalRevenue,
            mrr,
            transactions: memoryCache.transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 50) // Last 50 tx
        });
    });

    // 3. User Management (CRUD + Deep Details)
    app.get('/api/admin/users', async (req, res) => {
        const users = dbType === 'mongo' ? await User.find({}, '-password') : memoryCache.users.map(({ password, ...u }) => u);
        res.json(users);
    });

    app.get('/api/admin/users/:id/details', async (req, res) => {
        const { id } = req.params;
        const user = memoryCache.users.find(u => u.id === id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Simulate activity logs for this user
        const userLogs = memoryCache.logs.filter(l => l.user === user.name);

        // Simulate "Live" current state
        const liveState = {
            currentPath: '/dashboard/analytics',
            lastAction: 'Generated Report',
            sessionDuration: Math.floor(Math.random() * 120) + ' mins',
            device: 'Chrome / Windows 11',
            ip: '192.168.1.' + Math.floor(Math.random() * 255)
        };

        const { password, ...safeUser } = user;
        res.json({ user: safeUser, logs: userLogs, liveState });
    });

    app.post('/api/admin/users', async (req, res) => {
        const { name, email, role, password } = req.body;
        if (await findUserByEmail(email)) return res.status(400).json({ message: 'User exists' });

        const newUser = {
            id: Date.now().toString(),
            name, email,
            password: await bcrypt.hash(password, 10),
            role: role || 'user',
            verified: true,
            createdAt: new Date()
        };
        await createUser(newUser);

        memoryCache.logs.push({
            id: Date.now().toString(),
            action: 'Admin Create User',
            user: 'Super Admin',
            timestamp: new Date().toISOString(),
            details: `Created ${role} ${email}`,
            type: 'warning'
        });
        saveDB();

        const { password: _, ...safeUser } = newUser;
        res.json(safeUser);
    });

    app.delete('/api/admin/users/:id', async (req, res) => {
        const { id } = req.params;
        if (dbType === 'mongo') await User.findOneAndDelete({ id });
        else {
            const idx = memoryCache.users.findIndex(u => u.id === id);
            if (idx !== -1) memoryCache.users.splice(idx, 1);
        }
        saveDB();
        res.json({ message: 'Deleted' });
    });

    // 3. Organization Management
    app.get('/api/admin/organizations', (req, res) => res.json(memoryCache.organizations));

    app.post('/api/admin/organizations', (req, res) => {
        const { name, plan } = req.body;
        const newOrg = {
            id: `org_${Date.now()}`,
            name, plan,
            status: 'Active',
            licenseKey: `NFLX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            createdAt: new Date().toISOString(),
            maxUsers: plan === 'Enterprise' ? 500 : 50,
            renewalCount: 0,
            totalRevenue: 0,
            subscriptionHistory: []
        };
        memoryCache.organizations.push(newOrg);
        saveDB();
        res.json(newOrg);
    });

    app.delete('/api/admin/organizations/:id', (req, res) => {
        const idx = memoryCache.organizations.findIndex(o => o.id === req.params.id);
        if (idx !== -1) {
            memoryCache.organizations[idx].status = 'Suspended';
            saveDB();
        }
        res.json({ message: 'Suspended' });
    });

    // 4. Logs
    app.get('/api/admin/logs', (req, res) => res.json(memoryCache.logs.slice(-100).reverse()));

    // 5. Global Settings (Super Admin Only)
    app.post('/api/admin/settings/maintenance', (req, res) => {
        const { enabled } = req.body;
        memoryCache.globalSettings.maintenanceMode = enabled;
        saveDB();
        res.json({ message: `Maintenance mode ${enabled ? 'enabled' : 'disabled'}` });
    });

    // --- USAGE & SUBSCRIPTION ROUTES ---

    app.post('/api/user/usage/check', async (req, res) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'neuroflux-secret-key');
            const user = dbType === 'mongo'
                ? await User.findOne({ id: decoded.id })
                : memoryCache.users.find(u => u.id === decoded.id);

            if (!user) return res.status(404).json({ message: 'User not found' });

            const limit = user.plan === 'free' ? 3 : Infinity;
            const usage = user.usageCount || 0;

            res.json({
                allowed: usage < limit,
                usage,
                limit,
                plan: user.plan || 'free'
            });
        } catch (err) {
            res.status(401).json({ message: 'Invalid token' });
        }
    });

    app.post('/api/user/usage/increment', async (req, res) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'neuroflux-secret-key');
            if (dbType === 'mongo') {
                await User.findOneAndUpdate({ id: decoded.id }, { $inc: { usageCount: 1 } });
            } else {
                const user = memoryCache.users.find(u => u.id === decoded.id);
                if (user) {
                    user.usageCount = (user.usageCount || 0) + 1;
                    saveDB();
                }
            }
            res.json({ success: true });
        } catch (err) {
            res.status(401).json({ message: 'Invalid token' });
        }
    });

    app.post('/api/user/upgrade', async (req, res) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'neuroflux-secret-key');
            const { plan } = req.body; // 'pro', 'enterprise', etc.

            if (dbType === 'mongo') {
                await User.findOneAndUpdate({ id: decoded.id }, { plan: plan || 'pro' });
            } else {
                const user = memoryCache.users.find(u => u.id === decoded.id);
                if (user) {
                    user.plan = plan || 'pro';
                    saveDB();
                }
            }

            // Log the upgrade
            memoryCache.logs.push({
                id: Date.now().toString(),
                action: 'Subscription Upgrade',
                user: decoded.id, // In real app, fetch name
                timestamp: new Date().toISOString(),
                details: `User upgraded to ${plan || 'pro'}`,
                type: 'success'
            });
            saveDB();

            res.json({ success: true, plan: plan || 'pro' });
        } catch (err) {
            res.status(401).json({ message: 'Invalid token' });
        }
    });

    const PORT = process.env.PORT || 5003;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
