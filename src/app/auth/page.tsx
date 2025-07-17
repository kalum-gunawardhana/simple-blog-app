'use client';

import { useState } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { BlogHeader } from '@/components/blog/BlogHeader';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen bg-gray-50">
            <BlogHeader />

            <main className="max-w-md mx-auto px-4 py-16">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-gray-600">
                            {isLogin ? 'Sign in to your account' : 'Start your blogging journey'}
                        </p>
                    </div>

                    <AuthForm isLogin={isLogin} />

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}