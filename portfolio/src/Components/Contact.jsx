import React, { useEffect, useState } from "react";
import styles from "./Contact.module.css";
import axios from "axios";

function Contact() {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    // Fetch contact info from the backend or database
    axios.get("http://localhost:3001/contact-info")
      .then((response) => {
        console.log("API Response:", response.data); // Debugging log
        setContact(response.data); // Remove [0] since backend returns an object
      })
      .catch((error) => console.error("Error fetching contact info", error));


  }, []);

  return (
    <div className={styles.contactContainer}>
      <h2 className={styles.header}>Contact Information</h2>
      {contact ? (
        <div className={styles.contactDetails}>
          <div className={styles.contactItem}>
            <strong>Email: </strong>
            <span>{contact.email}</span>
          </div>
          <div className={styles.contactItem}>
            <strong>Phone: </strong>
            <span>{contact.phone}</span>
          </div>
          <div className={styles.contactItem}>
            <strong>LinkedIn: </strong>
            <span><a href={contact.linkedIn} target="_blank" rel="noopener noreferrer">{contact.linkedIn}</a></span>
          </div>
          <div className={styles.contactItem}>
            <strong>GitHub: </strong>
            <span><a href={contact.github} target="_blank" rel="noopener noreferrer">{contact.github}</a></span>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Contact;
