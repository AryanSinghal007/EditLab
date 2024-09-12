import react, {useState} from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';

const EditorPage = () => {

    const [clients, setClients] = useState([
        { socketId : 1, username : 'Yash Gupta' },
        { socketId : 2, username : 'John Doe' },
        { socketId : 2, username : 'Vidit Jain' },
        { socketId : 2, username : 'Dev Sinha' },
    ]);

    return (
        <div className='mainWrap'>
            <div className='aside'>
                <div className='asideInner'>
                    <div className='logo'>
                        <img className='logoImg' src = '/logo.png' alt='logo'/>
                    </div>
                    <h3>Connected</h3>
                    <div className='clientsList'>
                        {
                            clients.map((client) =>
                                (
                                  <Client
                                    key = {client.socketId}
                                    username = {client.username}
                                  />  
                                )
                            )
                        }
                    </div>
                </div>
                <button className='btn copyBtn'>Copy Room ID</button>
                <button className='btn leaveBtn'>Leave Room</button>
            </div>
            <div>
                <Editor/>
            </div>
        </div>
    )
}

export default EditorPage