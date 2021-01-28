import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Component } from 'react';
import LoginForm from './pages/LoginForm'
import HomePage from './pages/HomePage'
import PrivateRoute from './components/PrivateRoute'

const baseUrl = "http://localhost:3000/"
class App extends Component {
  state = {
    user: {},
    error: "",
    users: []
  }

  componentDidMount(){
   this.validateUser()
   this.getUsers()
  }

  getUsers = () => {
    fetch(baseUrl + "users")
      .then(response => response.json())
      .then(users => this.setState({users}))
  }

  validateUser = () => {
    let token = localStorage.getItem('token')
    if(token){
      fetch(baseUrl + "profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(result => {
        if(result.id){
          this.setState({
            user: result
          })
        }
      })
    }
  }

  login = (username, password, history) => {
    fetch(baseUrl + "login", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        user: {
          username,
          password
        }
      })
    })
    .then(response => response.json())
    .then(result => {
      if(result.token){
        localStorage.setItem('token', result.token)
        this.setState({
          user: result.user
        })
        history.push('/')
      } else {
        this.setState({
          error: result.error
        })
      }
    })
  }
  

  render(){
    return (
      <div className="App">
        <Switch>
          <Route path="/login" render={(routerProps) => <LoginForm {...routerProps} login={this.login} error={this.state.error} />} />
          <PrivateRoute path='/' component={HomePage} user={this.state.user} />
        </Switch>
      </div>
    );
  }
}
export default App;
