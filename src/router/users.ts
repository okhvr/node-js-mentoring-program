import { Router } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { User, createUser, updateUser } from '../user/user';
import {
    validator,
    autoSuggestUsersSchema,
    AutoSuggestUsersSchema,
    postUserSchema,
    UsersRequestSchema,
    putUserSchema,
} from '../validation';

const route = Router();

const users: Map<string, User> = new Map();

route.get('/', validator.query(autoSuggestUsersSchema), (req: ValidatedRequest<AutoSuggestUsersSchema>, res) => {
    let usersList = Array.from(users.values()).filter(u => !u.isDeleted);
    if (req.query.loginSubstring) {
        usersList = usersList.filter(u => u.login.includes(req.query.loginSubstring));
    }
    usersList = usersList.sort((a, b) => (a.login < b.login ? -1 : 1));
    if (req.query.limit) {
        usersList = usersList.slice(0, req.query.limit);
    }
    res.json(usersList);
});

route.post('/', validator.body(postUserSchema), (req: ValidatedRequest<UsersRequestSchema>, res) => {
    const { login, password, age } = req.body;
    const user: User = createUser(login, password, age);
    users.set(user.id, user);
    res.status(201).send(`User with id ${user.id} created`);
});

route.get('/:id', (req, res) => {
    const id = req.params.id;
    const user = users.get(id);
    if (user && !user.isDeleted) {
        res.json(user);
    } else {
        res.status(404).json({
            message: `User with id ${id} not found`,
        });
    }
});

route.delete('/:id', (req, res) => {
    const id = req.params.id;
    const user = users.get(id);
    if (user) {
        user.isDeleted = true;
        res.status(200).send(`User with id ${id} deleted`);
    } else {
        res.status(404).json({
            message: `User with id ${id} is already deleted`,
        });
    }
});

route.put('/:id', validator.body(putUserSchema), (req: ValidatedRequest<UsersRequestSchema>, res) => {
    const { login, password, age } = req.body;
    const id = req.params.id;
    const user = users.get(id);
    if (user && !user.isDeleted) {
        const updatedUser: User = updateUser(user, login, password, age);
        users.set(user.id, updatedUser);
        res.status(200).json(updatedUser);
    } else {
        res.status(404).json({
            message: `User with id ${id} is not found`,
        });
    }
});

export default route;
