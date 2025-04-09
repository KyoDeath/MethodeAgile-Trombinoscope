
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const UserCard = ({ user, onClick }) => {
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

    const getAdditionalInfo = (user) => {
        if (user.role === 'eleve') {
            return `Class: ${user.class} | Promotion: ${user.promotion}`;
        } else if (user.role === 'professeur' || user.role === 'admin') {
            return user.department;
        }
        return '';
    };

    return (
        <Card
            className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onClick(user)}
        >
            <CardContent className="p-4">
                <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                        <AvatarFallback className="text-xl">
                            {user.firstName[0]}{user.lastName[0]}
                        </AvatarFallback>
                    </Avatar>

                    <h3 className="font-semibold text-lg">{user.firstName} {user.lastName}</h3>

                    <Badge className={`mt-1 ${getRoleBadgeClass(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>

                    <p className="mt-2 text-sm text-gray-500 text-center">
                        {getAdditionalInfo(user)}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserCard;