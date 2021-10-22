import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewEntri } from '../../actions/notes';
import JournalEntries from "./JournalEntries";

const Sidebar = () => {

    const dispatch = useDispatch();
    const { name } = useSelector( state => state.auth );

    const handleLogout = () => {

        dispatch( startLogout() );

    };

    const handleNewEntri = () => {

        dispatch( startNewEntri() );

    };

    return (

        <aside className='journal__sidebar'>
            
            <div className='journal__sidebar-nav'>

                <h3>

                    <i className='far fa-moon'></i>
                    <span> { name }</span>

                </h3>

                <button
                    className='btn'
                    onClick={ handleLogout }
                >
                    Logout
                </button>

            </div>

            <div className='journal__new-entry' onClick={ handleNewEntri } >

                <i className='far fa-calendar-plus fa-5x'></i>

                <p className='mt-1'>New entry</p>

            </div>

            <JournalEntries />

        </aside>

    )

}

export default Sidebar
