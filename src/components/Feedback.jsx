// Feedback.jsx
import React, { useState } from 'react';
import Contact from './Contact';
import Notification from './Notification'; // Import the Notification component

const Feedback = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        setIsSubmitted(true);   // Show the notification on form submission
    };

    const closeNotification = () => {
        setIsSubmitted(false);  // Close the notification when the button is clicked
    };

    return (
        <>
            <footer className="Feedback">
                <Contact />
                <p>Feedback</p>
                <form onSubmit={handleSubmit} method="POST">
                    <div>
                        <input type="text" id="name" name="name" placeholder="Enter your name" className="Feedbackinput" />
                    </div>
                    <div>
                        <input type="email" id="email" name="email" placeholder="Enter your email" className="Feedbackinput" />
                    </div>
                    <div>
                        <textarea id="message" name="message" placeholder="Enter your message" className="Feedbacktext" />
                    </div>
                    <button type="submit" className='send'>Send</button>
                </form>
            </footer>

            {/* Render the notification */}
            {isSubmitted && (
                <Notification
                    message="Your feedback has been submitted successfully!"
                    onClose={closeNotification}
                />
            )}
        </>
    );
}

export default Feedback;
