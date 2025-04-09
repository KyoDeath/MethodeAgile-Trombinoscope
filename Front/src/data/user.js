
// Sample user data for the school directory
export const users = [
    {
        id: 1,
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@school.edu",
        password: "password123",
        role: "professeur",
        department: "Mathematiques",
        phone: "555-123-4567",
        class: null,
        promotion: null,
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        bio: "Mathematics teacher with 8 years of experience. Specializes in algebra and calculus."
    },
    {
        id: 2,
        firstName: "Emily",
        lastName: "Johnson",
        email: "emily.johnson@school.edu",
        password: "password123",
        role: "eleve",
        department: null,
        phone: "555-987-6543",
        class: "12A",
        promotion: "2024",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        bio: "Senior student with interests in biology and chemistry. Planning to study medicine."
    },
    {
        id: 3,
        firstName: "Robert",
        lastName: "Williams",
        email: "robert.williams@school.edu",
        password: "password123",
        role: "admin",
        department: "Administration",
        phone: "555-456-7890",
        class: null,
        promotion: null,
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        bio: "School administrator responsible for managing student records and scheduling."
    },
    {
        id: 4,
        firstName: "Sarah",
        lastName: "Davis",
        email: "sarah.davis@school.edu",
        password: "password123",
        role: "professeur",
        department: "Anglais",
        phone: "555-789-0123",
        class: null,
        promotion: null,
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        bio: "English Literature teacher passionate about poetry and classic novels."
    },
    {
        id: 5,
        firstName: "Michael",
        lastName: "Brown",
        email: "michael.brown@school.edu",
        password: "password123",
        role: "eleve",
        department: null,
        phone: "555-234-5678",
        class: "11B",
        promotion: "2025",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        bio: "Junior student with a talent for mathematics and computer science."
    },
    {
        id: 6,
        firstName: "Jessica",
        lastName: "Wilson",
        email: "jessica.wilson@school.edu",
        password: "password123",
        role: "eleve",
        department: null,
        phone: "555-345-6789",
        class: "10C",
        promotion: "2026",
        avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        bio: "Sophomore student who excels in sports, particularly soccer and track."
    },
    {
        id: 7,
        firstName: "David",
        lastName: "Martinez",
        email: "david.martinez@school.edu",
        password: "password123",
        role: "eleve",
        department: "null",
        phone: "555-456-7890",
        class: "ASRB",
        promotion: "2025",
        avatar: "https://randomuser.me/api/portraits/men/7.jpg",
        bio: "Physics teacher with a PhD in theoretical physics. Loves to make science fun!"
    },
    {
        id: 8,
        firstName: "Lisa",
        lastName: "Garcia",
        email: "lisa.garcia@school.edu",
        password: "password123",
        role: "admin",
        department: "Pédagogie",
        phone: "555-567-8901",
        class: null,
        promotion: null,
        avatar: "https://randomuser.me/api/portraits/women/8.jpg",
        bio: "Responsible for student welfare and extracurricular activities coordination."
    },
    {
        id: 9,
        firstName: "Thomas",
        lastName: "Anderson",
        email: "thomas.anderson@school.edu",
        password: "password123",
        role: "eleve",
        department: null,
        phone: "555-678-9012",
        class: "12B",
        promotion: "2024",
        avatar: "https://randomuser.me/api/portraits/men/9.jpg",
        bio: "Senior student and president of the chess club. Interested in computer programming."
    },
    {
        id: 10,
        firstName: "Jennifer",
        lastName: "Taylor",
        email: "jennifer.taylor@school.edu",
        password: "password123",
        role: "professeur",
        department: "History",
        phone: "555-789-0123",
        class: null,
        promotion: null,
        avatar: "https://randomuser.me/api/portraits/women/10.jpg",
        bio: "History teacher specializing in world civilizations and modern European history."
    },
    {
        id: 11,
        firstName: "Kevin",
        lastName: "Thompson",
        email: "kevin.thompson@school.edu",
        password: "password123",
        role: "eleve",
        department: null,
        phone: "555-890-1234",
        class: "11A",
        promotion: "2025",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg",
        bio: "Junior student who plays in the school band and loves science fiction."
    },
    {
        id: 12,
        firstName: "Michelle",
        lastName: "White",
        email: "michelle.white@school.edu",
        password: "password123",
        role: "eleve",
        department: null,
        phone: "555-901-2345",
        class: "10A",
        promotion: "2026",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        bio: "Sophomore student who is on the debate team and dreams of becoming a lawyer."
    }
];

export const getUsers = () => {
    const storedUsers = localStorage.getItem('schoolUsers');
    if (storedUsers) {
        return JSON.parse(storedUsers);
    }


    localStorage.setItem('schoolUsers', JSON.stringify(users));
    return users;
};


export const saveUsers = (updatedUsers) => {
    localStorage.setItem('schoolUsers', JSON.stringify(updatedUsers));
};


export const getUserById = (id) => {
    const users = getUsers();
    return users.find(user => user.id === parseInt(id));
};


export const updateUser = (updatedUser) => {
    const users = getUsers();
    const updatedUsers = users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
    );
    saveUsers(updatedUsers);
    return updatedUser;
};