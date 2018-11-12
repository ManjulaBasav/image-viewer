import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import './Login.css';

class Login extends Component {
    constructor(){
        super();
        this.state = {

            usernameRequired: "dispNone",
            username: "",
            passwordRequired: "dispNone",
            password: "",
        };
    }
    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }
    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    }
    render() {
        return (
            <div>
                
                <Header />
                <div  >
                    <Card className="content">
                            <CardContent >
                                <FormControl className="login-card-header">
                                    <Typography  component="h5" variant="h5" color="textPrimary">
                                        LOGIN
                                    </Typography>
                                </FormControl>
                                <br/><br/>
                                <FormControl className="formControl" required >
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                                <FormHelperText className={this.state.usernameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>

                        </FormControl>
                        <br/><br/>
                         <FormControl className="formControl" required>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordChangeHandler} />
                            <FormHelperText className={this.state.passwordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                        </FormControl>
                        <br/><br/>
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </CardContent>
                        </Card>
                        </div>
            </div>
        )
    }
}
export default Login;