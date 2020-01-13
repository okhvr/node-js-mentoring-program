import { User, createUser, updateUser } from '../user/user';
import { ValidatedRequest } from 'express-joi-validation';
import { AutoSuggestUsersSchema, UsersRequestSchema } from '../validation';

class Users {
    private users: Map<string, User>;

    constructor() {
        this.users = new Map();
    }

    get(req: ValidatedRequest<AutoSuggestUsersSchema>): User[] {
        let usersList = Array.from(this.users.values()).filter(u => !u.isDeleted);
        if (req.query.loginSubstring) {
            usersList = usersList.filter(u => u.login.includes(req.query.loginSubstring));
        }
        usersList = usersList.sort((a, b) => (a.login < b.login ? -1 : 1));
        if (req.query.limit) {
            usersList = usersList.slice(0, req.query.limit);
        }
        return usersList;
    }

    post(req: ValidatedRequest<UsersRequestSchema>): User {
        const { login, password, age } = req.body;
        const user: User = createUser(login, password, age);
        this.users.set(user.id, user);
        return user;
    }

    getUserById(id: string): User {
        const user = this.users.get(id);
        if (user && !user.isDeleted) {
            return user;
        }
        return null;
    }

    delete(id: string): string {
        const user = this.users.get(id);
        if (user) {
            user.isDeleted = true;
            return id;
        }
        return null;
    }

    put(req: ValidatedRequest<UsersRequestSchema>): User {
        const { login, password, age } = req.body;
        const id = req.params.id;
        const user = this.users.get(id);
        if (user && !user.isDeleted) {
            const updatedUser = updateUser(user, login, password, age);
            this.users.set(user.id, updatedUser);
            return updatedUser;
        }
        return null;
    }
}

export const users = new Users();
