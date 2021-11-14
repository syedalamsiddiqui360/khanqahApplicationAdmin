import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useRef, useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Header from './components/header';
import Content from './components/content';

import Person from "./components/person/person";
import Type from "./components/type/type";
import Category from "./components/category/category";
import Core from './core';
import Audio from "./components/audio/audio";
import Pdf from "./components/pdf/pdf";
import Slider from "./components/slider/slider";
import News from "./components/news/news";
import Image from "./components/image/image";


function App() {



  return (
    <Router>
      <div id="wrapper">
          <Navbar/>
          {/* <!-- Content Wrapper --> */}
          <div id="content-wrapper" class="d-flex flex-column">

              {/* <!-- Main Content --> */}
              <div id="content">
                <Header/>
                {/* <Content/> */}
                <Switch>
                  <Route exact={true} path="/" component={Content} />
                  <Route exact={true} path="/type" component={Type} />
                  <Route exact={true} path="/person" component={Person} />
                  <Route exact={true} path="/category" component={Category} />
                  <Route exact={true} path="/audio" component={Audio} />
                  <Route exact={true} path="/pdf" component={Pdf} />
                  <Route exact={true} path="/news" component={News} />
                  <Route exact={true} path="/slider" component={Slider} />
                  <Route exact={true} path="/image" component={Image} />
                  <Route exact={true} path="/core" component={Core} />
                </Switch>
              </div>
              {/* <!-- End of Main Content --> */}
              <Footer/>
          </div>
          {/* <!-- End of Content Wrapper --> */}
      </div>
  </Router>
  );
}

export default App;
