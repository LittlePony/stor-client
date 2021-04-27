import React from "react";
import {APIURL} from "../config";
import styles from "./Login.module.css";

const initialState ={
    username: "",
    password: "",
}

class Login extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleInputChange = e => this.setState({[e.target.name]: e.target.value});

    handleLogin = () => {
        const fetchParams = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        };
        fetch(`${APIURL}/auth/token/obtain/`, fetchParams)
            .then(response => response.json())
            .then(token => this.props.onTokenUpdate(token.access))
            .catch(err => console.error(err))
    };

    render() {
        return (
            <div className={styles.box}>
                <label htmlFor="username">username</label>
                <input
                    onChange={this.handleInputChange}
                    value={this.state.username}
                    id="username"
                    name="username"/>
                <br/>
                <label htmlFor="password">password</label>
                <input
                    onChange={this.handleInputChange}
                    value={this.state.password}
                    id="password"
                    name="password"/>
                <br/>
                <button onClick={this.handleLogin}>
                    Войти
                </button>
            </div>
        )
    }
}

export default Login;
