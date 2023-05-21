import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, remove, get, child } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);

export function writeTaskData(userId, id, task, stts) {
  const db = database;
  set(ref(db, "tasks/" + userId + "/" + id), {
    id: id,
    task: task,
    completed: stts,
  });
}
export function deleteTaskData(userId, id) {
  const db = database;
  remove(ref(db, `tasks/${userId}/${id}`));
}
export async function getTaskData(userId) {
  const db = ref(database);
  const snapshot = await get(child(db, `tasks/${userId}`));
  if (snapshot.exists()) {
    let data = snapshot.val();
    let names = Object.keys(data);
    let finalData = [];
    names.forEach((name) => {
      let obj = {};
      obj = { ...obj, task: data[name].task };
      obj = { ...obj, id: data[name].id };
      obj = { ...obj, completed: data[name].completed };
      finalData = [...finalData, obj];
    });
    return finalData;
  } else {
    console.log("No data available");
    return null;
  }
}
//user
export function createUserData(email,password) {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}

export const auth = getAuth(app);
export const database = getDatabase(app);
