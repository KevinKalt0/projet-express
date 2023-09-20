import { user } from './user';

export interface UserService {
    add(username: string): user;
    getById(id: number): user | null;
}