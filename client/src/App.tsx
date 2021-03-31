import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import { Home } from './components/pages/Home';
import { PatientDashboard } from './components/pages/PatientDashboard';
import { PatientHistory } from './components/pages/PatientHistory';
import { WPTASForm } from './components/pages/WPTASForm';
import { ABSForm } from './components/pages/ABSForm';
// import { Home } from './components/pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/dashboard/:id" component={PatientDashboard} />
        <Route exact={true} path="/history/:id" component={PatientHistory} />
        <Route exact={true} path="/wptas/:id" component={WPTASForm} />
        <Route exact={true} path="/abs/:id" component={ABSForm} />
      </Router>
    </div>
  );
}

export default App;
