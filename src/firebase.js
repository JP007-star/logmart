// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVJnHZFEf1XUAGanvNwaZpotfcvt-pbmc",
  authDomain: "logmart-4d87b.firebaseapp.com",
  projectId: "logmart-4d87b",
  storageBucket: "logmart-4d87b.appspot.com",
  messagingSenderId: "871379367366",
  appId: "1:871379367366:web:2cd6ad540f78aa8c146ec7",
  measurementId: "G-RSBNZWS52Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

/**
 * Uploads an image to Firebase Storage and returns the URL of the uploaded image.
 * @param {File} imageFile - The image file to be uploaded.
 * @returns {Promise<string>} - A promise that resolves to the URL of the uploaded image.
 */
export const uploadImage = async (imageFile) => {
  const storageRef = ref(storage, `products/${imageFile.name}`);
  await uploadBytes(storageRef, imageFile);
  const imageUrl = await getDownloadURL(storageRef);
  return imageUrl;
};
