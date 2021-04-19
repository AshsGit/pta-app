import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import { PatientDashboard } from './components/pages/PatientDashboard';
import { PatientHistory } from './components/pages/PatientHistory';
import { WPTASForm } from './components/pages/WPTAS/WPTASForm';
import { ABSForm } from './components/pages/ABSForm';
// import { Home } from './components/pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact={true} path="/:id" component={PatientDashboard} />
        {/* <Route exact={true} path="/dashboard/:id" component={PatientDashboard} /> */}
        <Route exact={true} path="/:id/history" component={PatientHistory} />
        <Route exact={true} path="/:id/wptas" component={WPTASForm} />
        <Route exact={true} path="/:id/abs" component={ABSForm} />
      </Router>
    </div>
  );
}

export default App;
