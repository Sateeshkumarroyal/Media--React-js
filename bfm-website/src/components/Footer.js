import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//assets import
import Instagram from '../../src/Instagram.png';
import twitter from '../../src/twitter.png';
import tiktok from '../../src/tiktok.png';
import facebook from '../../src/facebook.png';
import linkedin from '../../src/linkedin.png';
import youtube from '../../src/youtube.png';

class Footer extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-black">
        <div className="container-fluid">
          <div className="social-icons d-flex justify-content-center align-items-center custom-element">
            <a href="https://www.instagram.com/bfmradio/?hl=en" className="social-icon">
              <img src={Instagram} alt="instagram" />
            </a>
            <a href="https://twitter.com/BFMradio" className="social-icon">
              <img src={twitter} alt="twitter" />
            </a>
            <a href="https://www.tiktok.com/@bfmradio" className="social-icon">
              <img src={tiktok} alt="tiktok" />
            </a>
            <a href="https://www.facebook.com/BFMradio/" className="social-icon">
              <img src={facebook} alt="facebook" />
            </a>
            <a href="https://www.linkedin.com/company/bfmmedia" className="social-icon">
              <img src={linkedin} alt="linkedin" />
            </a>
            <a href="https://www.youtube.com/channel/UCfNBfTwQNEEIuWcI5X1A0ig" className="social-icon">
              <img src={youtube} alt="youtube" />
            </a>
          </div>
          <div className="d-flex justify-content-center align-items-center custom-element">
            <span className="copyright-text">Copyright © BFM Media Sdn Bhd (200601017962)</span>
          </div>
        </div>
      </nav>
    );
  }
}

export default Footer;
