import React from "react";
import { Link } from "react-router-dom";

const Home =()=>{
    window.TrelloPowerUp.initialize({
        'card-buttons': function(t, options) {
          return [{
            icon: '../Assets/logo192.png',
            text: 'Signup',
            callback: function(t) {
              return t.popup({
                title: 'Clickup',
                url: './signup.html',
                height: 300
              })
            }
          }]
        
        }
      })
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