import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import ProjectCard from "../ProjectCard"
import { useFirestore } from 'react-redux-firebase'

export default function ProjectList(props) {
  const { currentUser } = props
  const firestore = useFirestore();
  const [data, setdata] = useState([])

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


  return (
    <div className="card-container">
      {data.length === 0 ? <h1>Nothing yet add some!</h1> : data.map(project => <ProjectCard key={project.id} project={project} />)}

    </div>
  )


}