import { SystemLog, User, SystemSettings } from '../types';

// Types for Admin Service
export interface SystemStats {
    totalUsers: number;
    totalOrgs: number;
    activeSessions: number;
    systemHealth: number; // 0-100
    cpuLoad: number; // 0-100
    memoryUsage: number; // 0-100
    networkTraffic: number; // Mbps
    activeModules: number;
    uptime: number;
    platform: string;
    arch: string;
    cpuModel: string;
    cpuCores: number;
    networkInterfaces: number;
    globalSettings: any;
}

export interface Organization {
    id: string;
    name: string;
    plan: 'Starter' | 'Enterprise' | 'NeuroLink';
    status: 'Active' | 'Suspended';
    licenseKey: string;
    createdAt: string;
    maxUsers: number;
    renewalCount: number;
    totalRevenue: number;
    subscriptionHistory: Transaction[];
}

export interface Transaction {
    id: string;
    orgId: string;
    orgName: string;
    amount: number;
    plan: string;
    date: string;
    type: 'Activation' | 'Renewal';
}

export interface RevenueStats {
    totalRevenue: number;
    mrr: number;
    transactions: Transaction[];
}

export interface UserDetails {
    user: User;
    logs: SystemLog[];
    liveState: {
        currentPath: string;
        lastAction: string;
        sessionDuration: string;
        device: string;
        ip: string;
    };
}

const API_URL = 'http://localhost:5003/api/admin';

export const adminService = {
    // --- Live Data Streams ---

    getSystemStats: async (): Promise<SystemStats> => {
        try {
            const res = await fetch(`${API_URL}/stats`);
            if (!res.ok) throw new Error('Failed to fetch stats');
            return await res.json();
        } catch (error) {
            console.error("Stats Fetch Error:", error);
            // Fallback for demo if server is down
            return {
                totalUsers: 0,
                totalOrgs: 0,
                activeSessions: 0,
                systemHealth: 0,
                cpuLoad: 0,
                memoryUsage: 0,
                networkTraffic: 0,
                activeModules: 0,
                uptime: 0,
                platform: 'unknown',
                arch: 'unknown',
                cpuModel: 'unknown',
                cpuCores: 0,
                networkInterfaces: 0,
                globalSettings: {}
            };
        }
    },

    getRealtimeLogs: async (): Promise<SystemLog[]> => {
        try {
            const res = await fetch(`${API_URL}/logs`);
            if (!res.ok) throw new Error('Failed to fetch logs');
            return await res.json();
        } catch (error) {
            console.error("Logs Fetch Error:", error);
            return [];
        }
    },

    getRevenueStats: async (): Promise<RevenueStats> => {
        try {
            const res = await fetch(`${API_URL}/analytics/revenue`);
            if (!res.ok) throw new Error('Failed to fetch revenue');
            return await res.json();
        } catch (error) {
            console.error("Revenue Fetch Error:", error);
            return { totalRevenue: 0, mrr: 0, transactions: [] };
        }
    },

    getUsers: async (): Promise<User[]> => {
        try {
            const res = await fetch(`${API_URL}/users`);
            if (!res.ok) throw new Error('Failed to fetch users');
            return await res.json();
        } catch (error) {
            console.error("Users Fetch Error:", error);
            return [];
        }
    },

    getUserDetails: async (id: string): Promise<UserDetails | null> => {
        try {
            const res = await fetch(`${API_URL}/users/${id}/details`);
            if (!res.ok) throw new Error('Failed to fetch user details');
            return await res.json();
        } catch (error) {
            console.error("User Details Fetch Error:", error);
            return null;
        }
    },

    createUser: async (userData: Partial<User> & { password?: string }): Promise<User> => {
        const res = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!res.ok) throw new Error('Failed to create user');
        return await res.json();
    },

    deleteUser: async (id: string): Promise<void> => {
        const res = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Failed to delete user');
    },

    // --- Access Control / Provisioning ---

    getOrganizations: async (): Promise<Organization[]> => {
        try {
            const res = await fetch(`${API_URL}/organizations`);
            if (!res.ok) throw new Error('Failed to fetch organizations');
            return await res.json();
        } catch (error) {
            console.error("Org Fetch Error:", error);
            return [];
        }
    },

    createOrganization: async (name: string, plan: Organization['plan']): Promise<Organization> => {
        const res = await fetch(`${API_URL}/organizations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, plan })
        });
        if (!res.ok) throw new Error('Failed to create organization');
        return await res.json();
    },

    revokeAccess: async (orgId: string) => {
        await fetch(`${API_URL}/organizations/${orgId}`, {
            method: 'DELETE'
        });
    }
};
