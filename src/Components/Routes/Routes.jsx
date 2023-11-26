import React from "react";
import {Routes,Route} from "react-router-dom"
import Home from "../Pages/Home";
import Signup from "../Pages/Signup";
import Send2Clickup from "../Pages/Send2Clickup";

const RouteComponents =()=>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signup.html" element={<Signup/>}/>
            <Route path="/send2clickup.html" element={<Send2Clickup/>}/>
        </Routes>
    )

}

export default RouteComponents;