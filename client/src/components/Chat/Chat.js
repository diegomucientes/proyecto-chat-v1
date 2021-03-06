import React,{useState,useEffect}from 'react';
import queryString from 'query-string';
import '../Chat/Chat.css';
import io from 'socket.io-client';
import { set } from 'mongoose';



import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

let socket;


const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);


    const ENDPOINT = 'localhost:5000';

    useEffect(()=>{
        const {name,room}=queryString.parse(location.search);
        socket = io (ENDPOINT);
        setName(name);
        setRoom(room);
        socket.emit('join',{name,room},()=>{
           
        });
        return ()=>{
            socket.emit('disconnect');
            socket.off();
            
        }


    },[ENDPOINT,location.search]);

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message]);
        })
    },[messages])

    const sendMessage = (event)=>{
        event.preventDefault();
        if(message){
            socket.emit('sendMesssage',message,()=>setMessage(''));
        }
    }



    return (
        <div className="outerContainer">
            <div className="container">
                <input value={message} 
                onChange={(event)=>setMessage(event.target.value)}
                onKeyPress={event=>event.key==="Enter"? sendMessage(event):null}/>

            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />

            
            
            
            </div>
        </div>
    );
}

export default Chat;
