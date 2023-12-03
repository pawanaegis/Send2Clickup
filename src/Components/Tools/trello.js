import config from "../../config/config";

let TrelloPowerUp = () => {
    window.TrelloPowerUp.initialize({
        "board-buttons": function(t, opts) {
            // return t.board("all").then(function (board) {
            //   console.log(JSON.stringify(board, null, 2));
            // });
        },
        'show-authorization': function(t, options) {
            return t.popup({
                title: 'Connect Clickup',
                url: './signup.html',
                height: 140,
            });
        },
        'card-buttons': function(t, options) {
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
            return [{
                text: 'Send Card',
                callback: function(t) {
                    return t.popup({
                        title: 'Send Card to Clickup',
                        url: t.signUrl('./send2clickup.html'),
                        height: 300
                    })
                }
            }]
        }
    })
}

let getMemberData = async () => {
    let t = window.TrelloPowerUp.iframe();
    let memberData = await t.member("all")
    console.log(JSON.stringify(memberData));
    let context = await t.getContext();
    let sendData = {
        fields: {
            trelloUserId: memberData?.username || "",
            trelloUsername: memberData?.fullName || "",
            trelloMemberId: context?.member || "",
        }

    }
    console.log(sendData);
    return sendData;
}
let getSecretCode = async() =>{
    var t = window.TrelloPowerUp.iframe();
    let secretCode = await t.loadSecret('code');
    console.log(secretCode);
    return secretCode;
}
let dataForClickup = async () => {
    var t = window.TrelloPowerUp.iframe();
    let memberData = await t.member("all")
    console.log({memberData});
    let cardData = await t.card("all");
    console.log({cardData});
    let context = await t.getContext();
    console.log({context});

    let sendData = {
        fields: {
            trelloCardId: context?.card || "",
            trelloMemberId: context?.member || "",
            trelloBoardId: context?.board || "",
            trelloUserId: memberData?.username || "",
            trelloUsername: memberData?.fullName || "",
            cardDescription: cardData?.desc || "",
            cardName: cardData?.name || "",
            membersAssigned: JSON.stringify(cardData?.members) || "",
            cardDueDate: cardData?.due || "",
        }

    }
    console.log(sendData);
    return sendData;
}
export {
    TrelloPowerUp,
    getMemberData,
    dataForClickup,
    getSecretCode
};