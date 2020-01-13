import { Router } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import {
    validator,
    autoSuggestUsersSchema,
    AutoSuggestUsersSchema,
    postUserSchema,
    UsersRequestSchema,
    putUserSchema,
} from '../validation';
import { users } from '../models';

const route = Router();

route.get('/', validator.query(autoSuggestUsersSchema), (req: ValidatedRequest<AutoSuggestUsersSchema>, res) => {
    const usersList = users.get(req);

    res.json(usersList);
});

route.post('/', validator.body(postUserSchema), (req: ValidatedRequest<UsersRequestSchema>, res) => {
    const user = users.post(req);

    res.status(201).send(`User with id ${user.id} created`);
});

route.get('/:id', (req, res) => {
    const id = req.params.id;
    const user = users.getUserById(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({
            message: `User with id ${id} not found`,
        });
    }
});

route.delete('/:id', (req, res) => {
    const id = users.delete(req.params.id);
    if (id) {
        res.status(200).send(`User with id ${id} deleted`);
    } else {
        res.status(404).json({
            message: `User with id ${req.params.id} is already deleted`,
        });
    }
});

route.put('/:id', validator.body(putUserSchema), (req: ValidatedRequest<UsersRequestSchema>, res) => {
    const id = req.params.id;
    const updatedUser = users.put(req);
    if (updatedUser) {
        res.status(200).json(updatedUser);
    } else {
        res.status(404).json({
            message: `User with id ${id} is not found`,
        });
    }
});

export { route as UsersController };
