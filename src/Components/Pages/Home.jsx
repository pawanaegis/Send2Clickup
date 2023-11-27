import React from "react";
import { Link } from "react-router-dom";
import config from "../../config/config";

const Home =()=>{
    window.TrelloPowerUp.initialize({
        'card-buttons': function(t, options) {
          var context = t.getContext();
          console.log(JSON.stringify(context, null, 2));
          return [{
            icon: config.appLogo,
            text: 'Send2Clickup',
            callback: function(t) {
              return t.popup({
                title: 'Send2Clickup',
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