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

    constructor(private afAuth: AngularFireAuth,
                private afs: AngularFirestore) {
        //// Get auth data, then get firestore user document || null
        this.user = this.afAuth.authState
            .switchMap(user => {
                if (user) {
                    this.user = this.afs.doc<User>(`user/${user.uid}`).valueChanges();
                    return this.user;
                } else {
                    return Observable.of(null);
                }
            });
    }

    isLogin() {
        return window.localStorage.getItem('login');
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
    createUser(user) {
        console.log(user);
        // Sets user data to firestore on login
        const userRef = this.afs.doc(`user/${user.uid}`);
        console.log(userRef);
        const data = {
            photoURL: user.photoURL,
            displayName: user.displayName,
            email: user.email
        };
        return userRef.set(data);
    }

    emailLogin(email, password) {
        return new Promise<User>((resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(email, password).then(user => {
                this.user = this.afs.doc<User>(`user/${user.uid}`).valueChanges();
                window.localStorage.setItem('login','true');
                this.updateUserData(user);
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
                window.localStorage.setItem('login','true');
                this.user = this.afs.doc<User>(`user/${user.user.uid}`).valueChanges();
                console.log(user);
                resolve(user);
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    }

    register(email, password) {
        return new Promise<User>((resolve, reject) => {
            this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(user => {
                this.user = this.afs.doc<User>(`user/${user.uid}`).valueChanges();
                window.localStorage.setItem('login','true');
                this.createUser(user);
                user.sendEmailVerification();
                resolve(user);
            }).catch(error => {
                reject(error);
            });
        });
    }

    logout() {
        window.localStorage.removeItem('login');
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