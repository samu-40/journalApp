import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Switch
} from "react-router-dom";
import JournalScreen from '../components/journal/JournalScreen';
import AuthRouter from './AuthRouter';
import { firebase } from '../firebase/firebaseConfig'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';

const AppRouter = () => {

    const dispatch = useDispatch();

    const [cheking, setCheking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        firebase.auth().onAuthStateChanged( async user => {

            if (user?.uid) {

                dispatch( login( user.uid, user.displayName ) );

                setIsLoggedIn(true);

                dispatch( startLoadingNotes( user.uid ) );

            } else {

                setIsLoggedIn(false);

            }

            setCheking(false);

        });

    }, [dispatch, setCheking, setIsLoggedIn]);


    if( cheking ){

        return ( <h1>Wait...</h1> );

    } else {

        return (

            <Router>

                <div>

                    <Switch>

                        <PublicRoute
                            component={AuthRouter}
                            auth={isLoggedIn}
                            path='/auth'
                        />

                        <PrivateRoute
                            component={JournalScreen}
                            auth={isLoggedIn}
                            exact path='/'
                        />

                        <Redirect to='/auth/login' />

                    </Switch>

                </div>

            </Router>

        );

    };

};

export default AppRouter;
