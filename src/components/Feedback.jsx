import React from 'react';
import Contact from './Contact'


const Feedback = () => {
    return (
        <>
            <footer className="Feedback">
                <Contact />
                <p>Feedback </p>
                <form action="#" method="POST">
                    <div>
                        {/* <label htmlFor="name">Name:</label> */}
                        <input type="text" id="name" name="name" placeholder="Enter your name" className="Feedbackinput" />
                    </div>
                    <div>
                        {/* <label htmlFor="email">Email:</label> */}
                        <input type="email" id="email" name="email" placeholder="Enter your email" className="Feedbackinput" />
                    </div>
                    <div>
                        {/* <label htmlFor="message">Message:</label> */}
                        <textarea type="text" id="message" name="message" placeholder="Enter your message" className="Feedbacktext" />
                    </div>
                    <button type="submit" className='send'>Send</button>
                </form>
            </footer>
        </>
    );
}

export default Feedback;

