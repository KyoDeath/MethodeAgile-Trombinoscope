
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Mail } from 'lucide-react';

const UserModal = ({ isOpen, onClose, user }) => {
    if (!user) return null;

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
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center">Détails Profil</DialogTitle>
                    <DialogDescription className="text-center">
                        Afficher les détails du profil de {user.firstName} {user.lastName}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center py-4">
                    <Avatar className="h-32 w-32 mb-4">
                        <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                        <AvatarFallback className="text-2xl">
                            {user.firstName[0]}{user.lastName[0]}
                        </AvatarFallback>
                    </Avatar>

                    <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>

                    <Badge className={`mt-2 ${getRoleBadgeClass(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>

                    {user.role === 'student' && (
                        <div className="mt-2 text-center">
                            <p className="text-gray-600">Class: {user.class}</p>
                            <p className="text-gray-600">Promotion: {user.promotion}</p>
                        </div>
                    )}

                    {(user.role === 'teacher' || user.role === 'admin') && (
                        <p className="mt-2 text-gray-600">{user.department}</p>
                    )}

                    <div className="w-full border-t border-gray-200 my-4"></div>

                    <div className="w-full space-y-2">
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span>{user.phone}</span>
                        </div>
                    </div>

                    {user.bio && (
                        <div className="mt-4 w-full">
                            <h3 className="font-semibold mb-1">Bio</h3>
                            <p className="text-gray-600">{user.bio}</p>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UserModal;