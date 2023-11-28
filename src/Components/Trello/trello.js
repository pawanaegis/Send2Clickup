import config from "../../config/config";

let oAuth = () => {
  var t = window.TrelloPowerUp.iframe();
  var oauthUrl = `${config.clickupURL}`
  
  var authorizeOpts = {
    height: 680,
    width: 580,
  };
  
    t.authorize(oauthUrl, authorizeOpts)
      .then(function (token) {
          console.log(token);
   return t.set("member", "private", "token", token)
          .catch(t.NotHandled, function () {
            // fall back to storing at board level
            return t.set("board", "private", "token", token);
          });
      })
      .then(function () {
        // now that the token is stored, we can close this popup
        // you might alternatively choose to open a new popup
        console.log("Storing complete");
        t.closePopup();
      });
  }
let TrelloPowerUp = () => {
    window.TrelloPowerUp.initialize({
        "board-buttons": function (t, opts) {
          return t.board("all").then(function (board) {
            console.log(JSON.stringify(board, null, 2));
          });
        },
          'card-buttons': function(t, options) {
            var context = t.getContext();
            console.log(JSON.stringify(context, null, 2));
            return [{
              icon: config.appLogo,
              text: 'Send2Clickup',
              callback: oAuth()
            }]
          
          }
        })
} 

let storeAuth = (code) => {
let t = window.TrelloPowerUp.iframe();
return t.storeSecret('clickupAuth', code).then((code)=>{
    console.log("token saved",code);
});
}

let getAuth = () => {
    let t = window.TrelloPowerUp.iframe();
    return t.loadSecret('clickupAuth').then((secret)=>{
        console.log(secret);
        return secret;
    })

}


export {TrelloPowerUp, storeAuth, getAuth, oAuth};