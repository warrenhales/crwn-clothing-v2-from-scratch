import { useState } from 'react';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEMailAndPassword as signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
  
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) 
        {
            alert("Not all fields have values");
            return;
        }

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {

            switch (error.code)
            {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/email-not-found':
                    alert('no user associated with this email')
                    break;
                default:
                    console.log('sign in encountered an error', error);
            }
        }
        resetFormFields();
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    return (
        <div className='sign-in-container'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name='email' value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name='password' value={password} />
                <div className="buttons-container">
                    <Button buttonType="default" type="submit" onClick={handleSubmit} >Sign In</Button>
                    <Button buttonType="google" type='button' onClick={signInWithGoogle} >Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;