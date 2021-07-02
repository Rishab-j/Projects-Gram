export const createProject = ( project ) => {
    // return {
    //     type: "ADD_PROJECT",
    //     project: project
    // }


    // we have to do like this if we want to make async calls like 
    // communicating with databases
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('projects').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({
                type: "CREATE_PROJECT",
                project: project
            });
        }).catch((error) => {
            dispatch({
                type: 'CREATE_PROJECT_ERROR',
                error,
            });
        });
    }
}

export const deleteProject = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
      
      firestore.collection('projects').doc(id)
        .delete()
        .then(() => {
          dispatch({ type: 'DELETE_PROJECT', id })
        }).catch(err => {
          dispatch({ type: 'DELETE_PROJECT_ERROR', err })
      })
    }
};