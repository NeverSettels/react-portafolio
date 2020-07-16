import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import { useFirestore } from 'react-redux-firebase';
export default function ProjectCard(props) {
  const { project } = props
  const firestore = useFirestore();
  const [user, setUser] = useState(null)
  const auth = firebase.auth()

  useEffect(() => {
    setUser(auth.currentUser)
  }, [auth])

  const like = (id, userId) => {
    if (!project.usersLiked.includes(userId)) {
      console.log(id);
      return firestore.update({ collection: 'projects', doc: project.id }, { likes: project.likes + 1, usersLiked: [...project.usersLiked, userId] })
    } else {
      console.log("already liked");

    }
    console.log("proj id =>", id, "user id =>", userId)
  }

  return (
    <div key={project.id} className='pc'>
      <h2>{project.name}</h2>
      <h3>By {project.userEmail}</h3>
      <p>{project.desc}</p>
      <h4>Likes: {project.likes}</h4>
      {user != null ? <button onClick={() => like(project.id, user.uid)}>Like</button> : ''}
      <a href={project.url}>See it</a>
    </div>
  )
}
