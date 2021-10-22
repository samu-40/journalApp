import { types } from "../types/types";
import { firebase, googleAuthProvaider } from '../firebase/firebaseConfig';
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2';
import { logoutNote } from "./notes";

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        
        dispatch( startLoading() );

        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ( { user } ) =>  {

                dispatch( login( user.uid, user.displayName ) );

                dispatch( finishLoading() );

            }
        ).catch( e => {

            dispatch( finishLoading() );

            Swal.fire( 'Error', e.message, 'error' );

        });
        
    };
};

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {

    return ( dispatch ) => {

        dispatch( startLoading() );

        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async ( { user } ) => {

                await user.updateProfile( { displayName: name } );
                
                dispatch( login( user.uid, user.displayName ) );

                dispatch( finishLoading() );

            }
        ).catch( e => {

            dispatch( finishLoading() );

            Swal.fire( 'Error', e.message, 'error' );
        
        });

    };

};

export const startGoogleLogin = () => {

    return ( dispatch ) => {

        firebase.auth().signInWithPopup(googleAuthProvaider)
            .then( ( { user: { uid, displayName } } ) => {
                
                dispatch(

                    login( uid, displayName )

                );

            } );

    };

};

export const login = (uid, displayName) => (
    {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
);

export const startLogout = () => {

    return async ( dispatch ) => {

        await firebase.auth().signOut();

        dispatch( logout() );

        dispatch( logoutNote() );

    }
    
};

export const logout = () => (

    {
        type: types.logout
    }

);