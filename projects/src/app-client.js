import React from 'react'
import ReactDOM from 'react-dom'
import IndexPage from './components/IndexPage'

window.onload = () => {
  ReactDOM.render(<IndexPage />, document.getElementById('projects'))
}
