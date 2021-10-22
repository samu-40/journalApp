import { db } from "../firebase/firebaseConfig";

export const loadNotes = async ( uid ) => {

    const notesSnap = await db.collection(`${ uid }/journal/notes`).get();
    const notes = [];

    notesSnap.forEach( childSnap => {

        notes.push({

            id: childSnap.id,
            ...childSnap.data()

        });

    });

    return notes;

};