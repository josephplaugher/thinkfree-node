import React, { Component } from 'react';
import Fire from './util/Fire';
import LoggedIn from './LoggedIn';
import Login from './Login';

class App extends Component {
  constructor() {
    super();
    this.authListener = this.authListener.bind(this);
  }
  state = {
    user: '',
  };

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    console.log('firebase...');
    Fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }
  render() {
    return (
     <div>{this.state.user ? (<LoggedIn user={this.state.user}/>) : (<Login />)}</div>
    )
}
}

 export default App;