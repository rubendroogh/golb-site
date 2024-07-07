import admin from 'firebase-admin';

const serviceAccount = require('@/firebaseServiceAccount.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export const db = admin.firestore();
export const auth = admin.auth();