import React, { useState } from 'react';

import Home from './Home';
import About from './About';
import Project from './Project';
import Skill from './Skill';
import Contact from './Contact';
import styles from './Header.module.css';

function Header() {
  const [activeSection, setActiveSection] = useState('home');

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className={styles.navigation}>
      <h2 className={styles.Header_h2}>Portfolio</h2>
      <nav>
        <a onClick={() => handleNavClick('home')}>Home</a>
        <a onClick={() => handleNavClick('about')}>About</a>
        <a onClick={() => handleNavClick('project')}>Project</a>
        <a onClick={() => handleNavClick('skill')}>Skill</a>
        <a onClick={() => handleNavClick('contact')}>Contact</a>
        <div className={`${styles.animation} ${styles[`start-${activeSection}`]}`}></div>
      </nav>

      {/* Conditionally render content based on activeSection */}
      <div className={styles.content}>
        {activeSection === 'home' && <Home />}
        {activeSection === 'about' && <About />}
        {activeSection === 'project' && <Project />}
        {activeSection === 'skill' && <Skill />}
        {activeSection === 'contact' && <Contact />}
      </div>
    </div>
  );
}

export default Header;
