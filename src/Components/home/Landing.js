import React from 'react'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux'
import ProjectCard from "../ProjectCard"
export default function Landing() {
  useFirestoreConnect([{ collection: 'projects' }])
  const projects = useSelector(state => state.firestore.ordered.projects)
  if (isLoaded(projects)) {
    console.log(projects)
    return (
      <>
        <h1>All Projects</h1>
        <div className="card-container">

          {projects.length === 0 ? <h1>Nothing yet add some!</h1> : projects.map(project => (<ProjectCard project={project} />))}
        </div>
      </>
    )

  } else {
    return <h1>Loading</h1>
  }
}
