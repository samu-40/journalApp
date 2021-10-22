import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { fileUpoad } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from '../types/types';

export const startNewEntri = () => {

    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        const docRef = await db.collection(`${ uid }/journal/notes`).add( newNote );

        dispatch( activeNote( docRef.id, newNote ) );

        dispatch( addNewNote( docRef.id, newNote ) );

    };

};

export const addNewNote = ( id, note ) => ({

    type: types.notesAddNewEntri,
    payload: {
        id,
        ...note
    }

});

export const activeNote = ( id, note ) => ({

    type: types.notesActive,
    payload: {
        id, 
        ...note
    }

});

export const startLoadingNotes = ( uid ) => {

    return async ( dispatch ) => {

        const notes = await loadNotes( uid );

        dispatch( setNotes( notes ) );

    };

};

export const setNotes = ( notes ) => ({

    type: types.notesLoad,
    payload: notes

});

export const startSaveNote = ( note ) => {

    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        if( !note.url ) delete note.url;

        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );

        dispatch( refreshNote( note.id, noteToFirestore ) );

        Swal.fire('Save', note.title, 'success');

    };

};

export const refreshNote = ( id, note ) => ({

    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }

});

export const startUploadingImg = ( file ) => {

    return async ( dispatch, getState ) => {

        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpoad( file );

        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) );

        Swal.close();

    };

};

export const startDeletingNote = ( id ) => {

    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        await db.doc(`${ uid }/journal/notes/${ id }`).delete();

        dispatch( deleteNote( id ) );

    };

};

export const deleteNote = ( id ) => ({

    type: types.notesDelete,
    payload: id


});

export const logoutNote = () => ({

    type: types.notesLogoutCleanign

});