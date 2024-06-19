export type TUser = {
    id: string;
    username: string;
    password: string;
    createdAt: Date;
    role: 'admin' | 'regular';
    updatedAt: Date;
};
