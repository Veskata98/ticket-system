import { Ticket, User } from '@prisma/client';

export type TicketWithCreator = Ticket & { creator: User };
