import react, {useState, useRef, useEffect} from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const EditorPage = () => {

    const [clients, setClients] = useState([]);

    const socketRef = useRef(null);
    const location = useLocation();
    const reactNavigator = useNavigate();

    //console.log(params)
    const { roomId } = useParams();

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(err) {
                console.log('Socker Error', err);
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });

            // Listening for joined event
            socketRef.current.on(
                ACTIONS.JOINED,
                ({clients, username, socketId}) => {
                    if(username !== location.state.username){
                        toast.success(`${username} joined the room.`);
                        console.log(`${username} joined`);
                    }

                    setClients(clients);

                }
            );
        };
        init();
    }, []);

    if(!location.state){
        <Navigate to="/" />
    }


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