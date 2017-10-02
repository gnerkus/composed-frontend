import React from 'react'
import TodoPreview from './TodoPreview'
import todos from '../data/todos'

export default class IndexPage extends React.Component {
  render () {
    return (
      <div>
        <div>
          {todos.map(todoData => (
            <TodoPreview key={todoData.id} {...todoData} />
          ))}
        </div>
      </div>
    )
  }
}
