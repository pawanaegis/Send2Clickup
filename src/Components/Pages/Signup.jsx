import React,{useState, useEffect} from "react";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
// import config from "../../config/config";
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

    // const handleLogin = () => {
    //     // Open the authorization URL in a new window
    //     const newWindow = window.open(`${config.clickupURL}`, '_blank', 'width=640,height=480');
    //     setIsLoading(true);

    //     if (newWindow) {
    //         newWindow.focus();
    //     }
    // };
    
    var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

var btnCallback = function (t, opts) {
  return t.popup({
    title: 'Clickup Page',
    url: './send2clickup.html',
    args: { myArgs: 'You can access these with t.arg()' },
    height: 300 // initial height, can be changed later
  });
};

window.TrelloPowerUp.initialize({
  'card-buttons': function (t, opts) {
    return [{
      icon: GRAY_ICON,
      text: 'CLickup',
      callback: btnCallback
    }];
  }
});


    return(
        <>
    <h1>Send2Clickup</h1>
    <div>{code?<>
    <Button variant="contained" color="success" disableElevation>Connected</Button>
    </>: <Button
      variant="contained"
      color={'primary'}
      disableElevation
      onClick={btnCallback}
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