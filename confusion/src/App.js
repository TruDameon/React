import React from 'react';
import Main from './components/MainComponent';
import './App.css';
import { DISHES } from './shared/dishes';

class App extends React.Component {

  render() {
    return (
      <div>
        <Main />
      </div>
    );
  }
}

export default App;
