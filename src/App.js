import React,{Component} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import {Modal,Button,Form,Input,Header} from 'semantic-ui-react'

firebase.initializeApp({
  apiKey:"AIzaSyDRWWXnrw_A9eEZVWzGTRC5SgVh9JdUPkM",
  authDomain:"authentication-b48ff.firebaseapp.com"
})


class App extends Component {
  state={isSignedIn: false}

  uiConfig = {
    signInFlow:"popup",
    signInOptions:[
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks:{
      signInSuccess:()=> false
    }
  }

  componentDidMount=()=>{
    firebase.auth().onAuthStateChanged(user =>{
      this.setState({isSignedIn:!!user})
    }) 
  }

  render(){
    return (
      <div className="App">
        {this.state.isSignedIn?(
          <div>
            <p>Signed In</p>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <button onClick={()=>firebase.auth().signOut()}>Sign Out</button>
          </div>
        ):(
          <div>
            <StyledFirebaseAuth 
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
           <Modal trigger={<Button>Sign Up</Button>}>
              <Form>
                <center>
                <Header>Sign Up Form</Header>
                <Input type="text" placeholder="Enter your name"/><br/>
                <Input type="password" placeholder="Enter your password" /><br />
                <Button>Sign Up</Button>
                </center>
              </Form>
           </Modal>
          </div>
        )}
      </div>
    );
  }
}

export default App;
