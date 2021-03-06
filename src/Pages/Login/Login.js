import React from 'react'
import './Login.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props)

    }
    state = {
        checkedA: true,
        username: "",
        password: "",
        loged: false,
        wrong_input: ""
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    handleChanger(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit = async (e) => {

        let x = await fetch('http://nedabackend.pythonanywhere.com/get_token/', {
            mode: "cors",
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            }
        })

        x = await x.json()

        if (typeof (x.token) == "undefined") {
            this.setState({
                wrong_input: "Your username or password is wrong !!!"
            })
        } else {
            localStorage.setItem('token', x.token)
            localStorage.setItem('kind', x.kind)
            this.setState({
                loged: true
            })

        }
    };


    render() {
        const { loged, wrong_input } = this.state
        if (loged) return <Redirect to={{ pathname: '/Homepage' }} />
        return (

            <div className="login_form">
                <Paper elevation={4} className="login_paper" >
                    <h1 ><center>Login</center></h1>
                    <div className="fields">
                        <TextField onChange={this.handleChanger.bind(this)} value={this.state.username} id="outlined-email-input" fullWidth className="usertext" label="userName" type="email" name="username" autoComplete="email" margin="normal" />
                    </div>
                    <div className="fields">
                        <TextField onChange={this.handleChanger.bind(this)} value={this.state.password} id="outlined-password-input" fullWidth className="passtext" label="password" name='password' type="password" autoComplete="current-password" margin="normal" />
                    </div>
                    <div className="check_box">
                        <Checkbox
                            checked={this.state.checkedA}
                            onChange={this.handleChange('checkedA')}
                            value="checkedA"
                            color="primary"
                        />remember me
                    <p style={{ color: 'red' }}>{wrong_input}</p>
                    </div>
                    <div className='btn-submit'>
                        <Button variant="contained" color="primary" fullWidth onClick={this.handleSubmit}>
                            Log in
                    </Button>
                    </div>
                    <h3 className="forgot_password">forgot your password? </h3>
                    <h5 className="signup">not a member ? <a href="/Signup">sign up now</a> </h5>
                </Paper>
            </div>
        )

    }
}