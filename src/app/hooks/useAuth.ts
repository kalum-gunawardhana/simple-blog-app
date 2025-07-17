'use client';

import { useState, createContext, useContext } from 'react';

interface User {
    id: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
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
            }
        };
    }
    return context;
} 