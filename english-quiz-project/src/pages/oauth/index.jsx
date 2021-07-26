import React, { useState } from 'react';
import ForgotPass from './common/ForgotPass';
import Login from './common/Login';
import Register from './common/Register';
import './style.scss'

const Oauth = () => {

    const [menuSelected, setMenuSelected] = useState("login")


    return (
        <div className="hvx-loginPage">
            <div className="container center h100">
                <div className="hvx-formLogin">
                    <div className="hvx-menuSelect">
                        <div className={`item ${menuSelected === "login" ? "active" : ""}`} onClick={() => setMenuSelected("login")}>
                            Login
                        </div>
                        <div className="breackCol"></div>
                        <div className={`item ${menuSelected === "forgot" ? "active" : ""}`} onClick={() => setMenuSelected("forgot")}>
                            Forgot password
                        </div>
                        <div className="breackCol"></div>
                        <div className={`item ${menuSelected === "register" ? "active" : ""}`} onClick={() => setMenuSelected("register")}>
                            Register
                        </div>
                    </div>
                    <div className="center">
                        {menuSelected === "login" ?
                            <Login />
                            : (
                                menuSelected === "forgot" ?
                                    <ForgotPass />
                                    : <Register />
                            )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Oauth;
