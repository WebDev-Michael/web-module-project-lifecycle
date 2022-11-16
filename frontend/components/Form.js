import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form id="todoForm" onSubmit={this.props.onFormSubmit}>
          <input value={this.props.todoNameInput} onChange={this.props.onInputChange} type="text" placeholder="Type Todo"/>
          <input type="submit"/>
        </form>
        <button onClick={this.props.toggleDisplayCompleted}>{this.props.displayCompleted ? 'Hide' : 'Show'} Completed</button>
      </>
    )
  }
} 
