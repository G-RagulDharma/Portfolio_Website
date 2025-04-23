import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Header from "./Components/Header";
import  Form  from "./Components/Form"


const Main = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/header" element={<Header />} />  
            <Route path="/form" element={<Form />} />  

        </Routes>
    );
};

export default Main;
