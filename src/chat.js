import React, {useState, useEffect} from 'react'

import {TextField, Button, List, ListItem, ListItemText} from '@material-ui/core'

const API_URL = 'https://info-projekt.firebaseio.com/messages/.json'

const Chat = (props) => {
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState([])

    const sendMessage = () => {
        const newMessageObject = JSON.stringify({
            text: newMessage
        })

    return fetch(
            API_URL,
            {
                method: 'POST',
                body: newMessageObject
            }
        ) 
        .then(() => {
            setMessages('')
            return getMessages()
        })
    }


    const getMessages = () => {
       return fetch(API_URL)
        .then((response) => response.json())
        .then((messagesObject) => {

          const messagesArray = Object.entries(messagesObject).map((entry) => {
            const key = entry[0]
            const value = entry[1]

            return {
                key,
                ...value,
            }

          })

          setMessages(messagesArray)        })
    }

    useEffect(() => {
        getMessages()
    },[])




    return (
        <div>
            <List>
            {
                messages && messages.map((message) => {
                  return  (
                      <ListItem key={message.key}>
                          <ListItemText
                        primary={message.text }
                    />
                    </ListItem>
                  )
                    
                })
            }
            </List>
            <TextField 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button onClick={sendMessage}>
                SEND
            </Button>
        </div>
    )
}

export default Chat