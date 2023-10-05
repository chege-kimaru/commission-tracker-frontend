import { makeAutoObservable } from 'mobx';
import { User } from '../models/user.model';

export class AuthStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    setUser = (user: User) => {
        this.user = user;
    };
}
