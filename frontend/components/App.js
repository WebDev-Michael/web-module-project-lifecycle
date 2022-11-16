import React from 'react'
import axios from "axios"

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      todos:[],
      error: '',
      todoNameInput: ''
    }
  }

  onInputChange = evt => {
    const { value } = evt.target
    this.setState({...this.state, todoNameInput: value})
  }

  resetForm = () => {
    this.setState({...this.state, todoNameInput: ''})
  }

  setAxiosResponseError = (err) => {
    this.setState({...this.state, error: err.response.data.message})
  }

  postNewTodo = () => {
    axios.post(URL, {name: this.state.todoNameInput})
    .then(res => {
      this.setState({...this.state, todos: this.state.todos.concat(res.data.data)})
      this.resetForm()
    })
    .catch(this.setAxiosResponseError)
  }

  onFormSubmit = evt => {
    evt.preventDefault();
    this.postNewTodo()
  }

  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({...this.state, todos: res.data.data})
    })
    .catch(this.setAxiosResponseError)
  }

  componentDidMount() {
    console.log("Component Mounted")
    this.fetchAllTodos()
  }

  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <div id="todos">
          <h2>Todos</h2>
          {
            this.state.todos.map(td => {
              return <div key={td.id}>{td.name}</div>
            })
          }
        </div>
        <form id="todoForm" onSubmit={this.onFormSubmit}>
          <input value={this.state.todoNameInput} onChange={this.onInputChange} type="text" placeholder="Type Todo"/>
          <input type="submit"/>
          <button>Clear Completed</button>
        </form>
      </div>
    )
  }
} 
