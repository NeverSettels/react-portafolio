
import React, { useState } from 'react'
import { useFirestore } from 'react-redux-firebase'

export default function NewProjectForm(props) {
  const { setform } = props
  const firestore = useFirestore();
  const [name, setname] = useState('')
  const [url, seturl] = useState('')
  const [desc, setdesc] = useState('')
  const addProject = () => {
    setform(false)
    return firestore.collection('projects').add({ name, url, desc })
  }

  return (
    <div>
      <form >
        <input onChange={e => setname(e.target.value)} type="text" placeholder="project name" />
        <input onChange={e => seturl(e.target.value)} type="url" placeholder="project Deploy or Github Url" />
        <textarea onChange={e => setdesc(e.target.value)} cols="30" rows="10" placeholder="describe your project and tech used" />
        <button onClick={addProject} >Add!</button>
      </form>
    </div>
  )
}
