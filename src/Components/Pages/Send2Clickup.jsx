import React,{useState} from 'react'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import config from "../../config/config";
import { dataForClickup } from '../Tools/trello';
import bigInt from 'big-integer';


export default function Send2Clickup() {
  let [isLoading, setIsLoading] = useState(false);
  let [status, setStatus] = useState(false);
  let token = localStorage.getItem('token')||null;
  console.log(token);
  let sendCardToClickup= async() => {
    let cardData = await dataForClickup();
    console.log(cardData.fields);
    setIsLoading(true);
    try {
      const clickupCard = await axios.post(
        `https://api.clickup.com/api/v2/list/${config.clickup_listId}/task`,
        {
          "name": `${cardData.fields.cardName}`,
          "description": `${cardData.fields.cardDescription}`,
          "assignees": [],
          "tags": [
            "No Tags"
          ],
          "status": "to do",
          "priority": 2,
          "due_date_time": true,
          "due_date": Number(bigInt(toString(cardData.fields.cardDueDate))),
          "start_date": Number(bigInt(new Date().getTime())),
          "start_date_time": true,
          "notify_all": true,
          "parent": null,
          "links_to": null,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Clickup Response", clickupCard);

      const response = await axios.post(
        `https://api.airtable.com/v0/${config.airtable_base}/${config.airtable_table}`,
        { fields: cardData.fields},
        {
          headers: {
            Authorization: `Bearer ${config.airtable_api}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setIsLoading(false);
      setStatus(true);
      console.log('Record created successfully:', response.data);
  } catch (error) {
    console.error('Error creating record:', error);
    // Handle error, show error message, etc.
  }
  }
  let closeWindow = () => {
    let t = window.TrelloPowerUp.iframe();
    t.closePopup();
   }
  return (
   
    <>
     <div>
        <h2>Send Card to Clickup</h2>
        {!token? <Button variant="contained" color="secondary" disableElevation onClick={closeWindow} >Please Login Your Clickup Account to Send Card</Button> :<>{status?<Button Button variant="contained" color="success" disableElevation onClick={closeWindow}>Done</Button>:<Button
      variant="contained"
      color={'primary'}
      disableElevation
      onClick={sendCardToClickup}
      disabled={isLoading}
      startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
      sx={{
        '&.Mui-disabled': {
            backgroundColor: '#FF00FF', // Red color for disabled state
            color: '#FFFFFF', // Text color for disabled state
            fontWeight: 'bold',
        },
        '&:hover': {
            backgroundColor: '#FF00FF', // Red color for hover state
        }, 
        '&.MuiButton-root': {
            fontWeight: 'bold',
        }
    }}
    >
      {isLoading ? 'Sending...' : 'Send Card'}
    </Button>}</>}
        
     </div>
    </>
  )
}

