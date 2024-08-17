import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

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

// Initialize Firebase services
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

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

/**
 * Signs in the user using Google Sign-In and returns the user information.
 * @returns {Promise<Object>} - A promise that resolves to the user object containing user information.
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Extract and return user information
    return {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    throw error;
  }
};

/**
 * Signs out the current user.
 * @returns {Promise<void>} - A promise that resolves when the user is signed out.
 */
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error during sign-out:", error);
    throw error;
  }
};

export { auth, provider };
