import uuid from 'uuid/v4';

export interface User {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export const createUser = (login: string, password: string, age: number): User => {
    return {
        id: uuid(),
        login,
        password,
        age,
        isDeleted: false,
    };
};

export const updateUser = (user: User, login?: string, password?: string, age?: number): User => {
    return {
        ...user,
        login: login || user.login,
        password: password || user.password,
        age: age || user.age,
    };
};
