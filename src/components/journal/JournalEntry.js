import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

const JournalEntry = (props) => {

    const noteDate = moment(props.date);

    const dispatch = useDispatch();

    const handleNoteClick = () => {

        dispatch( activeNote( props.id, {...props} ) );

    };

    return (

        <div 
            className='journal__entry pointer  animate__animated animate__fadeInDown' 
            onClick={ handleNoteClick }>

            {
                props.url 
                &&
                <div 
                    className='journal__entry-picture'
                >
                    <img 
                        src={`${ props.url }`}
                        alt='img'
                    ></img>
                </div>
            }

            <div className='journal__entry-body'>

                <p className='journal__entry-title'>{ props.title }</p>

                <p className='journal__entry-content'>{ props.body }</p>

            </div>

            <div className='journal__entry-date-box'>

                <span>{ noteDate.format('dddd') }</span>

                <h4>{ noteDate.format('D') }</h4>

            </div>

        </div>

    )

}

export default JournalEntry;
