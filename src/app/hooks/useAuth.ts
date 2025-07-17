'use client';

import { useState, useEffect, createContext, useContext } from 'react';

interface User {
    id: string;
    email: string;
    name?: string;
    bio?: string;
    website?: string;
    subscription?: {
        active: boolean;
        plan: string;
        expiresAt: Date;
    };
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        // Return mock auth for development
        return {
            user: null,
            loading: false,
            signIn: async (email: string, password: string) => {
                console.log('Mock sign in:', { email, password });
            },
            signUp: async (email: string, password: string) => {
                console.log('Mock sign up:', { email, password });
            },
            signOut: () => {
                console.log('Mock sign out');
            }
        };
    }
    return context;
}

// Mock auth hook for development
export function useAuthMock() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const signIn = async (email: string, password: string) => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setUser({
            id: '1',
            email,
            name: 'John Doe',
            subscription: {
                active: true,
                plan: 'monthly',
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }
        });
        setLoading(false);
    };

    const signUp = async (email: string, password: string) => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        setUser({
            id: '1',
            email,
            name: 'John Doe'
        });
        setLoading(false);
    };

    const signOut = () => {
        setUser(null);
    };

    return {
        user,
        loading,
        signIn,
        signUp,
        signOut
    };
}