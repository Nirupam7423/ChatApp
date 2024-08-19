// import React, { useEffect, useState } from 'react'
// import { IoSend } from "react-icons/io5";


// const Chat = ({socket, room, name}) => {
//     const[inputValue, setinputValue]= useState("");
//     const[messageList, setmessageList]= useState([]);


    
//    const handleChange= (event)=>{
//     setinputValue(event.target.value); // asynchronous nature
//    }


//    const handleClick = async()=>{

//     const finalMessage= {
//       room :room,
//       name :name,
//       message: inputValue,
//       time: `${new Date().getHours()}:${new Date().getMinutes()}`

//     }
//     setinputValue('');

//     await socket.emit('user-message', finalMessage)
//     // setmessageList(prevMessage=>[...prevMessage,finalMessage])
      
//   }

//     useEffect(()=>{

//       socket.on('server-message', (finalMessage)=>{
//         setmessageList(prevMessage=>[...prevMessage,finalMessage])
//         // console.log(message)
//           // console.log("Message from server- ", message)
//       })
//     },[socket])

    
//     // setmessage('');

  


//   return (
//     <div>
//         <div>
//           <h1>Chat here</h1>
//         </div>
//         <div>
//           {messageList.map((msg,index)=>{
//             return(
//             <p key={index}>
//             <strong>{msg.name}</strong>: {msg.message} <em>{msg.time}</em>
//           </p>
//           )})}
//         </div>
//         <div>
//             {/* <p>{message}</p> */}
//             <input type='text' placeholder='Message here' value={inputValue} onChange={handleChange}/>
//             <button onClick={handleClick}><IoSend/></button>
            
//         </div>
//     </div>
//   )
// }

// export default Chat

import React, { useEffect, useState } from 'react'
import { IoSend } from "react-icons/io5";

const Chat = ({socket, room, username}) => {
    const[inputValue, setInputValue]= useState("");
    const[messageList, setMessageList]= useState([]);

   const handleChange= (event)=>{
      setInputValue(event.target.value); // asynchronous nature
   }

   const handleClick = async () => {
    if(inputValue!=="")
    {
      const finalMessage = {
         room: room,
         name: username,
         message: inputValue,
         time: `${new Date().getHours()}:${new Date().getMinutes()}`
      };

      setInputValue('');

      await socket.emit('user-message', finalMessage);
      // Remove this line to prevent duplication:
      setMessageList(prevMessage => [...prevMessage, finalMessage]);
   }
  }

   useEffect(() => {
      socket.on('server-message', (finalMessage) => {
         setMessageList(prevMessage => [...prevMessage, finalMessage]);
      });

      // Cleanup the listener when the component unmounts
      return () => {
         socket.off('server-message');
      };
   }, [socket]);


   const styles = {
    chatContainer: {
        width: '400px',
        margin: '0 auto',
        border: '2px solid #ccc',
        borderRadius: '10px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
    },
    header: {
        backgroundColor: '#4CAF50',
        padding: '10px',
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    body: {
        padding: '10px',
        flex: '1',
        overflowY: 'auto',
        backgroundColor: '#fff',
    },
    message: {
        padding: '8px',
        margin: '5px 0',
        borderRadius: '5px',
    },
    myMessage: {
        backgroundColor: '#DCF8C6',
        textAlign: 'right',
    },
    otherMessage: {
        backgroundColor: '#F1F0F0',
        textAlign: 'left',
    },
    footer: {
        display: 'flex',
        padding: '10px',
        backgroundColor: '#eee',
        borderTop: '1px solid #ccc',
    },
    input: {
        flex: '1',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginRight: '10px',
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

   return (
        <div style={styles.chatContainer}>
        <div style={styles.header}>
            <h1>Chat here</h1>
        </div>
        <div style={styles.body}>
            {messageList.map((msg, index) => (
                <div
                    key={index}
                    style={{
                        ...styles.message,
                        ...(msg.name === username ? styles.myMessage : styles.otherMessage),
                    }}
                >
                    <strong>{msg.name}</strong>: {msg.message} <em>{msg.time}</em>
                </div>
            ))}
        </div>
        <div style={styles.footer}>
            <input
                type='text'
                placeholder='Message here'
                value={inputValue}
                onChange={handleChange}
                style={styles.input}
            />
            <button onClick={handleClick} style={styles.button}><IoSend /></button>
        </div>
    </div>
   )
}

export default Chat;
