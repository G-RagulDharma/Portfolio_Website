import React, { useState, useEffect } from "react";
import styles from "./Project.module.css";
import axios from "axios";

function Project() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/project-info");
        const data = response.data;
        // Validate that data is an array and has at least one item
        if (Array.isArray(data) && data.length > 0) {
          setProject({
            name: data[0].name || "N/A",
            description: data[0].description || "No description available",
            technology: data[0].technology || "N/A",
          });
        } else {
          setError("No project data available.");
        }
      } catch (error) {
        console.error("Error fetching project info:", error);
        setError("Failed to load project data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  if (loading) {
    return (
      <section className={styles.projectContainer}>
        <div className={styles.contentWrapper}>
          <p className={styles.loadingText}>Loading project...</p>
        </div>
      </section>
    );
  }


  return (
    <section className={styles.projectContainer}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.sectionHeader}>Project Details</h2>
        <div className={styles.projectInfo}>
          <h3 className={styles.label}>Project Name</h3>
          <p className={styles.projectTitle}>{project.name}</p>

          <h3 className={styles.label}>Description</h3>
          <p className={styles.projectDescription}>{project.description}</p>

          <h3 className={styles.label}>Technologies</h3>
          <p className={styles.projectTechnology}>{project.technology}</p>
        </div>
      </div>
    </section>
  );
}

export default Project;