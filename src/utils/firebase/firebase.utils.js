import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDlabbnlLttrRPIYb9WgnsZhpOEkXAwkBQ",
    authDomain: "crwn-clothing-db-e03bf.firebaseapp.com",
    projectId: "crwn-clothing-db-e03bf",
    storageBucket: "crwn-clothing-db-e03bf.appspot.com",
    messagingSenderId: "543385524474",
    appId: "1:543385524474:web:d2fbb6a63deaa758e81143"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
   
    if (!userSnapshot.exists())
    {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }
        catch (error)
        {
            console.log('error creating the user', error.Message);
        }
    }

    return userDocRef;
  }