import React,{useState, useEffect} from "react";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import config from "../../config/config";
import { useNavigate } from 'react-router-dom';
const Signup =()=>{
    const [code, setCode] = useState(null);
    let [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const extractCodeFromURL = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const authorizationCode = urlParams.get('code');

            if (authorizationCode) {
                setCode(authorizationCode);
                localStorage.setItem('code', authorizationCode);
                setIsLoading(false);

                // Close the new window
                window.close();

                // Close the Trello popup (if using TrelloPowerUp)
                let t = window.TrelloPowerUp.iframe();
                t.closePopup();

                // Communicate the code to the main Trello page
                if (window.opener) {
                    window.opener.postMessage({ code: authorizationCode }, '*');
                }

                // navigate('/send2clickup.html');
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

        // Listen for messages from the new window or iframe
        window.addEventListener('message', handleMessage);

        // Clean up event listeners when the component is unmounted
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [navigate]);

    const handleMessage = (event) => {
        // Handle messages from the new window or iframe
        if (event.data && event.data.code) {
            setCode(event.data.code);
        }
    };

    const handleLogin = () => {
        // Open the authorization URL in a new window
         window.location.href = `${config.clickupURL}`;
        setIsLoading(true);

        // if (newWindow) {
        //     newWindow.focus();
        // }
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