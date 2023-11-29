import config from "../../config/config";

let memberId;
let TrelloPowerUp = () => {
    window.TrelloPowerUp.initialize({
        "board-buttons": function (t, opts) {
          // return t.board("all").then(function (board) {
          //   console.log(JSON.stringify(board, null, 2));
          // });
        },
        'show-authorization': function(t, options){
          return t.popup({
            title: 'Connect Clickup',
            url: './signup.html',
            height: 140,
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
          
          },
          'card-detail-badges': function(t, options) {
            return [
              {
                icon: config.appLogo,
                text:'Add2Clickup',
                callback: function (t) {
                  return t.popup({
                    title: "Send2Clickup",
                    url: "./Signup.html",
                  });
                },
              },
            ];
          }
        })
} 

let getTrelloCardData = () =>{
  let t = window.TrelloPowerUp.iframe();
  
  let context =  t.getContext();  
  memberId = context.memberId;
  console.log(memberId);
  return memberId;
}

let getTrelloBoardData = () =>{
  let boardData = window.TrelloPowerUp.initialize({
    "board-buttons": function (t, opts) {
      return t.board("all").then(function (board) {
        console.log(JSON.stringify(board, null, 2));
        return board;
      });
    },
  })
  return boardData;
}

let oAuth = (url) =>{
  const t = window.TrelloPowerUp.iframe();

// When constructing the URL, remember that you'll need to encode your
// APPNAME and RETURNURL
// You can do that with the encodeURIComponent(string) function
// encodeURIComponent('Hello World') -> "Hello%20World"
var authorizeOpts = {
  height: 680,
  width: 580,
};
const oauthUrl =encodeURI(url)
console.log(oauthUrl);
  t.authorize(oauthUrl, authorizeOpts)
    .then(function (token) {
      return t
        .set("organization", "private", "token", token)
        .catch(t.NotHandled, function () {
          // fall back to storing at board level
          return t.set("board", "private", "token", token);
        });
    })
    .then(function () {
      // now that the token is stored, we can close this popup
      // you might alternatively choose to open a new popup
      return t.closePopup();
    });
}

export {TrelloPowerUp, oAuth, getTrelloBoardData, getTrelloCardData, memberId};