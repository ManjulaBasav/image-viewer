import React, { Component } from 'react';
import Header from '../../common/header/Header';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import './Home.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 1100,
    height: 'auto',
    transform: 'translateZ(0)',
    overflowY: 'auto',

  },
  card: {
    maxWidth: 1000,
    margin: 10,
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  title: {
    fontWeight: 'strong',
    color: 'red',
  },
  actions: {
    display: 'flex',
  },

});

class Home extends Component {
  constructor(props) {
    super(props);
    if (sessionStorage.getItem('access-token') == null) {
      this.props.history.replace('/');
    }
    this.state = {
      allPostedImages: [],
      filterImages: [],
      profile_pic: ""
    }
  }



  async componentWillMount() {
    if(sessionStorage.getItem('access-token') == null)
    {
      return;
    }
    let urlUserInfo = this.props.baseUrl + `?access_token=` + sessionStorage.getItem('access-token');
    const responseUserInfo = await fetch(urlUserInfo);
    const jsonUserInfo = await responseUserInfo.json();
    this.setState({ profile_pic: jsonUserInfo.data.profile_picture });

    let urlImages = this.props.baseUrl + `media/recent?access_token=` + sessionStorage.getItem('access-token');
    const response = await fetch(urlImages);
    const json = await response.json();
    this.setState({ allPostedImages: json.data });

    //set extra data - like 
    this.addExtraDetails();
  }


  addExtraDetails = () => {

    var images = this.state.allPostedImages.slice(0)
    images.forEach(imageDetails => {
      if (imageDetails.user_has_liked === true) {
        imageDetails.likesIcon = <Favorite color="secondary" />;

      } else {
        imageDetails.likesIcon = <FavoriteBorder />;

      }
      imageDetails.commentings = [];

    });
    this.setState({ allPostedImages: images })
    this.setState({ filterImages: images });
  }

  addClickHandler = (id, e) => {
    var images = this.state.filterImages.slice(0)
    for (var i = 0; i < images.length; i++) {
      if (images[i].id === id) {
        images[i].commentings.push(e);
        this.setState({ filterImages: images })

        break;
      }
    }
    

  }
  likesClickHandler = (id) => {
    var images = this.state.filterImages.slice(0)
    for (var i = 0; i < images.length; i++) {
      if (images[i].id === id) {
        if (images[i].user_has_liked === true) {
          images[i].likes.count = images[i].likes.count - 1;
          images[i].likesIcon = <FavoriteBorder />
          images[i].user_has_liked = false;
          this.setState({ userImages: images })
        } else {
          images[i].likes.count = images[i].likes.count + 1;
          images[i].likesIcon = <Favorite color="secondary" />
          images[i].user_has_liked = true;

          this.setState({ userImages: images })
        }
        break;
      }
    }


  }

  logout = () => {
    sessionStorage.clear();
    this.props.history.push('/');
  }

  gotToProfilePage = () =>{
    this.props.history.push('/profile');
 }

 searchText = (value) =>{
   if(value === ""){
    this.setState({
      filterImages : this.state.allPostedImages
    })
   }
   else{
  let filteredInfo = this.state.filterImages;
  filteredInfo = filteredInfo.filter((info) =>{
    if(info.caption !== null){
    let string = info.caption.text.toLowerCase();
    let subString = value.toLowerCase();
    return string.includes(subString);
    }
  })
  this.setState({
    filterImages : filteredInfo
  })
}
}


  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header
          profile_picture={this.state.profile_pic}
          showSearchBox={true}
          showProfilePicture={true}
          searchHandler={this.searchText}
          handleLogout={this.logout}
          gotoProfile={this.gotToProfilePage}
          isProfilePage={false}
        />
        <div className="main-container">
          <GridList cellHeight={'auto'} className={classes.gridList} cols={2}>
            {this.state.filterImages.map(imageDetails => (
              <GridListTile key={imageDetails.id}>
                <Card key={imageDetails.id} className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar className={classes.avatar}>
                        <img src={imageDetails.user.profile_picture} alt={imageDetails.user.username} />
                      </Avatar>
                    }
                    title={imageDetails.user.username}
                    subheader={new Date(imageDetails.created_time * 1000).toLocaleString()}
                  />
                  <CardContent>
                    <img src={imageDetails.images.standard_resolution.url} alt={imageDetails.images.standard_resolution.url}/>
                    <hr />
                    {imageDetails.caption !== null &&
                    <Typography component="p">{imageDetails.caption.text}</Typography>
                    }
                    <Typography>
                      {imageDetails.tags.map((tags, tagIndex) => (
                        <span key={tagIndex} className="tags">#{tags} </span>
                      ))}
                    </Typography>
                    <div onClick={() => this.likesClickHandler(imageDetails.id)}>
                      {imageDetails.likesIcon}
                      {imageDetails.likes.count}   likes
                                        </div>

                    <div></div>
                    {imageDetails.commentings === undefined ? <Typography component="p" >""</Typography> :
                      imageDetails.commentings.map((commet,commentIndex) => (
                        <Typography component="p" key={commentIndex} >
                          <span style={{ fontWeight: 'bold' }}>{imageDetails.user.username}:</span>{commet}
                        </Typography>
                      ))}
                    <div>
                      <FormControl>
                        <InputLabel htmlFor={imageDetails.id}>Add Comment</InputLabel>
                        <Input id={imageDetails.id} defaultValue="" />
                      </FormControl>

                      <FormControl>
                        <Button variant="contained" color="primary" onClick={() => this.addClickHandler(imageDetails.id, document.getElementById(imageDetails.id).value)}>
                          ADD
                                                </Button>
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Home);