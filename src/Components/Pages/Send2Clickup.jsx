import React,{useState, useEffect} from 'react'

export default function Send2Clickup() {
    const [cardId, setCardId] = useState('Not Found!!');

    useEffect(() => {
      // Use the Power-Up API to get context information
      window.TrelloPowerUp.initialize({
        'card-badges': function (t, options) {
          // Get the card ID from the context
          const cardId = options.card.id;
          setCardId(cardId);
          
          // You can do more with the card information here, such as making additional API calls
          // to get more details about the card
          // ...
  
          // Return a promise that resolves to the card badge data
          return t.card('id').get('id').then((cardId) => {
            return [{
              // Display information on the card
              text: `Card ID: ${cardId}`,
              color: 'green',
            }];
          });
        },
      });
    }, []);
  return (
    <>
    <h1>Send2Clickup</h1>
     <div>
        <p>CardID:{cardId}</p>
        <form action="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" method="POST">
            <input type="text" name="name" placeholder="Task name" />
            <input type="text" name="description" placeholder="Task description" />
            <input type="text" name="list_id" placeholder="List ID" />
            <input type="submit" value="Send to ClickUp" />
        </form>
        <p>Send a task to ClickUp using a form. The form will be submitted to the ClickUp API.</p>
        <p>The form will contain the task name, description, and list ID. The API will create the task in the specified list.</p>
        <p>The form will be submitted to the ClickUp API using the POST method.</p>
        <p>The API will return the created task object, which can be used to display the task in the UI.</p>
        <p>The form will be styled using CSS to make it look like a standard task form.</p>
     </div>
    </>
  )
}

