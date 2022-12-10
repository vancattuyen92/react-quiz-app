import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Question from "./pages/Question"
import FinalScreen from "./pages/FinalScreen"
import Setting from "./pages/Setting"


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/question" element={<Question/>}/> 
          <Route path="/" element={<Setting/>}/>
          <Route path="/finalscreen" element={<FinalScreen/>}/>          
        </Routes>
      </Router>

    </div>
  );
}

export default App;
