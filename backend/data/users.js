import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: '123456',
        isAdmin: true,
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: '123456',
        isAdmin: false,
    },
];

export default users;
