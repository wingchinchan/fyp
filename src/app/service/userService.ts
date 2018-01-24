import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

export interface User {
    uid: string;
    photoURL?: string;
    displayName?: string;
    email?: string;
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
    updateProfile(userObj, uid) {
        const userRef = this.afs.doc(`user/${uid}`);
        userRef.update(userObj);
    }
    updateUserData(user) {
        console.log(user);
        // Sets user data to firestore on login
        const userRef = this.afs.doc(`user/${user.uid}`);
        console.log(userRef);
        const data = {
            uid: user.uid,
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
            uid: user.uid,
            displayName: user.displayName,
            email: user.email
        };
        return userRef.set(data);
    }
    createUserByEmail(user, displayName) {
        console.log(user);
        // Sets user data to firestore on login
        const userRef = this.afs.doc(`user/${user.uid}`);
        console.log(userRef);
        const data = {
            uid: user.uid,
            displayName: displayName,
            email: user.email,
            photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSgJ2_u9xXrMkZgeDbjhsE29U8IlU9_TDcr2h9_C3MpTKH47pP'
        };
        return userRef.set(data);
    }

    emailLogin(email, password) {
        return new Promise<User>((resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(email, password).then(user => {
                this.user = this.afs.doc<User>(`user/${user.uid}`).valueChanges();
                window.localStorage.setItem('login','true');
                this.user.subscribe(userObj => {
                    if (!userObj) {
                        this.createUser(user);
                    }
                });
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

                window.localStorage.setItem('login','true');
                this.user = this.afs.doc<User>(`user/${user.user.uid}`).valueChanges();
                this.user.subscribe(userObj => {
                    if (userObj) {
                        this.updateUserData(user.user);
                    } else {
                        this.createUser(user.user);
                    }
                })
                console.log(user);
                resolve(user);
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    }
    facebookLogin(){
        return new Promise<User>((resolve, reject) => {
            this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(user => {
                window.localStorage.setItem('login','true');
                this.user = this.afs.doc<User>(`user/${user.user.uid}`).valueChanges();
                this.user.subscribe(userObj => {
                    if (userObj) {
                        this.updateUserData(user.user);
                    } else {
                        this.createUser(user.user);
                    }
                })
                console.log(user);
                resolve(user);
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    }

    register(displayName, email, password) {
        return new Promise<User>((resolve, reject) => {
            this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(user => {
                this.user = this.afs.doc<User>(`user/${user.uid}`).valueChanges();
                window.localStorage.setItem('login','true');
                this.createUserByEmail(user, displayName);
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