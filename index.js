import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
import Home from './src/Home';
import Article from './src/Article';
import Publish from './src/Publish';

function App() {
  return (
    <Router>
      <div style={{height: '100%'}}>
      <header>
        <div className="logo"></div>
        <nav>
          <Link className="navitem" to="/publish" >发表</Link>
        </nav>
      </header>
      <div className="main">
        <div id="page">
          <Switch>
          <Route path="/home" component={Home} />
          <Route path="/article/:id" component={Article} />
          <Route path="/publish" component={Publish} />
          <Redirect from="/" to="/home" />
          </Switch>
        </div>
        <div className="sider">
          <h3>友情链接</h3>
          <ul>
            <li><a href="">百度</a></li>
            <li><a href="">百度</a></li>
            <li><a href="">百度</a></li>
            <li><a href="">百度</a></li>
          </ul>
        </div>
      </div>
      <footer>
        Copyright © 2018
      </footer>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
