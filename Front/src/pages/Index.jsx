
import React, { useState, useEffect } from 'react';
import { getUsers } from '@/data/user';
import UserCard from '@/components/UserCard';
import UserModal from '@/components/UserModal';
import SearchBar from '@/components/SearchBar';
import Navbar from '@/components/Navbar';

const Index = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState(null);

    useEffect(() => {
        const allUsers = getUsers();
        setUsers(allUsers);
        setFilteredUsers(allUsers);
    }, []);

    useEffect(() => {
        let result = users;

        if (selectedRole) {
            result = result.filter(user => user.role === selectedRole);
        }

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(user =>
                `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.includes(term) ||
                (user.class && user.class.toLowerCase().includes(term)) ||
                (user.promotion && user.promotion.toLowerCase().includes(term)) ||
                (user.department && user.department.toLowerCase().includes(term))
            );
        }

        setFilteredUsers(result);
    }, [users, searchTerm, selectedRole]);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container py-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-school-blue mb-2">Trombinoscope</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Découvrez les membres de notre communauté scolaire, leurs rôles et leurs
                        informations de contact.
                    </p>
                </div>

                <div className="mb-8">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        selectedRole={selectedRole}
                        onRoleChange={setSelectedRole}
                    />
                </div>

                {filteredUsers.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Pas de résultat trouvés</p>
                        <p className="text-gray-400">Changer vos règles de filtrages</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredUsers.map((user) => (
                            <UserCard key={user.id} user={user} onClick={handleUserClick} />
                        ))}
                    </div>
                )}
            </div>

            <UserModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                user={selectedUser}
            />
        </div>
    );
};

export default Index;