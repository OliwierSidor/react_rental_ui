import React from 'react';
import classes from './Notification.module.css';

const Notification = (props) => {
    const divClasses = [];
    if(props.children){
        divClasses.push(classes.NotificationContainer)
    }

    return (
        <div className={divClasses.join('')}>
            {props.children}
        </div>
    );
};

export default Notification;