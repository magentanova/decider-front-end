import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';

import Page from './components/page'
import store from './state/store'

window.store = store

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Page />
        </div>
      </ Provider >
    );
  }
}

export default App;
