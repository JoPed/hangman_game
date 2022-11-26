import React, { useEffect, useRef } from 'react';
import "../scss/Notification.scss";

const Notification = ({ message, notificationRef }) => {



    useEffect(() => {

        let timeOut;

        if (message !== "") {
            notificationRef.current.innerHTML = message;
            notificationRef.current.classList.add("active");

            timeOut = setTimeout(() => {
                notificationRef.current.classList.remove("active");

            }, 4000)
        }

        return () => {
            clearTimeout(timeOut);
        }


    }, [message])

    return (

        <>
            {
                message != "" ? <div className="notification" ref={notificationRef} /> : null
            }
        </>

    )
}

export default Notification