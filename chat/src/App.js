import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './styles.css';
import Home from './views/Home';
import Chat from './views/Chat';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/chat" component={Chat} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;

/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/