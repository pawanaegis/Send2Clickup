import React,{useState, useEffect} from "react";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import config from "../../config/config";
import { useNavigate } from 'react-router-dom';
import { getAllData } from "../Trello/trello";
const Signup =()=>{
    const [code, setCode] = useState(null);
    let [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        // Function to extract the code from the URL
        const extractCodeFromURL = () => {
          const urlParams = new URLSearchParams(window.location.search);
          const authorizationCode = urlParams.get('code');
          getAllData();
    
          if (authorizationCode) {
            setCode(authorizationCode);
            
            localStorage.setItem('code', authorizationCode);
            const token = authorizationCode;
            window.postMessage({ type: 'code', token }, '*');

            window.close();
            // navigate('/send2clickup.html');
            if (window.opener) {
                window.opener.location.reload();
              }
            }
        };
    
        // Check if the authorization code is already in local storage
        const storedCode = localStorage.getItem('code');
        if (storedCode) {
            setCode(storedCode);
            // navigate('/send2clickup.html');
        } else {
            extractCodeFromURL();
        }

        // Check if the new window is closed periodically
        const checkWindowClosed = setInterval(() => {
            if (!code && isLoading && window.closed) {
                setIsLoading(false);
            }
        }, 500); // Adjust the interval as needed
        
        window.addEventListener('message', (event) => {
          // Check if the message is from a trusted origin (replace 'your_child_origin' with the actual origin)
          if (event.origin === 'your_child_origin') {
            const { type, token } = event.data;
        
            // Check the message type
            if (type === 'code') {
              // Store the token in the local storage of the parent window (iframe)
              localStorage.setItem('code', token);
            }
          }
        });
        // Clean up the interval when the component is unmounted
        return () => {
            clearInterval(checkWindowClosed);
        };
      }, [code,isLoading,navigate]);

     
    const handleLogin = () => {
        // Open the authorization URL in a new window
        const newWindow = window.open(`${config.clickupURL}`, '_blank','width=640,height=480');
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