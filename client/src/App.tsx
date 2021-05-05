import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { PatientDashboard } from './components/pages/PatientDashboard';
import { PatientHistory } from './components/pages/patientHistory/PatientHistory';
import { WPTASForm } from './components/pages/wptasForm/WPTASForm';
import { ABSForm } from './components/pages/absForm/ABSForm';
import { PlaceholderScreen } from './components/pages/PlaceholderScreen';

function App() {
  return (
    <div className='App'>
      <Router>
        <Route exact={true} path='/' component={PlaceholderScreen} />
        <Route exact={true} path='/:id' component={PatientDashboard} />
        <Route exact={true} path='/:id/history' component={PatientHistory} />
        <Route exact={true} path='/:id/wptas' component={WPTASForm} />
        <Route exact={true} path='/:id/abs' component={ABSForm} />
      </Router>
    </div>
  );
}

export default App;
