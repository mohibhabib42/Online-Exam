import React,{useContext,useState,useEffect} from 'react'
import {auth} from '../dbconfiguration'


const Authcontext=React.createContext();

export function useAuth(){
    return useContext(Authcontext);
}

export function Authprovider({children}) {

    const [currentuser, setcurrrentuser] = useState()
    const  [loading, setloading] = useState(true)
    
    function signup(email,password){
    return auth.createUserWithEmailAndPassword(email,password)
    }
    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }
    function logout(email,password){
        return auth.signOut()
    }    
    useEffect(() => {
        const unsubscibe= auth.onAuthStateChanged(user=>{
            setcurrrentuser(user);
            setloading(false);
        })
        return unsubscibe;
    },[])
    const value ={
        currentuser,
        signup,
        login,
        logout
    }

    return (
    <Authcontext.Provider value={value}>
      {!loading && children}
    </Authcontext.Provider>
        
    )
}

