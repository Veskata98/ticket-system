import { $Enums } from '@prisma/client';

export type TUser = {
    id: string;
    username: string;
    hashedPassword: string;
    role: 'admin' | 'regular';
    createdAt: Date;
    updatedAt: Date;
};

export type TTicketWithCreator = {
    creator: {
        id: string;
        username: string;
        hashedPassword: string;
        role: $Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    title: string;
    description: string;
    finished: boolean;
    creatorId: string;
    createdAt: Date;
    updatedAt: Date;
};

export type TTicket = {
    id: string;
    title: string;
    description: string;
    finished: boolean;
    creatorId: string;
    createdAt: Date;
    updatedAt: Date;
};
