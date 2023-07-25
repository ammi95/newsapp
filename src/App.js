// import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const pageSize = 6
  const apikey = process.env.REACT_APP_NEWS_API

  const[progress, setProgess]=useState(0)

  return (

    <Router>
      <Navbar />
      <LoadingBar
        color='#f11946'
        progress={progress}
        
      />
      <Routes>
        <Route exact path="/" element={<News apikey={apikey} setProgess={setProgess} key='general' pageSize={pageSize} country='in' category='general' />} />
        <Route exact path="/business" element={<News apikey={apikey} setProgess={setProgess} key='business' pageSize={pageSize} country='in' category='business' />} />
        <Route exact path="/entertainment" element={<News apikey={apikey} setProgess={setProgess} key='entertainment' pageSize={pageSize} country='in' category='entertainment' />} />
        <Route exact path="/health" element={<News apikey={apikey} setProgess={setProgess} key='health' pageSize={pageSize} country='in' category='health' />} />
        <Route exact path="/science" element={<News apikey={apikey} setProgess={setProgess} key='science' pageSize={pageSize} country='in' category='science' />} />
        <Route exact path="/Sports" element={<News apikey={apikey} setProgess={setProgess} key='Sports' pageSize={pageSize} country='in' category='Sports' />} />
        <Route exact path="/Technology" element={<News apikey={apikey} setProgess={setProgess} key='Technology' pageSize={pageSize} country='in' category='Technology' />} />
      </Routes>
    </Router>

  );
}
export default App;


