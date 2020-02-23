import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import EmpList from './EmpList'
import Details from './Details'

class App extends Component {

  
  render() {
   
   
    return (
        <Provider store={store}>
           <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>
              <Route exact path="/" component={EmpList} />
              <Route exact path="/details" component={Details} />
            </Switch>
          </Router>
          </PersistGate>
          </Provider>
    );
  }
}

export default App;
