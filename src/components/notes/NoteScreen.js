import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeletingNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import NoteAppBar from "./NoteAppBar";

const NoteScreen = () => {

    const dispatch = useDispatch();
    const { active: note } = useSelector( state => state.notes );
    const [ formValue, handleInputChange, reset ] = useForm( note );
    const { body, title, url, id } = formValue;

    const activeId = useRef( note.id );

    useEffect(() => {

        if( note.id !== activeId.current ){
            reset( note );
            activeId.current = note.id;
        };
        
    }, [note, reset]);

    useEffect(() => {
        
        dispatch( activeNote( formValue.id, {...formValue} ) );

    }, [formValue, dispatch]);

    const handleDelete = () => {

        dispatch( startDeletingNote( id ) );

    };

    return (

        <div className='notes__main-content'>

            <NoteAppBar />

            <div className='notes__content'>

                <input
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    autoComplete='off'
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder='What happened today?'
                    className='notes__textarea'
                    name='body'
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {
                    url && (<div className='notes__images'>

                                <img 
                                    src={ url }
                                    alt='Imagen'
                                />
                            
                            </div>)
                }

            </div>

            <button className='btn btn-danger' onClick={ handleDelete }>
                    
                Delete

            </button>
            
        </div>

    )

}

export default NoteScreen
