import react from 'react';

const Home = () => {
    return (
        <>
            <div className="homePageWrapper">
                <div className="formWrapper">
                    <img src='/logo.png' alt='logo'/>
                    <h4 className='mainLabel'> Paste Invitation Room ID</h4>
                    <div className="inputGroup">
                        <input type="text" className="inputBox" placeholder="ROOM ID"/>
                        <input type="text" className="inputBox" placeholder="USERNAME"/>
                        <button className="btn joinBtn">JOIN</button>
                        <div className="newRoom">
                            <span className="createInfo">
                                If you don't have an invite then create a &nbsp;
                                <a href = "" className='createNewBtn'>new room</a>
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