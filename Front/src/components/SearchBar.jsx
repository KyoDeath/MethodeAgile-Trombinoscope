
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const SearchBar = ({ searchTerm, onSearchChange, selectedRole, onRoleChange }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Chercher par nom, classe, ou promotion..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 w-full"
                />
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={selectedRole ? "secondary" : "outline"} className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        {selectedRole ? `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}s` : "Tous les Roles"}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onRoleChange(null)}>
                        All Roles
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onRoleChange('eleve')}>
                        Students
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onRoleChange('professeur')}>
                        Teachers
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onRoleChange('admin')}>
                        Administrative Staff
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default SearchBar;