import react, {useState} from 'react';
import {v4 as uuidV4} from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [username, setUserName] = useState('');

    const joinRoom = () => {
        if(!roomId || !username) {
            toast.error('Room ID/UserName is required');
            return;
        }

        // redirect logic
        // second parameter is an object that is used to pass state from one page to other
        navigate(`/editor/${roomId}`, {
            state : {
                username,
            }
        })
    }

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        //console.log(id);

        setRoomId(id);
        toast.success('New Room Created');
    }

    // User clicks 'enter' instead of Join Button
    const handleInputEnter = (e) => {
        // console.log('event', e.code);
        if(e.code === 'Enter'){
            joinRoom();
        }
    }

    return (
        <>
            <div className="homePageWrapper">
                <div className="formWrapper">
                    <img src='/logo.png' alt='logo'/>
                    <h4 className='mainLabel'> Paste Invitation Room ID</h4>
                    <div className="inputGroup">
                        <input 
                            type="text" 
                            className="inputBox" 
                            placeholder="ROOM ID"
                            onChange = {(e) => setRoomId(e.target.value)}
                            value = {roomId}
                            onKeyUp={handleInputEnter}
                        />
                        <input 
                            type="text" 
                            className="inputBox" 
                            placeholder="USERNAME"
                            onChange={(e) => setUserName(e.target.value)}
                            value = {username}
                            onKeyUp={handleInputEnter}
                        />
                        <button onClick = {joinRoom} className="btn joinBtn">JOIN</button>
                        <div className="newRoom">
                            <span className="createInfo">
                                If you don't have an invite then create a &nbsp;
                                <a onClick={createNewRoom} href = "" className='createNewBtn'>new room</a>
                            </span>
                        </div>
                    </div>
                </div>
                <footer>
                    <h4>
                        Built with ❤️ by &nbsp;<a href = "https://github.com/AryanSinghal007">Aryan Singhal</a>
                    </h4>
                </footer>
            </div>
        </>
    )
}

export default Home