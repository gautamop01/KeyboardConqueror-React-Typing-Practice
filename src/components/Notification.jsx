// Notification.jsx
import React from 'react';
import './Notification.css'; // Import CSS for styling

const Notification = ({ message, onClose }) => {
    return (
        <div className="notification">
            <p>{message}</p>
            <button onClick={onClose} className="close-btn">Close</button>
        </div>
    );
};

export default Notification;
