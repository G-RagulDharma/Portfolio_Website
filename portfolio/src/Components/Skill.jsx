import React, { useEffect, useState } from "react";
import styles from "./Skill.module.css";
import axios from "axios";

function TechnicalSkills() {
  const [skills, setSkills] = useState({
    programmingLanguages: [],
    frameworks: [],
    tools: [],
  });

  useEffect(() => {
    
    axios
      .get("http://localhost:3001/technical-skills")
      .then((response) => setSkills(response.data || {}))
      .catch((error) => console.error("Error fetching technical skills", error));
  }, []);

  return (
    <div className={styles.skillsContainer}>
      <h2 className={styles.header}>Technical Skills</h2>
      {skills ? (
        <div className={styles.skillsList}>
          <div className={styles.skillsCategory}>
            <h3>Programming Languages</h3>
            <ul>
              {skills.languages?.map((lang, index) => (
                <li key={index}>{lang}</li>
              ))}
            </ul>
          </div>

          <div className={styles.skillsCategory}>
            <h3>Frameworks</h3>
            <ul>
              {skills.frameworks?.map((framework, index) => (
                <li key={index}>{framework}</li>
              ))}
            </ul>
          </div>

          <div className={styles.skillsCategory}>
            <h3>Tools</h3>
            <ul>
              {skills.tools?.map((tool, index) => (
                <li key={index}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TechnicalSkills;
