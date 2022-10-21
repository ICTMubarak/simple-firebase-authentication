import './App.css';
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import app from './firebase/firebase.init';
import { useState } from 'react';


const auth = getAuth(app); 

function App() {

  const [user, setUser] = useState({})

  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()

  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, googleProvider)
    .then(result =>{
      const user = result.user;
      setUser(user);
      console.log(user);

    })
    .catch(error => {
      console.error('error:', error);
    })
  }

const handleSignOut = () => {
  signOut(auth)
  .then( ()=>{
    setUser({});
  })
  .catch( ()=>{
    setUser({});
  })
}

const handleGithubSignIn = () =>{
  signInWithPopup(auth, githubProvider)
  .then(result =>{
    const user = result.user;
    console.log(user);
  })
  .catch(error =>{
    console.error('Error: ', error);
  })

}

  return (
    <div className="App">
      
      {
        user.uid ? 
        <button onClick={handleSignOut}>Sign Out</button>
        :
        <>
          <button onClick={handleGoogleSignIn}>Google Sign in</button>
          <button onClick={handleGithubSignIn}>Github Sign in</button>
        </>
  
      };
      
    {
        user.uid && <div>
        <h1>User name: {user.displayName}</h1>
        <p>User email: {user.email}</p>
        <img src={user.photoURL} alt="" />
      </div>
    }
    </div>
  );
}

export default App;
