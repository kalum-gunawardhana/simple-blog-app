'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X, User, LogOut, Settings, CreditCard } from 'lucide-react';

export function BlogHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, signOut } = useAuth();

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-gray-900">
                            BlogHub
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Home
                        </Link>
                        {user && (
                            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Dashboard
                            </Link>
                        )}
                        {!user?.subscription?.active && (
                            <Link
                                href="/subscribe"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Subscribe
                            </Link>
                        )}
                    </nav>

                    {/* User Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                                >
                                    <User className="h-5 w-5" />
                                    <span>{user.email}</span>
                                </button>

                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                        <Link
                                            href="/dashboard"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <Settings className="inline h-4 w-4 mr-2" />
                                            Dashboard
                                        </Link>
                                        {user.subscription?.active && (
                                            <Link
                                                href="/subscribe"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                <CreditCard className="inline h-4 w-4 mr-2" />
                                                Manage Subscription
                                            </Link>
                                        )}
                                        <button
                                            onClick={() => {
                                                signOut();
                                                setIsMenuOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <LogOut className="inline h-4 w-4 mr-2" />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/auth"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link href="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                            Home
                        </Link>
                        {user && (
                            <Link href="/dashboard" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                                Dashboard
                            </Link>
                        )}
                        {!user?.subscription?.active && (
                            <Link href="/subscribe" className="block px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md">
                                Subscribe
                            </Link>
                        )}
                        {user ? (
                            <button
                                onClick={() => {
                                    signOut();
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <Link href="/auth" className="block px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md">
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}