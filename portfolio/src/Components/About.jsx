import React, { useEffect, useState } from "react";
import styles from "./AboutStyles.module.css";
import axios from "axios";

function About() {
    const [profile, setProfile] = useState({
        summary: "",
        skills: [],
        education: []
    });

    useEffect(() => {
        axios.get("http://localhost:3001/latest-profile")
            .then((response) => {
                setProfile(response.data);
            })
            .catch((error) => console.error("Error fetching Profile", error));
    }, []);

    return (
        <section className={styles.aboutContainer}>
            <div className={styles.contentWrapper}>
                <h2 className={styles.sectionHeader}>Professional Summary</h2>
                <p className={styles.summaryText}>{profile.summary}</p>

                <h2 className={styles.sectionHeader}>Technical Skills</h2>
                <div className={styles.skillsGrid}>
                    {profile.skills.map((skill, index) => (
                        <div key={index} className={styles.skillItem}>
                            {skill}
                        </div>
                    ))}
                </div>

                <h2 className={styles.sectionHeader}>Education</h2>
                <div className={styles.educationList}>
                    {profile.education.map((edu, index) => (
                        <div key={index} className={styles.educationItem}>
                            <h3 className={styles.educationDegree}>{edu.degree}</h3>
                            <p className={styles.educationDetails}>
                                {edu.institution} | {edu.year}
                            </p>
                            <p className={styles.educationMarks}>
                                {edu.marks}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default About;