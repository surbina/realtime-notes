import admin from "firebase-admin";

const {
  project_id: projectId,
  private_key: privateKey,
  client_email: clientEmail,
} = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string);

admin.initializeApp({
  credential: admin.credential.cert({
    projectId,
    privateKey,
    clientEmail,
  }),
  databaseURL: "https://databaseName.firebaseio.com",
});

export default admin.firestore();
