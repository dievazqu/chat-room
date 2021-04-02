import './App.css';
import LoginBox from './components/LoginBox.js'
import ChatRoom from './components/ChatRoom.js'
import { useState } from 'react';
import COLORS from "./colors"

function App() {

  const handleLogin = (token) => {
      console.log("Logging with token: " + token);
      setToken(token);
  }

  const [token, setToken] = useState(null);



  return (
      <div style={{backgroundColor: COLORS.background, height: "100%"}}>
          {token === null ? <LoginBox onLogin={handleLogin}/> : <ChatRoom token={token}/> }
      </div>
  );
}

export default App;
