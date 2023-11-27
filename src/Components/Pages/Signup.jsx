import React from "react";
import Button from '@mui/material/Button';
// import CircularProgress from '@mui/material/CircularProgress';
// import config from "../../config/config";
import { oAuth } from "../Trello/trello";
// import { useNavigate } from 'react-router-dom';
// import { getAuth, storeAuth } from "../Trello/trello";
const Signup =()=>{
    //  const [code, setCode] = useState(null);
    // let [isLoading,setIsLoading] = useState(false);
    // const navigate = useNavigate();

   

    return(
        <>
    <h1>Send2Clickup</h1>
     <Button
      variant="contained"
      color={'primary'}
      disableElevation
      onClick={oAuth}
    >
      Connect Clickup
    </Button>
    </>
    )
    
}

export default Signup;