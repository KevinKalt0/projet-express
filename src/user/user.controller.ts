import { user } from './user';
import { UserService } from './user.service';

export class UserController {
    constructor(private userService: UserService) {}

    add(username: string): user {
        // is the username empty ?
        // is the username whitespaced ?
        // other checks...
        return this.userService.add(username);
    }

    getById(id: number): user | null {
        // is the id a decimal ?
        // is the id a negative number ?
        // other checks...
        return this.userService.getById(id);
    }
}
