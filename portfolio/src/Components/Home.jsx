import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import axios from "axios";
function Home() {
    const [profile, setProfile] = useState({ name: "", role: "", img: "" });

    useEffect(() => {
        axios.get("http://localhost:3001/latest-profile") //Fetch Profile Data
            .then((response) => setProfile(response.data))
            .catch((error) => console.error("Error fetching Profile", error));
    }, []);

    return (
        <div className={styles.HomeContainer}>

            <div className={styles.TextContainer}>
                <h2 className={styles.HomeContainer_h2}>Hello,it's Me</h2>
                <h3 className={styles.HomeContainer_h3}>{profile.name}</h3>
                <h4 className={styles.HomeContainer_h4}>And I'm a {profile.role}</h4>
            </div>

            <div className={styles.imagecontainer}>
                {profile.img ? (
                    <img src={profile.img} className={styles.img} alt="Profile" />
                ) : (
                    <p>Loading image...</p>
                )}
            </div>

        </div>

    )
}
export default Home;