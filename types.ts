export type TUser = {
    id: string;
    username: string;
    hashedPassword: string;
    role: 'admin' | 'regular';
    createdAt: Date;
    updatedAt: Date;
};
