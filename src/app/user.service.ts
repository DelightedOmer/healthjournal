import { Injectable } from '@angular/core';
import { User } from 'firebase/app';
import { Observable } from 'rxjs';


// User's informations
export interface Userelement {
    email?: string;
    uid?: string;
    displayName?: string;
    photoURL?: string;
}

@Injectable()
export class UserService {
    public user: Userelement; // assign User's information in user
    user$: Observable<User>;

    constructor() {}

    // function to set user information
    setUser(user: Userelement) {
        this.user = user;
}
}
