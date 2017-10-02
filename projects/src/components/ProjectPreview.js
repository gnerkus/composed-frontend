import React from 'react'

export default class ProjectPreview extends React.Component {
  render () {
    return (
      <div>
        <h4>{this.props.id}</h4>
        <h2>{this.props.name}</h2>
      </div>
    )
  }
}
