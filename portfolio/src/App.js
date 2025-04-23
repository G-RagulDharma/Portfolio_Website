import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AppStyles.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";

function App() {
  const [isLoginActive, setIsLoginActive] = useState(true); // Toggle between login and register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); 
  const navigate = useNavigate();

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoginActive) {
      axios
        .post("http://localhost:3001/login", { email, password }) //sending email,password to backend
        .then((result) => {
          console.log(result);
          if (result.data === "success") {
            alert("Login successful!");
            navigate("/form");
          } else {
            alert("Invalid login credentials.");
          }
        })
        .catch((err) => console.error(err));
    } else {
      
      axios
        .post("http://localhost:3001/register", { name, email, password })
        .then((result) => {
          console.log(result);
          if (result.data === "success") {
            alert("Registration successful!");
            setIsLoginActive(true); 
          } else {
            alert("Registration failed.");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  // Toggle between login and register forms
  const toggleForms = (formType) => {
    setIsLoginActive(formType === "login");
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className={styles.parent_container}>
      <div
        className={`${styles.form_container} ${
          isLoginActive ? "" : styles.register_active
        }`}
      >
        <div className={styles.col}>
          <div className={styles.btn_box}>
            <button
              className={`${styles.btn} ${
                isLoginActive ? styles.active_btn : ""
              }`}
              onClick={() => toggleForms("login")}
            >
              Sign In
            </button>
            <button
              className={`${styles.btn} ${
                !isLoginActive ? styles.active_btn : ""
              }`}
              onClick={() => toggleForms("register")}
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className={styles.container}>
          <form onSubmit={handleSubmit}>
            {isLoginActive ? (
              <div className={styles.login_form}>
                <div className={styles.form_title}>
                  <span>Sign In</span>
                </div>
                <div className={styles.form_inputs}>
                  <div className={styles.input_box}>
                    <input
                      type="email"
                      className={styles.input_field}
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.input_box}>
                    <input
                      type="password"
                      className={styles.input_field}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.forget_pass}>
                    <a href="/recover-password">Forget Password</a>
                  </div>
                  <div className={styles.input_box}>
                    <button type="submit" className={styles.input_submit}>
                      <span>Sign In</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.register_form}>
                <div className={styles.form_title}>
                  <span>Create Account</span>
                </div>
                <div className={styles.form_inputs}>
                  <div className={styles.input_box}>
                    <input
                      type="text"
                      className={styles.input_field}
                      placeholder="Username"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.input_box}>
                    <input
                      type="email"
                      className={styles.input_field}
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.input_box}>
                    <input
                      type="password"
                      className={styles.input_field}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.input_box}>
                    <button type="submit" className={styles.input_submit}>
                      <span>Sign Up</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
