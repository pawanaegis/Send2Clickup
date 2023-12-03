import React,{useState} from 'react'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import config from "../../config/config";
import { dataForClickup } from '../Tools/trello';


export default function Send2Clickup() {
  let [isLoading, setIsLoading] = useState(false);
  let [status, setStatus] = useState(false);
  let [token, setToken] = useState(null);
  setToken(localStorage.getItem('token'));
  let sendCardToClickup= async() => {
    let cardData = await dataForClickup();
    console.log(cardData.fields);
    setIsLoading(true);
    try {
      const clickupCard = await axios.post(
        `https://api.clickup.com/api/v2/list/${config.clickup_listId}/task`,
        { 
          data:{
          "name": "New Task By Trello",
          "description": "New Task Description",
          "assignees": [],
          "tags": [
            "tag name 1"
          ],
          "status": "to do",
          "priority": 1,
          "due_date": 0,
          "due_date_time": false,
          "time_estimate": 0,
          "start_date": 0,
          "start_date_time": false,
          "notify_all": true,
          "parent": null,
          "links_to": null
        }
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
        {token?<>{status?<Button Button variant="contained" color="success" disableElevation onClick={closeWindow}>Done</Button>:<Button
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
    </Button>}</>:<Button Button variant="contained" color="danger" disableElevation >Please Login Your Clickup Account to Send Card</Button>}
        
     </div>
    </>
  )
}

