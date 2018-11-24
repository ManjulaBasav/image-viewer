import React, { Component } from 'react';
import './Header.css';
import { IconButton } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Search from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';


  
 class Header extends Component {
   constructor(props){
       super(props);
    this.state = { 
        IsLoggedIn : sessionStorage.getItem("access-token") == null ? false : true,
        menuDisplayForHome: "disp-none",
        menuDisplayForProfile : "disp-none"
    }
   }

   onProfileIconClickHandler = () => {
       if(this.props.showSearchBox === true){
    this.setState({ menuDisplayForHome: "disp-block" });
       }
       else if(this.props.isProfilePage === true){
        this.setState({ menuDisplayForProfile: "disp-block" });
 
       }
}

handleLogout = () => {
    this.props.handleLogout();
}

gotoProfile = () => {
    this.props.gotoProfile();
}

searchHandler = (e) => {
    this.props.searchHandler(e.target.value);
}

gotoHome = () => {
    this.props.gotoHome();
}



    render() {
        let iconStyles = {
            padding:0,
          /*  boxShadow: '1 0 0 0.2rem rgba(0,123,255,.5)',*/
          borderRadius: '50%'
        }
        
        return (
            <div>
                <div className="app-header">
                      <div className="header-name">
                     {this.props.isProfilePage &&
                    <span onClick={this.gotoHome} >  Image Viewer  </span>
                     }
                     {!this.props.isProfilePage &&
                     
                     <span  >  Image Viewer  </span>
                     }
                       </div>
                       {this.state.IsLoggedIn && 
                        <div className="right">
                        {this.props.showSearchBox &&
                       <div className="searchField">
                                    <Search className="iconSearch" />
                                <Input id="search" type="text" placeholder="  Search…" disableUnderline={true} onChange={this.searchHandler}></Input>
                                </div>
                        }
                        {this.props.showProfilePicture &&
                        <div className="app-logo">
                       <IconButton  className="MuiIconButton" style={iconStyles} onClick={this.onProfileIconClickHandler} >
                          
                        <img src={this.props.profile_picture}  alt={this.props.profile_picture} className="avatar" />
                       
                    </IconButton> 

                    </div>
                        }
                     
                    <div className={this.state.menuDisplayForHome}>
                                 
                                        <MenuItem key="2" value="My Account" >
                                                <ListItemText primary="My Account" onClick={this.gotoProfile} />
                                            
                                        </MenuItem>
                                        <hr />
                                        <MenuItem key="3" value="Logout">
                                            
                                                <ListItemText primary="Logout" onClick={this.handleLogout} />
                                            
                                        </MenuItem>
                                    </div>

                    <div className={this.state.menuDisplayForProfile}>
                    <MenuItem key="1" value="" >
                                                <ListItemText primary=""  />
                                            
                                        </MenuItem>
                                        <MenuItem key="logout" value="Logout">
                                            
                                                <ListItemText primary="Logout" onClick={this.handleLogout} />
                                            
                                        </MenuItem>
                                    </div>
                   
                    
                </div>
                       }
                
                </div>
            </div>
        )
    }
}
 export default Header; 