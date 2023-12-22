import React, { useEffect } from 'react'
import "./styles.css" ;
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import userSvg from "../../assets/user.svg";
function Header() {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);

    console.log("User>>>>>>>>>>>", user);

    useEffect(()=>{
        if(user){
            navigate("/dashboard");
        }
    },[user, loading]);

    function funcLogout(){
       try{
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
          navigate("/")
          toast.success("User Loged out");
         
        }).catch((error) => {
          // An error happened.
        });
       }catch(e){
        toast.error(e.message);
       }
    }

    
    return (
        <div className='navbar'> 
        <p className='logo'>Financely.</p>
       {user?(
          <p className="navbar-link" onClick={funcLogout}>
          <span style={{ marginRight: "1rem" }}>
            <img
              src={user.photoURL ? user.photoURL : userSvg}
              width={user.photoURL ? "32" : "24"}
              style={{ borderRadius: "50%" }}
            />
          </span>
          {user.displayName? user.displayName:"Logout"}
        </p>
        ):""}
         </div>
    )
}

export default Header
