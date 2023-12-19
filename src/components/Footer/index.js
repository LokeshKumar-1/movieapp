import {FaTwitter, FaGoogle, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <footer className="contact-container">
    <div className="social-logos-container">
      <FaGoogle className="logos" />
      <FaTwitter className="logos" />
      <FaInstagram className="logos" />
      <FaYoutube className="logos" />
    </div>
    <p className="contactUs-text">Contact us</p>
  </footer>
)

export default Footer
