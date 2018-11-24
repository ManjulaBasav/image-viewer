import React, { Component } from 'react';
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
            loginErrorMsg : "dispNone",
            loginSuccess : true
        };
    }
    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }
    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    }

    loginClickHandler = (e) => {
        let username = "upgrad";
        let password = "upgrad";
        if(this.state.username === "" || this.state.password === ""){
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });
        this.setState({ loginErrorMsg: "dispNone" })

        return;
        }
        {
        if((this.state.username === username) && (this.state.password === password)){
            this.setState({loginSuccess: true});
            this.setState({ loginErrorMsg: "dispNone" })
            this.setState({ usernameRequired: "dispNone" })
            this.setState({ passwordRequired: "dispNone" })
            sessionStorage.setItem("access-token","9165329256.bb36ab3.03c5a2fee77f4477ad348f28d132215e");
            this.props.history.push("/home");

        }else{
            this.setState({loginSuccess: false});
            this.setState({ loginErrorMsg: "dispBlock" })
            this.setState({ usernameRequired: "dispNone" })
            this.setState({ passwordRequired: "dispNone" })
            
        }
        
    }
        
    }
    /*https://api.instagram.com/v1/users/self/?access_token=9165329256.bb36ab3.03c5a2fee77f4477ad348f28d132215e*/
    render() {
        return (
            <div>
                        

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
                        <br/> 
                        <FormHelperText className={this.state.loginErrorMsg}>
                                    <span className="red">Incorrect username and/or password</span>
                                </FormHelperText>
                                <br/>
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        
                        </CardContent>
                        </Card>
                        </div>
            </div>
        )
    }
}
export default Login;