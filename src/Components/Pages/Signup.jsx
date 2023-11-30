import React,{useState, useEffect} from "react";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import config from "../../config/config";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getTrelloCardData } from "../Trello/trello";
const Signup =()=>{
    let [code, setCode] = useState(null);
    let [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();
    const registerUser = async(data) =>{
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
          console.log('Record created successfully:', response.data);
      } catch (error) {
        console.error('Error creating record:', error);
        // Handle error, show error message, etc.
      }
     }
    useEffect(() => {
      if(localStorage.getItem('code')){
        navigate('/Send2Clickup.html')
      }
      const handleMessage = (event) => {
        // Ensure the message is from a trusted source (security check)
        // For production, you might want to validate the origin of the message
        // and check the message structure.
        // For simplicity, this example uses '*'.
        if (event.origin !== window.location.origin) {
            return;
        }
  
        // Handle the received data
        const receivedData = event.data;
        console.log('Received data from child window:', receivedData);
        if(typeof receivedData === 'string'){
          var t = window.TrelloPowerUp.iframe();
          setCode(receivedData);
          localStorage.setItem('code', receivedData);
          t.storeSecret('code', receivedData);
         
        } 
        setIsLoading(false);
    };
        // Function to extract the code from the URL
        const extractCodeFromURL = () => {
          const urlParams = new URLSearchParams(window.location.search);
          const authorizationCode = urlParams.get('code');
          
          if (authorizationCode) {
            let data2 = {ClickupCode:authorizationCode}
            console.log(data2);
            window.opener.postMessage(authorizationCode, '*');
            window.close();         
            }
        };
    
        // Check if the authorization code is already in local storage
        const storedCode = localStorage.getItem('code');
        if (storedCode) {
            setCode(storedCode);
            var t = window.TrelloPowerUp.iframe();
            registerUser({ClickupCode:code, trelloMemberId:getTrelloCardData()}).then(()=>{
            t.closePopup();
            });
        } else {
            extractCodeFromURL();
        }

        // Check if the new window is closed periodically
        const checkWindowClosed = setInterval(() => {
            if (!code && isLoading && window.closed) {
                setIsLoading(false);
            }
        }, 500); // Adjust the interval as needed
        // Clean up the interval when the component is unmounted

        window.addEventListener('message',handleMessage)
        return () => {
            clearInterval(checkWindowClosed);
            window.removeEventListener('message', handleMessage);
        };
      }, [code,isLoading,navigate]);

     
    const handleLogin = () => {
        // Open the authorization URL in a new window
        const newWindow = window.open(`${config.clickupURL}`, 'blank','width=640,height=480');
        setIsLoading(true);
        if (newWindow) {
          newWindow.focus();
        }
      };

    return(
        <>
    <h1>Send2Clickup</h1>
    <div>{code?<>
    <Button variant="contained" color="success" disableElevation>Connected</Button>
    </>: <Button
      variant="contained"
      color={'primary'}
      disableElevation
      onClick={handleLogin}
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
    </Button>}</div>
   
    </>
    )
    
}

export default Signup;