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
        console.log(config.clickupURL);
        // Function to extract the code from the URL
        const extractCodeFromURL = () => {
          const urlParams = new URLSearchParams(window.location.search);
          const authorizationCode = urlParams.get('code');
    
          if (authorizationCode) {
            // Update the state with the authorization code
            setCode(authorizationCode);
    
            // Store the authorization code in local storage
            localStorage.setItem('code', authorizationCode);
    
            // Close the new window if the code is present
            setIsLoading(false);
            window.close();
            navigate('/send2clickup.html');
            if (window.opener) {
                window.opener.location.reload();
              }
            }
        };
    
        // Check if the authorization code is already in local storage
        const storedCode = localStorage.getItem('code');
        if (storedCode) {
          // If it's present, update the state with the stored code
          setCode(storedCode);
          navigate('/send2clickup.html');
        } else {
          // If not, extract the code from the URL
          extractCodeFromURL();
        }
    
        // Add an event listener for when the new window is closed
        const closeWindowListener = () => {
          // Extract the code when the new window is closed
          extractCodeFromURL();
        };
    
        // Add the event listener
        window.addEventListener('beforeunload', closeWindowListener);
    
        // Clean up the event listener when the component is unmounted
        return () => {
          window.removeEventListener('beforeunload', closeWindowListener);
        };
      }, [code,isLoading,navigate]);
    const handleLogin = () => {
        // Open the authorization URL in a new window
        const newWindow = window.open(`${config.clickupURL}`, '_blank','width=640,height=480');
        setIsLoading(true);
        // Optional: Focus on the new window
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
      color="primary"
      disableElevation
      onClick={handleLogin}
      disabled={isLoading}
      startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
    >
      {isLoading ? 'Connecting...' : 'Connect ClickUp'}
    </Button>}</div>
   
    </>
    )
    
}

export default Signup;