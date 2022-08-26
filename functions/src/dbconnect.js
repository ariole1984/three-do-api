import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/fireStore";
import { credentials } from "./credentials.js";

export default function dbConnect() { // later as "by user id" to this...
  // return an array of all of the Firebase services (e.g. Firestore) that we are connected to
  if (getApps().length) {
    // not yet connected...
    initializeApp({
      credential: cert(credentials),
    });
  }
  return getFirestore();
}
