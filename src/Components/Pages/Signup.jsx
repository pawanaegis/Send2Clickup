import React,{useState} from "react";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import config from "../../config/config";
import { oAuth } from "../Trello/trello";
// import { useNavigate } from 'react-router-dom';
// import { getAuth, storeAuth } from "../Trello/trello";
const Signup =()=>{
     const [code, setCode] = useState(null);
    let [isLoading,setIsLoading] = useState(false);
    // const navigate = useNavigate();

    oAuth().then(()=>{
      setCode(1);
    });

    const handleLogin = () => {
        // Open the authorization URL in a new window
        const newWindow = window.open(`${config.clickupURL}`, '_blank', 'width=640,height=480');
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