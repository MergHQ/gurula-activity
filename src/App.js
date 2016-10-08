import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GraphData from './GraphData'

class App extends Component {
  render() {  
    return (
      <div className="App">
        <h2>Activity</h2>
          <GraphData />
      </div>
    );
  }
}

export default App;
