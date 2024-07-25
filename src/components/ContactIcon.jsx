import React from 'react';
import linkedin from '../pics/linkedin.png';
import github from '../pics/github.png';
import mail from '../pics/mail.png';

const Contact = () => {
  return (
    <>
      <div className="contacticonportion">
        <a href="mailto:gautam.kumar.21031@iitgoa.ac.in" target='_blank' rel="noopener noreferrer"><img src={mail} className='contacticon' alt="Gmail_icon"></img></a>
        <a href="https://www.linkedin.com/in/gautam-kumar-mahar-35b103234/" target='_blank' rel="noopener noreferrer"><img src={linkedin} className='contacticon' alt="linkedIn_icon"></img></a>
        <a href="https://github.com/gautamop01" target='_blank' rel="noopener noreferrer"><img src={github} className='contacticon' alt="github_icon"></img></a>
      </div>
    </>
  );
}

export default Contact;

