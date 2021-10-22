import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { setError, unsetError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

const RegisterScreen = () => {
    
    const dispatch = useDispatch();
    const { msgError, loading } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formValues;

    const handleSubmit = (e) => {

        e.preventDefault();

        if( isFormValid() ){

            dispatch( startRegisterWithEmailPasswordName( email, password, name ) );

        };

    };

    const isFormValid = () => {

        if( name.trim().length < 2 ){

            dispatch( setError( 'Name is not valid' ) );
            return false;

        } else if ( !validator.isEmail( email ) ){

            dispatch( setError( 'Email is not valid' ) );
            return false;
        
        } else if( password !== password2 || password.length < 5 ){

            dispatch( setError( 'Password is not valid' ) );
            return false;

        }

        dispatch( unsetError() );
        return true;

    };

    return (

        <>
            
            <h3 className='auth__title'>Sign Up</h3>

            <form 
                className='auth__form'
                onSubmit={ handleSubmit }
            >

                {
                    msgError && 
                    (
                        <div className='auth__alert-error'>{ msgError }</div>
                    )
                }

                <input 
                    type='name'
                    placeholder='Name'
                    name='name'
                    autoComplete='off'
                    className='auth__input'
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input 
                    type='email'
                    placeholder='Email'
                    name='email'
                    autoComplete='off'
                    className='auth__input'
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input 
                    type='password'
                    placeholder='Confirm'
                    name='password2'
                    className='auth__input'
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button 
                    type='submit'
                    className='btn btn-primary btn-block mt-1'
                    disabled={ loading }
                >
                    Sign up
                </button>

                <Link 
                    to='/auth/login'
                    className='link mt-5'
                >
                    Sign In
                </Link>

            </form>

        </>

    );

};

export default RegisterScreen;
