'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Check for existing session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Simple validation
            if (!email.includes('@') || password.length < 6) {
                throw new Error('Invalid credentials');
            }

            const user = { id: '1', email };
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            router.push('/dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simple validation
            if (!email.includes('@')) {
                throw new Error('Invalid email address');
            }
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }

            const user = { id: '1', email };
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            router.push('/dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        localStorage.removeItem('user');
        setUser(null);
        router.push('/auth');
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
} 