import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import ProjectCard from "../ProjectCard"
import { useFirestore } from 'react-redux-firebase'

export default function ProjectList(props) {
  const { currentUser } = props
  const firestore = useFirestore();
  const [data, setdata] = useState([])
  useFirestoreConnect([{ collection: 'projects' }])
  const projects = useSelector(state => state.firestore.ordered.projects)


  useEffect(() => {

    firestore.collection("projects").where("userId", "==", currentUser.uid).get()
      .then(function (querySnapshot) {
        let temp = [...data];
        querySnapshot.forEach(function (doc) {
          console.log(doc);
          temp = [...temp, doc.data()];
          console.log(doc.id, '==>', doc.data());
        });
        setdata(temp);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }, [])
  //  firestore.collection("projects").where("userId", "==", currentUser.uid).get()
  //   .then(function (querySnapshot) {
  //     querySnapshot.forEach(function (doc) {
  //       console.log(doc)
  //       setdata([...data, doc.data()])
  //       console.log(doc.id, '==>', doc.data());
  //     });
  //   })
  // .catch(function (error) {
  //   console.log("Error getting documents: ", error);
  // });
  if (isLoaded(projects)) {
    return (
      <div className="card-container">
        {/*this v doesnt make sence bc checking whole lib instead of user projects */}
        {projects.length === 0 ? <h1>Nothing yet add some!</h1> : projects.map(project => {
          if (project.userId === currentUser.uid) {
            return (<ProjectCard key={project.id} project={project} />)
          }
        })}
      </div>
    )

  } else {
    return <h1>Loading</h1>
  }
}