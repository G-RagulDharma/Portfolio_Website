import React, { useState } from "react";
import styles from "./FormStyles.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [img, setImg] = useState(null);
  const [role, setRole] = useState("");
  const [dob, setDob] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState([""]);
  const [projects, setProjects] = useState([{ name: "", description: "", technology: "" }]);
  const [education, setEducation] = useState([{ degree: "", institution: "", year: "", marks: "" }]);
  const [contact, setContact] = useState([{ email: "", phone: "", linkedIn: "", github: "" }]);

  const [languages, setLanguages] = useState([""]);
  const [frameworks, setFrameworks] = useState([""]);
  const [tools, setTools] = useState([""]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImg(reader.result);
    };
  };

  // Handle Technical skill changes
  const handleAddItem = (setter, items) => setter([...items, ""]);
  const handleItemChange = (setter, items, index, value) => {
    const updatedItems = [...items];
    updatedItems[index] = value;
    setter(updatedItems);
  };
  const handleRemoveItem = (setter, items, index) => setter(items.filter((_, i) => i !== index));

  // Handle skill changes
  const handleAddSkill = () => setSkills([...skills, ""]);
  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };
  const handleRemoveSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

  // Handle project changes
  const handleAddProject = () => setProjects([...projects, { name: "", description: "", technology: "" }]);
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };
  const handleRemoveProject = (index) => setProjects(projects.filter((_, i) => i !== index));

  // Handle education changes
  const handleAddEducation = () => setEducation([...education, { degree: "", institution: "", year: "", marks: "" }]);
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };
  const handleRemoveEducation = (index) => setEducation(education.filter((_, i) => i !== index));

  // Handle contact changes
  const handleContactChange = (field, value) => {
    setContact({ ...contact, [field]: value });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name,
      img,
      role,
      dob,
      summary,
      technicalSkills: { languages, frameworks, tools },
      skills,
      projects,
      education,
      contact,
    };

    axios.post('http://localhost:3001/submit-profile', formData)
      .then((result) => {
        console.log('Form submitted successfully:', result);
        alert("Form submitted successfully");
        navigate("/header");
      })
      .catch((err) => {
        console.error('Form submission error:', err);
        alert("Form submission Failed");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>PROFILE</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="file"
            onChange={handleImageUpload}
            required
          />
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />

          <h2>ABOUT SECTION</h2>
          <textarea
            placeholder="Professional Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          {/* Skills Section */}
          <h2>Add Your Skills</h2>
          {skills.map((skill, index) => (
            <div key={index} className={styles.inputGroup}>
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                placeholder={`Skill ${index + 1}`}
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => handleRemoveSkill(index)}
                className={styles.remove}
              >
                Remove
              </button>
            </div>
          ))}
          <div className={styles.buttonGroup}>
            <button type="button" onClick={handleAddSkill}>
              Add Skill
            </button>
          </div>

          {/* Projects Section */}
          <h2>Add Your Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className={styles.projectGroup}>
              <input
                type="text"
                value={project.name}
                onChange={(e) =>
                  handleProjectChange(index, "name", e.target.value)
                }
                placeholder={`Project Name ${index + 1}`}
                className={styles.input}
              />
              <textarea
                value={project.description}
                onChange={(e) =>
                  handleProjectChange(index, "description", e.target.value)
                }
                placeholder="Project Description"
                rows="3"
                className={styles.textarea}
              />
              <input
                type="text"
                value={project.technology}
                onChange={(e) =>
                  handleProjectChange(index, "technology", e.target.value)
                }
                placeholder="Technology Used"
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => handleRemoveProject(index)}
                className={styles.remove}
              >
                Remove Project
              </button>
            </div>
          ))}
          <div className={styles.buttonGroup}>
            <button type="button" onClick={handleAddProject}>
              Add Project
            </button>
          </div>

          {/* Education Section */}
          <h2>Add Your Education</h2>
          {education.map((edu, index) => (
            <div key={index} className={styles.inputGroup}>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                placeholder={`Degree ${index + 1}`}
                className={styles.input}
              />
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                placeholder="Institution"
                className={styles.input}
              />
              <input
                type="text"
                value={edu.year}
                onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                placeholder="Year of Graduation"
                className={styles.input}
              />
              <input
                type="text"
                value={edu.marks}
                onChange={(e) => handleEducationChange(index, "marks", e.target.value)}
                placeholder="Marks/CGPA"
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => handleRemoveEducation(index)}
                className={styles.remove}
              >
                Remove Education
              </button>
            </div>
          ))}
          <div className={styles.buttonGroup}>
            <button type="button" onClick={handleAddEducation}>
              Add Education
            </button>
          </div>

          {/* Technical Skills Section */}
          <h2>Technical Skills</h2>

          <h3>Programming Languages</h3>
          {languages.map((lang, index) => (
            <div key={index} className={styles.inputGroup}>
              <input type="text" value={lang} onChange={(e) => handleItemChange(setLanguages, languages, index, e.target.value)} placeholder="Language" />
              <button type="button" onClick={() => handleRemoveItem(setLanguages, languages, index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem(setLanguages, languages)}>Add Language</button>

          <h3>Frameworks</h3>
          {frameworks.map((fw, index) => (
            <div key={index} className={styles.inputGroup}>
              <input type="text" value={fw} onChange={(e) => handleItemChange(setFrameworks, frameworks, index, e.target.value)} placeholder="Framework" />
              <button type="button" onClick={() => handleRemoveItem(setFrameworks, frameworks, index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem(setFrameworks, frameworks)}>Add Framework</button>

          <h3>Tools & Technologies</h3>
          {tools.map((tool, index) => (
            <div key={index} className={styles.inputGroup}>
              <input type="text" value={tool} onChange={(e) => handleItemChange(setTools, tools, index, e.target.value)} placeholder="Tool" />
              <button type="button" onClick={() => handleRemoveItem(setTools, tools, index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem(setTools, tools)}>Add Tool</button>

          {/* Contact Section */}
          <h2>Contact Section</h2>
          <input
            type="email"
            placeholder="Email"
            value={contact.email}
            onChange={(e) => handleContactChange("email", e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Phone Number"
            value={contact.phone}
            onChange={(e) => handleContactChange("phone", e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="LinkedIn Link"
            value={contact.linkedIn}
            onChange={(e) => handleContactChange("linkedIn", e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="GitHub Link"
            value={contact.github}
            onChange={(e) => handleContactChange("github", e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
