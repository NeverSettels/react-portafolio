import React, { useState } from 'react'
import { isLoaded } from 'react-redux-firebase';
import firebase from 'firebase/app'
import ProjectList from './ProjectList'
import NewProjectForm from './NewProjectForm';

export default function Main() {
  const [form, setform] = useState(false)


  const auth = firebase.auth();
  if (!isLoaded(auth)) {
    return (
      <React.Fragment>
        <h1>Loading...</h1>
      </React.Fragment>
    )
  }
  if ((isLoaded(auth)) && (auth.currentUser == null)) {

    return (
      <React.Fragment>
        <h1>You must be signed in to see your profile</h1>
      </React.Fragment>
    )
  }
  if ((isLoaded(auth)) && (auth.currentUser != null)) {
    console.log(auth.currentUser)
    return (
      <div>
        <h1>Your Projects</h1>
        {!form ? <ProjectList currentUser={auth.currentUser} /> : <NewProjectForm auth={auth} setform={setform} />}
        <button onClick={() => setform(true)}>Add Project</button>
      </div >
    )
  }
}
