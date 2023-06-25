import React, { useEffect, useState } from "react";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";
import { Routes, Route ,useNavigate} from "react-router-dom";
import {Home,Login} from './components'

 const App = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    //setIsLoading(true);
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
           console.log(token);
        });
        //setIsLoading(false);
      } else {
        setAuth(false);
        
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, []);

  


  return (
    <div className='w-screen h-scren bg-blue-400 flex justify-centre items-centre'>
    <Routes>
        <Route path='/login' element={<Login setAuth={setAuth}/>}> </Route>
        <Route path='/*' element={<Home />} />
    </Routes>
    </div>
  )
}
export default App