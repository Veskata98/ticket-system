export type TUser = {
    username: string;
    hashedPassword: string;
    role: 'admin' | 'regular';
    _id: string;
};
