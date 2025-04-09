
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { School, LogOut, User } from 'lucide-react';

const Navbar = () => {
    const { currentUser, logout } = useAuth();

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <School className="h-6 w-6 text-school-blue" />
                        <span className="text-xl font-bold text-school-blue">Trombinoscope</span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {currentUser ? (
                        <div className="flex items-center gap-4">
                            <Link to="/profile">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={currentUser.avatar} alt={currentUser.firstName} />
                                    <AvatarFallback>{currentUser.firstName[0]}{currentUser.lastName[0]}</AvatarFallback>
                                </Avatar>
                            </Link>
                            <div className="hidden md:block text-sm">
                                <p className="font-medium">{currentUser.firstName} {currentUser.lastName}</p>
                                <p className="text-muted-foreground capitalize">{currentUser.role}</p>
                            </div>
                            <Button onClick={logout} variant="ghost" size="icon">
                                <LogOut className="h-5 w-5" />
                            </Button>
                        </div>
                    ) : (
                        <Link to="/login">
                            <Button variant="outline" className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>Login</span>
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;