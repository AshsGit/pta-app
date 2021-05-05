import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { PatientDashboard } from './components/pages/PatientDashboard';
import { PatientHistory } from './components/pages/PatientHistory';
import { WPTASForm } from './components/pages/WPTASForm';
import { ABSForm } from './components/pages/ABSForm';
import { Message } from './components/pages/Message';

function App() {
  return (
    <div className='App'>
      <Router>
        <Route exact={true} path='/' component={Message} />
        <Route exact={true} path='/:id' component={PatientDashboard} />
        <Route exact={true} path='/:id/history' component={PatientHistory} />
        <Route exact={true} path='/:id/wptas' component={WPTASForm} />
        <Route exact={true} path='/:id/abs' component={ABSForm} />
      </Router>
    </div>
  );
}

export default App;
