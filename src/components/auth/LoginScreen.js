import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector( state => state.ui );

    const [formValues, hadleInputChange] = useForm({
        email: '',
        password: ''
    });

    const {email, password} = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch( startLoginEmailPassword(email, password) );
    };

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    };

    return (

        <>
            
            <h3 className='auth__title'>Sign In</h3>

            <form 
                className='auth__form'
                onSubmit={handleSubmit}
            >

                <input 
                    type='email'
                    placeholder='Email'
                    name='email'
                    autoComplete='off'
                    className='auth__input'
                    onChange={hadleInputChange}
                    value={email}
                />

                <input 
                    type='password'
                    placeholder='Password'
                    name='password'
                    autoComplete='off'
                    className='auth__input'
                    onChange={hadleInputChange}
                    value={password}
                />

                <button 
                    type='submit'
                    className='btn btn-primary btn-block'
                    disabled={ loading }
                >
                    Sign in
                </button>

                <div className='auth__social-networks'>

                    <p className='auth__title-social'>Sign in with social networks</p>

                    <div 
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >

                        <img 
                            className="google-icon" 
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                            alt="google button"
                        />

                        <p className="btn-text">

                            <b>Sign in with google</b>

                        </p>

                    </div>

                </div>

                <Link 
                    to='/auth/register'
                    className='link'
                >
                    Sign Up
                </Link>

            </form>

        </>

    );

};

export default LoginScreen;
