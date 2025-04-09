
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { School } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const success = login(email, password);
            if (success) {
                navigate('/');
            }
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const demoEmails = [
        { role: 'eleve', email: 'emily.johnson@school.edu' },
        { role: 'professeur', email: 'john.smith@school.edu' },
        { role: 'admin', email: 'lisa.garcia@school.edu' }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-2">
                            <School className="h-10 w-10 text-school-blue" />
                        </div>
                        <CardTitle className="text-2xl">Se connecter</CardTitle>
                        <CardDescription>
                            Connectez-vous à votre compte pour accéder à l'application.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="email@school.edu"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Mot de passe</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col space-y-4">
                            <Button
                                type="submit"
                                className="w-full bg-school-blue hover:bg-blue-800"
                                disabled={isLoading}
                            >
                                {isLoading ? "Signing in..." : "Se connecter"}
                            </Button>

                            <div className="text-sm text-gray-500">
                                <div className="flex flex-wrap justify-center gap-2">
                                    {demoEmails.map((demo) => (
                                        <Button
                                            key={demo.email}
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setEmail(demo.email);
                                                setPassword('password123');
                                            }}
                                        >
                                            {demo.role}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Login;