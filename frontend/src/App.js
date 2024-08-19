import React, { useState } from 'react'
import Chat from './components/Chat'
import io from 'socket.io-client'

const socket= io('http://localhost:4001');



const App = () => {

  const[inputName, setinputName]= useState("");
  const[inputRoom, setinputRoom]= useState("");
  const[showChat, setshowChat]= useState(false);

  const handleNameChange= (event)=>{
    setinputName(event.target.value);
   
    
  }

  const handleRoomChange= (event)=>{
    setinputRoom(event.target.value);
    
  }

  const joinRoom= ()=>{
    // console.log(inputName);
    // console.log(inputRoom);
    if(inputName!== "" && inputRoom!== "")
    {
      socket.emit('join-room', inputRoom);
      // setinputName('');
      // setinputRoom('');
      setshowChat(true);
    }
  }

  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f4f4f4',
      flexDirection: 'column',
    },
    input: {
      width: '300px',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      width: '320px',
      padding: '10px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <div style={styles.container}>
      {showChat ? (
        <Chat socket={socket} room={inputRoom} username={inputName} />
      ) : (
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Join a Chat Room</h2>
          <input
            type='text'
            placeholder='Name'
            value={inputName}
            onChange={handleNameChange}
            style={styles.input}
          />
          <input
            type='text'
            placeholder='Room'
            value={inputRoom}
            onChange={handleRoomChange}
            style={styles.input}
          />
          <button onClick={joinRoom} style={styles.button}>Join Room</button>
        </div>
      )}
    </div>
  );
}

export default App;