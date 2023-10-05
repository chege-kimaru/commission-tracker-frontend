import { makeAutoObservable } from "mobx";

export class CommonStore {
    navOpen = false;

    constructor() {
        makeAutoObservable(this);  
    }

    openNav = () => {
        this.navOpen = true;
    }

    closeNav = () => {
        this.navOpen = false;
    }
}