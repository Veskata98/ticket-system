export type User = {
    username: string;
    hashedPassword: string;
    role: 'admin' | 'regular';
    _id: string;
};
