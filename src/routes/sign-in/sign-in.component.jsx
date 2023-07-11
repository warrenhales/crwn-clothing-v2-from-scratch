import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        // console.log(response);

        const user = response.user;
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    
    
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in  with Google Popup
            </button>
        </div>
    )
}

export default SignIn;