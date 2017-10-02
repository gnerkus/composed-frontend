import React from 'react'
import ProjectPreview from './ProjectPreview'
import projects from '../data/projects'

export default class IndexPage extends React.Component {
  render () {
    return (
      <div>
        <div>
          {projects.map(projectData => (
            <ProjectPreview key={projectData.id} {...projectData} />
          ))}
        </div>
      </div>
    )
  }
}
