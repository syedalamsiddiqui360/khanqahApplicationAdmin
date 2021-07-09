import React, { useRef, useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Header from './components/header';
import Content from './components/content';

function App() {



  return (
    <div id="wrapper">

    <Navbar/>
        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" class="d-flex flex-column">

            {/* <!-- Main Content --> */}
            <div id="content">

              <Header/>

<Content/>

            </div>
            {/* <!-- End of Main Content --> */}

            <Footer/>

        </div>
        {/* <!-- End of Content Wrapper --> */}
    </div>
  );
}

export default App;
