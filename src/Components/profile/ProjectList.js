import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
//import firebase from 'firebase/app'

export default function ProjectList() {
  useFirestoreConnect([{ collection: 'projects' }])
  const projects = useSelector(state => state.firestore.ordered.projects)
  if (isLoaded(projects)) {
    console.log(projects)
    return (
      <div>
        {projects.length === 0 ? <h1>Nothing yet add some!</h1> : "projects"}
      </div>
    )

  } else {
    return <h1>Loading</h1>
  }
}