import config from "../../config/config";

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
                  url: t.signUrl('./signup.html'),
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
                callback: btnCallback
                }]
              }
        })
} 

let getTrelloCardData = () => {
  let t = window.TrelloPowerUp.iframe();
  let context = t.getContext();

  if (context) {
    console.log(context);
    return context.member || "data";
  } else {
    console.error("Context is undefined");
    // Handle the case when context is undefined
    // You might want to return a default value or throw an error
    return "defaultData";
  }
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

var btnCallback = function (t, opts) {
  return t.popup({
    title: 'Send',
    items: [{
      text: 'Add to Clickup',
      callback: async function (t) {
        console.log(t.getContext());
        var context = t.getContext();
                 var data = {
                  fields:{
                   trelloCardId: context.card,
                   trelloMemberId: context.board,
                   trelloBoardId: context.member
                  }
                 }    
                 console.log(data);
                 var myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");
                  myHeaders.append("Authorization", "Bearer pat8dFR91yJvAxN6v.b6879b08bd9556bcb2c7411e4a37208cc4336f8aef771db1e2a2b7ee3c1b0360");

                 let requestOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  body: JSON.stringify(data),
                  redirect: 'follow'
                };
                console.log(requestOptions.headers);
   fetch("https://api.airtable.com/v0/appwtI4RvxKzIOeHB/Table 1", requestOptions)
  .then(response => response.text())
  .then(result =>{ 
    return t.closePopup()
    })
  .catch(error => console.log('error', error));
      }
    }]
  });
};

export {TrelloPowerUp, oAuth, getTrelloBoardData, getTrelloCardData};