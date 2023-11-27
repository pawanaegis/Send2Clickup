import React from "react";
import { Link } from "react-router-dom";
import { TrelloPowerUpIframe} from "../Trello/trello";

const Home =()=>{
    // TrelloPowerUp();
    TrelloPowerUpIframe();
    return(
        <div>
            <h1>Home</h1>
            <Link to="/signup.html">
                Signup
            </Link>
        </div>
    )

}

export default Home;