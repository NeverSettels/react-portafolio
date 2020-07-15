import React from 'react'

export default function ProjectCard(props) {
  const { project } = props
  return (
    <div key={project.id} className='pc'>
      <h2>{project.name}</h2>
      <h3>By {project.userEmail}</h3>
      <p>{project.desc}</p>
      <a href={project.url}>See it</a>
    </div>
  )
}
