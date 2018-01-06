import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

export interface User {
    uid: String;
    photoURL?: String;
    displayName?: String;
    email?: String;
};

@Injectable()
export class UserService {
    public user: Observable<User>;
    public currentUser: User;
    public userSync = false;
    public logined = false;

    constructor(private afAuth: AngularFireAuth,
                private afs: AngularFirestore) {
        //// Get auth data, then get firestore user document || null
        this.user = this.afAuth.authState
            .switchMap(user => {
                if (user) {
                    console.log(user);
                    this.user = this.afs.doc<User>(`user/${user.uid}`).valueChanges();
                    this.logined = true;
                    return this.user;
                } else {
                    return Observable.of(null);
                }
            });
    }

    isLogin() {
        console.log(this.logined);
        return this.logined;
    }

    updateUserData(user) {
        console.log(user);
        // Sets user data to firestore on login
        const userRef = this.afs.doc(`user/${user.uid}`);
        console.log(userRef);
        const data = {
            photoURL: user.photoURL,
            displayName: user.displayName,
            email: user.email
        };
        return userRef.update(data);
    }

    emailLogin(email, password) {
        return new Promise<User>((resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(email, password).then(user => {
                this.updateUserData(user.user);
                resolve(user);
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    }

    googleLogin() {
        return new Promise<User>((resolve, reject) => {
            this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
                this.updateUserData(user.user);
                console.log(user);
                resolve(user);
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    getUser() {
        return new Promise<User>((resolve, reject) => {
            if (this.userSync === false) {
                this.user.subscribe(user => {
                    this.currentUser = user;
                    this.userSync = true;
                    resolve(user);
                });
            } else {
                resolve(this.currentUser);
            }
        });
    }
}