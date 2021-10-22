import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploadingImg } from '../../actions/notes';

const NoteAppBar = () => {

    const dispatch = useDispatch();
    const { active: note } = useSelector( state => state.notes );

    const handleSaveClick = () => {

        dispatch( startSaveNote( note ) );

    };

    const handlePicture = () => {

        document.getElementById('inputFile').click();

    };

    const handleChangeFile = e => {

        const file = e.target.files[0];

        if(file){
            
            dispatch( startUploadingImg( file ) );

        };

    };

    return (

        <div className='notes__appbar'>

            <span>23 de Junio de 2021</span>

            <input
                id='inputFile'
                type='file'
                name='file'
                style={{ display:'none' }}
                onChange={ handleChangeFile }
            />
            
            <div className='btn' onClick={ handlePicture }>
                Picture
            </div>

            <div className='btn' onClick={handleSaveClick}>
                Save
            </div>

        </div>

    )

}

export default NoteAppBar
