import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Component} from 'react';
import WeekContainer from './WeekContainer';
class App extends Component{
  render(){

    return (
      <div className="App">
          <WeekContainer />
      </div>
    );
  }
}

export default App;
