import React from 'react'

export default function Send2Clickup() {
  
  return (
    <>
    <h3>Send2Clickup Card Preview</h3>
     <div>
        <p>CardID:{}</p>
        
            <textarea name="text" id="cardTitle" cols="30" rows="10" placeholder='Title of card'></textarea>
            <textarea name="text" id="cardDescription" cols="30" rows="10" placeholder='Card Description'></textarea>
            <input type="text" name="description" placeholder="Task description" />
            <input type="text" name="list_id" placeholder="List ID" />
            <input type="submit" value="Send to ClickUp" />

        <p>Send a task to ClickUp using a form. The form will be submitted to the ClickUp API.</p>
        <p>The form will contain the task name, description, and list ID. The API will create the task in the specified list.</p>
        <p>The form will be submitted to the ClickUp API using the POST method.</p>
        <p>The API will return the created task object, which can be used to display the task in the UI.</p>
        <p>The form will be styled using CSS to make it look like a standard task form.</p>
     </div>
    </>
  )
}

