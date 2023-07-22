// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
// import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  pageSize= 6
  apikey =process.env.REACT_APP_NEWS_API
  
 
  render() {
    return (

      <Router>
        <Navbar />
        
        <Routes>
          <Route exact path="/" element={<News apikey={this.apikey} key='general' pageSize={this.pageSize} country='us' category='general' />} />
          <Route exact path="/business" element={<News apikey={this.apikey} key='business' pageSize={this.pageSize} country='us' category='business' />} />
          <Route exact path="/entertainment" element={<News apikey={this.apikey} key='entertainment' pageSize={this.pageSize} country='us' category='entertainment' />} />
          <Route exact path="/health" element={<News apikey={this.apikey} key='health' pageSize={this.pageSize} country='us' category='health' />} />
          <Route exact path="/science" element={<News apikey={this.apikey} key='science' pageSize={this.pageSize} country='us' category='science' />} />
          <Route exact path="/Sports" element={<News apikey={this.apikey} key='Sports' pageSize={this.pageSize} country='us' category='Sports' />} />
          <Route exact path="/Technology" element={<News apikey={this.apikey} key='Technology' pageSize={this.pageSize} country='us' category='Technology' />} />
        </Routes>
      </Router>

    );
  }
}

