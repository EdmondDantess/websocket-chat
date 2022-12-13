import React, {useEffect, useRef, useState} from 'react';
import './App.css';

function App() {

    let messageBlockRef = useRef<null | HTMLDivElement>(null)

    const [message, setMessage] = useState('')
    let [ws, setWs] = useState<WebSocket | null>(null)
    const [messagesWS, setMessagesWS] = useState<any>([])
    if (ws) {
        ws.onmessage = (message) => {
            let messages = JSON.parse(message.data)
            setMessagesWS([...messagesWS, ...messages])
        }
    }

    useEffect(()=>{
        messageBlockRef.current?.scrollIntoView()
    }, [messagesWS])

    useEffect(() => {
        let localWS = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        setWs(localWS)
    }, [])

    function sendMessage() {
        ws && ws.send(message)
        setMessage('')
    }

    return (
        <div className="App">
            <div className={'chat'}>
                <div className={'messages'}>
                    <div className={'message'}>
                        {
                            messagesWS.map((m: any, index: number) => <div className={'message'} ref={messageBlockRef}
                                                                           key={Math.random() + index}>
                                <img src={m.photo}/><b>{m.userName}</b>
                                <span>{m.message}</span></div>)
                        }
                    </div>
                </div>
                <div className={'footer'}>
                    <textarea onChange={e => setMessage(e.currentTarget.value)} value={message}/>
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>);
}

export default App;
