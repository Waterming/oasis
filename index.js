import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
import { Modal} from 'antd';
import Home from './src/Home';
import Article from './src/Article';
import Publish from './src/Publish';
function showContact() {
  const modal = Modal.info({
    title: '联系方式',
    content: 'cestbon_w@126.com',
    maskClosable: true,
  });
  setTimeout(() => modal.destroy(), 30000);
}
function App() {
  return (
    <Router>
      <div style={{height: 'auto',position:'relative',minHeight: '100%'}}>
      <header>
        <Link className="logo" to="/">Oasis Blog</Link>
        <nav>
          <Link className="navitem" to="/" >首页</Link>
          <Link className="navitem" to="/publish" >发表</Link>
          <a className="navitem contact"  onClick={showContact}>联系我们</a>
        </nav>
      </header>
      <div className="main">
        <div id="page">
          <Switch>
          
          <Route path="/article/:id" component={Article} />
          <Route path="/publish" component={Publish} />
          <Route path="/" component={Home} />
          </Switch>
        </div>
        {/* <div className="sider">
          <h3>友情链接</h3>
          <ul>
            <li><a href="">百度</a></li>
            <li><a href="">百度</a></li>
            <li><a href="">百度</a></li>
            <li><a href="">百度</a></li>
          </ul>
        </div> */}
      </div>
      <footer>
        基于星云链的博客，永久保存你的日志 <br/> 
        Copyright © 2018
      </footer>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
