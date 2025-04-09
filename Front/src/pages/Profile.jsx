
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Profile = () => {
    const { currentUser, updateCurrentUser } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        class: '',
        promotion: '',
        department: '',
        avatar: '',
        bio: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        setFormData({
            firstName: currentUser.firstName || '',
            lastName: currentUser.lastName || '',
            email: currentUser.email || '',
            phone: currentUser.phone || '',
            class: currentUser.class || '',
            promotion: currentUser.promotion || '',
            department: currentUser.department || '',
            avatar: currentUser.avatar || '',
            bio: currentUser.bio || ''
        });
    }, [currentUser, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            updateCurrentUser(formData);
            navigate('/');
        } catch (error) {
            console.error('Update error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!currentUser) {
        return null;
    }

    const getRoleBadgeClass = (role) => {
        switch (role) {
            case 'professeur':
                return 'bg-blue-500 hover:bg-blue-600';
            case 'eleve':
                return 'bg-green-500 hover:bg-green-600';
            case 'admin':
                return 'bg-amber-500 hover:bg-amber-600';
            default:
                return 'bg-gray-500 hover:bg-gray-600';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container py-8">
                <Button
                    variant="ghost"
                    className="mb-6 flex items-center gap-2"
                    onClick={() => navigate('/')}
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Directory</span>
                </Button>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col items-center">
                            <Avatar className="h-24 w-24 mb-4">
                                <AvatarImage src={currentUser.avatar} alt={`${currentUser.firstName} ${currentUser.lastName}`} />
                                <AvatarFallback className="text-xl">
                                    {currentUser.firstName[0]}{currentUser.lastName[0]}
                                </AvatarFallback>
                            </Avatar>

                            <CardTitle className="text-2xl">{currentUser.firstName} {currentUser.lastName}</CardTitle>

                            <Badge className={`mt-1 ${getRoleBadgeClass(currentUser.role)}`}>
                                {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                            </Badge>

                            <CardDescription className="mt-2">
                                Modifier vos informations personnelles
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">Prénom</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Nom</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Téléphone</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="avatar">Avatar URL</Label>
                                    <Input
                                        id="avatar"
                                        name="avatar"
                                        value={formData.avatar}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {currentUser.role === 'eleve' && (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="class">Classe</Label>
                                            <Input
                                                id="class"
                                                name="class"
                                                value={formData.class}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="promotion">Année Promotion</Label>
                                            <Input
                                                id="promotion"
                                                name="promotion"
                                                value={formData.promotion}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </>
                                )}

                                {(currentUser.role === 'professeur' || currentUser.role === 'admin') && (
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Departement</Label>
                                        <Input
                                            id="department"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    rows={4}
                                />
                            </div>
                        </CardContent>

                        <CardFooter>
                            <Button
                                type="submit"
                                className="w-full flex items-center gap-2 bg-school-blue hover:bg-blue-800"
                                disabled={isLoading}
                            >
                                <Save className="h-4 w-4" />
                                <span>{isLoading ? "Saving..." : "Save Changes"}</span>
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Profile;