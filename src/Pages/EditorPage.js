import react, {useState, useRef, useEffect} from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const EditorPage = () => {

    const [clients, setClients] = useState([]);
    const codeRef = useRef(null);
    const socketRef = useRef(null);
    const location = useLocation();
    const reactNavigator = useNavigate();

    //console.log(params)
    const { roomId } = useParams();

    useEffect(() => {
        const init = async () => {
            try {
                socketRef.current = await initSocket();
                socketRef.current.on('connect_error', (err) => handleErrors(err));
                socketRef.current.on('connect_failed', (err) => handleErrors(err));
    
                function handleErrors(err) {
                    console.log('Socket Error', err);
                    toast.error('Socket connection failed, try again later.');
                    reactNavigator('/');
                }
    
                socketRef.current.emit(ACTIONS.JOIN, {
                    roomId,
                    username: location.state?.username,
                });
    
                socketRef.current.on(
                    ACTIONS.JOINED,
                    ({ clients, username, socketId }) => {
                        if (username !== location.state?.username) {
                            toast.success(`${username} joined the room.`);
                            console.log(`${username} joined`);
                        }
                        setClients(clients);
                        socketRef.current.emit(ACTIONS.SYNC_CODE, {
                            socketId,
                            code: codeRef.current,
                        });
                    }
                );
    
                socketRef.current.on(
                    ACTIONS.DISCONNECTED,
                    ({ socketId, username }) => {
                        toast.success(`${username} left the room.`);
                        setClients((prev) => prev.filter(client => client.socketId !== socketId));
                    }
                );

                console.log(socketRef);
            } catch (error) {
                console.error('Error initializing socket:', error);
                toast.error('Failed to initialize socket.');
                reactNavigator('/');
            }
        };
    
        init();
    
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current.off(ACTIONS.JOINED);
                socketRef.current.off(ACTIONS.DISCONNECTED);
                socketRef.current.off('connect_error');
                socketRef.current.off('connect_failed');
            }
        };
    },[]);

    if(!location.state){
        <Navigate to="/" />
    }

    const handleCopyRoomId = () => {
        navigator.clipboard.writeText(roomId).then(() => {
            toast.success('Room ID copied to clipboard');
        });
    };
    
    const handleLeaveRoom = () => {
        if (socketRef.current) {
            socketRef.current.emit(ACTIONS.LEAVE, { roomId });
        }
        reactNavigator('/');
    };
    

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
                <button className='btn copyBtn' onClick={handleCopyRoomId}>Copy Room ID</button>
                <button className='btn leaveBtn' onClick={handleLeaveRoom}>Leave Room</button>
            </div>
            <div>
                <Editor
                    socketRef={socketRef}
                    roomId={roomId}
                    onCodeChange={(code) => {
                        codeRef.current = code;
                    }}
                />
            </div>
        </div>
    )
}

export default EditorPage