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

var btnCallback = function (t, opts) {
  return t.popup({
    title: 'Send',
    items: [{
      text: 'Add to Clickup',
      callback: async function (t) {
        console.log(t.getContext());
        var memberData = await t.member("all");
        var code = await t.loadSecret('code')
        .then(function (secret) {
          console.log(typeof secret);
          console.log("clickup code is",secret);
          return code;
        });
        var token = await t.loadSecret('token').then(function(secret){
          console.log("clickup token is",secret);
          return secret;
        })
        var cardData = await t.card("all").then(function (card) {
          console.log(JSON.stringify(card, null, 2));
          return card;
        });

        var context = t.getContext();

                 var data = {
                  fields:{
                   trelloCardId: context.card || "",
                   trelloMemberId: context.member || "",
                   trelloBoardId: context.board || "" ,
                   trelloUsername: memberData.username || "",
                   clickupCode: code || "",
                   clickupToken: token || "",
                   cardDescription: cardData.desc || "",
                   cardName: cardData.name || "",
                   membersAssigned: JSON.stringify(cardData.members) || "",
                   cardStartDate: cardData.start || "",
                   cardDueDate: cardData.due || "",
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
    console.log(result);
    })
  .catch(error => console.log('error', error));
      }
    }]
  });
};

export {TrelloPowerUp, getTrelloBoardData, getTrelloCardData};