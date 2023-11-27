import config from "../../config/config";


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
} 

 let TrelloPowerUpIframe = () => {
var t = window.TrelloPowerUp.iframe();
return t.getAll()
.then(function (data) {
    console.log(data);
  console.log(JSON.stringify(data, null, 2));
});
 }

export {TrelloPowerUp, TrelloPowerUpIframe};