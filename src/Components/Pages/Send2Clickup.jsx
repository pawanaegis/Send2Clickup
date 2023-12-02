import React,{useState} from 'react'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import config from "../../config/config";


export default function Send2Clickup() {
  let [isLoading, setIsLoading] = useState(false);

  let sendCardToClickup= async(data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://api.airtable.com/v0/${config.airtable_base}/${config.airtable_table}`,
        { fields: data },
        {
          headers: {
            Authorization: `Bearer ${config.airtable_api}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setIsLoading(false);
      console.log('Record created successfully:', response.data);
  } catch (error) {
    console.error('Error creating record:', error);
    // Handle error, show error message, etc.
  }
     
  }
  return (
   
    <>
    <h3>Send2Clickup Card Preview</h3>
     <div>
        <h1>Send Card to Clickup</h1>
        <Button
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
      {isLoading ? 'Connecting...' : 'Connect ClickUp'}
    </Button>
        <p style={{background:"green"}}>Clickup Connect.</p>
     </div>
    </>
  )
}

