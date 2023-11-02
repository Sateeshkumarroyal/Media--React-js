import logo from './logo.svg';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'; //Include Heder
import Footer from './components/Footer'; //Include Footer
import Mainapp from './components/Mainapp'; // Correct the case

class App extends React.Component {
  
  render() {
    return (
     <div className="maincontainer">
      <Header></Header>
      <Mainapp className='mainApp'></Mainapp>
      <Footer></Footer>
    </div>
   )
  };
}
export default App;