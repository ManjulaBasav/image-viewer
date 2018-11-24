import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import './Profile.css';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIconFill from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Modal from 'react-modal';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

const customStyles = {
    content: {
         top: '50%',
         left: '50%',
         right: 'auto',
         bottom: 'auto',
         marginRight: '-50%',
         transform: 'translate(-50%, -50%)'
    }
};
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
 
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer'
    },
    avatar: {
		width: '120px',
		height: '120px',
    },
    formControl: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'baseline',
      },
    flexcontainerDiv: {
		display: 'flex',
		justifyContent: 'center',
		borderWidth: '20px',
		borderColor: 'black'
    },
    rightDiv: {
		marginLeft: '12px'
    },
    userDiv: {
		display: 'flex',
		alignItems: 'center',
		margin: '10px'
    },

    
    
});
class Profile extends Component {
    constructor(props) {
        super(props);
        if (sessionStorage.getItem('access-token') == null) {
            this.props.history.replace('/');
          }
        this.state = {
            username:"",
            media:"",
            follows:"",
            followed_by:"",
            full_name:"",
            modalIsOpen : false,
            imageClicked: false,
            user_has_liked : false,
            uploaded_pics_details: [
           
            ],
            uploaded_pics:[
            
            ],
            url: "",
            profile_pic: "",
            hashtags: [],
            caption: "",
            isLiked : false,
            comment:'',
            picId:0,
            likes:0,
            comments:[
                
            ],
            changedFullName: "",
        }
    }
    updateFullNameHandler = () => {
        this.setState({ modalIsOpen: true });
    }
     closeModalHandler = () => {
        this.setState({ modalIsOpen: false ,
            imageClicked: false});
    }
    componentWillMount() {
        if(sessionStorage.getItem('access-token') == null)
        {
          return;
        }
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    profile_pic: JSON.parse(this.responseText).data.profile_picture,
                    username: JSON.parse(this.responseText).data.username,
                    full_name: JSON.parse(this.responseText).data.full_name,
                    media:  JSON.parse(this.responseText).data.counts.media,
                    follows : JSON.parse(this.responseText).data.counts.follows,
                    followed_by : JSON.parse(this.responseText).data.counts.followed_by
                });
             }
        });
        let urlUserInfo = this.props.baseUrl + `?access_token=` + sessionStorage.getItem('access-token');

        xhr.open("GET",  urlUserInfo);
        xhr.send(data); 

        let xhrPic = new XMLHttpRequest();
        xhrPic.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    uploaded_pics: JSON.parse(this.responseText).data,
                    url: JSON.parse(this.responseText).data[0].images.standard_resolution.url,
                    id: JSON.parse(this.responseText).data.id,
                });
            }
        });

        let urlImages = this.props.baseUrl + `media/recent?access_token=` + sessionStorage.getItem('access-token');
        xhrPic.open("GET", urlImages);
        xhrPic.send(data);
    }

    

    postClickHandler = (pic, index) => {
        var pics = this.state.uploaded_pics[index];
        var captionReceived = "";
        captionReceived= pics.caption;
        if(captionReceived == null){
        }else{
        captionReceived= pics.caption.text;
            
        var captionText = captionReceived.substring(0, captionReceived.indexOf("#"));
        }
        this.setState({
            clickedPic: pics,
            imageClicked: true,
            url: pics.images.standard_resolution.url,
            hashtags: pics.tags,
            caption: captionText,
            likes: pic.likes.count,
            picId: pic.id,
            isLiked:pic.user_has_liked

        });
        this.setState({comments:[]});
        var found =false;
        {this.state.uploaded_pics_details.map((rowdataold,i) => { 
           if(rowdataold.id === pic.id){
               const commmentings = this.state.uploaded_pics_details[i].comments;
               const isLikedByUser = this.state.uploaded_pics_details[i].isLiked;
               const likesCount = this.state.uploaded_pics_details[i].likes;

                found = true;
               this.setState({isLiked:isLikedByUser});
               this.setState({comments:commmentings});
               this.setState({likes:likesCount});
           }
        
        })
    }
        if(!found){
            const chnagedDetailsArray  = this.state.uploaded_pics_details.slice();
            var obj = {id:pic.id,likes:pic.likes.count, comments:[],isLiked:pic.user_has_liked}
            //chnagedDetailsArray.push({id:id,likes:0,comments: .push(this.state.comment)} );
            chnagedDetailsArray.push(obj);
            this.setState({
                //  comments: this.state.comments.concat(this.state.comment)
                uploaded_pics_details: chnagedDetailsArray
                })
        }
    
        
    }

    onLikeClicked = (e,id) => {
        
        var isLikedByUser = !(this.state.isLiked);
        if(isLikedByUser){
            this.state.likes++;
            this.state.isLiked=true;
        }else{
            this.state.likes--;
            this.state.isLiked=false;

        }
        const chnagedDetailsArray  = this.state.uploaded_pics_details.slice();

        {this.state.uploaded_pics_details.map((rowdataoldClicked,ind) => { 


           if(rowdataoldClicked.id === this.state.picId){
            
            chnagedDetailsArray[ind].likes = this.state.likes ;
            chnagedDetailsArray[ind].isLiked =  this.state.isLiked ;
           }
        })
       

    }
    this.setState({
        //  comments: this.state.comments.concat(this.state.comment)
        uploaded_pics_details: chnagedDetailsArray
        });
        this.setState({
            isLiked:this.state.isLiked,
            likes: this.state.likes
          });
    }

    commentChangeHandler = (e) => {
        this.setState({
          comment:e.target.value,
        });
    
       // this.props.commentChangeHandler(e);
      }


      onAddCommentClicked = (e,id) => {
        if (this.state.comment === "" || typeof this.state.comment === undefined) {
          return;
        }
       // const chnagedDetailsArray  = [...this.state.uploaded_pics_details];
       const chnagedDetailsArray  = this.state.uploaded_pics_details.slice();
        this.state.comments.push(this.state.comment);
        this.setState({comments:this.state.comments});
      //  var details = this.state.uploaded_pics_details[id];
        var found = false;
        
          {this.state.uploaded_pics_details.map((rowdataold,i) => { 

           if(rowdataold.id === this.state.picId){
               const details = chnagedDetailsArray[i];
               const commentsOld = details.comments.splice();
               commentsOld.concat(""+this.state.comment);
               details.comments = commentsOld;
               
               {chnagedDetailsArray[i].comments = this.state.comments} ;
               found = true;
           }
        })
    }

        if(!found){
            var obj = {id:""+this.state.picId,likes:""+10, comments: this.state.comments,isLiked:false}
            chnagedDetailsArray.push(obj);
        }
       
        
       
      //  details.comments.concat(this.state.comment);
        this.setState({
          //  comments: this.state.comments.concat(this.state.comment)
          uploaded_pics_details: chnagedDetailsArray
          })
       // console.log(this.state.comments.length);

      }

      changeFullNameHandler = (e) => {
        this.setState({changedFullName : e.target.value});
          }

    


    updateClickHandler = (e) =>  {
        if(this.state.changedFullName !== "") {
            this.setState({full_name : this.state.changedFullName});
        }
        this.setState({ modalIsOpen : false }) ;        
    }
     
    gotToHomePage  = () =>{
        this.props.history.push('/home');
     }
    
     logout = () => {
        sessionStorage.clear();
        this.props.history.push('/');
      }
    render(){
        
        const { classes } = this.props;
       
        return(

            <div>

                 
           <Header 
           profile_picture={ this.state.profile_pic}
           showSearchBox={false}
           showProfilePicture={true}
            isProfilePage={true}
          handleLogout={this.logout}
          gotoHome={this.gotToHomePage}
            
           
           />
            <div className="information-section">
            <div className="left">
                    <Avatar className={classes.avatar} src={this.state.profile_pic} alt="profile"/>   
                    </div>           
                    
            
            <div className="middle">
            <div className="fontBld">
                            <Typography  variant="headline" component="h3"><span className="fontBld">{ this.state.username} </span></Typography>
                        </div>
                        <br/>
                      <div>
                            <Typography><span className="bold">Posts:  { this.state.media} </span>  <span className="bold">Follows:  { this.state.follows}   </span> <span className="bold">Followed By:  { this.state.followed_by}  </span> </Typography>
                        </div>
                        <br/>

                        <div>
                        <Typography><span className="fullname" variant="headline" component="h5">{ this.state.full_name}</span>
                        <Button onClick={() => this.updateFullNameHandler()} variant="fab" color="secondary" arial-label="Edit" >
                 <Icon><img src="https://www.materialui.co/materialIcons/image/edit_white_24x24.png" alt={""}></img></Icon>
                     </Button>
                        </Typography>
                        </div>
                       
            </div>
            <div className="right">
           
            </div>
            </div>

               <div className="all-posts">
                        <GridList cellHeight={380}  cols={4} className={classes.gridListMain}>
                        {this.state.uploaded_pics.map((post, index) => (
                                <GridListTile onClick={() => this.postClickHandler(post,index)} className="post-grid-item" key={ post.id}>
                                 <img src={post.images.standard_resolution.url} className="post-poster" alt={post.url} />
                                   
                                </GridListTile>
                            ))}
                        </GridList>
                            </div> 
               <div className="postModal">
                <Modal style={customStyles} isOpen={this.state.modalIsOpen} contentLabel="Edit" ariaHideApp={false} onRequestClose={this.closeModalHandler}>
            <Typography variant='h4' align='left' gutterBottom>
                Edit
            </Typography>
            <FormControl required>
                <InputLabel htmlFor="fullname"> Full Name </InputLabel>
                <Input type="text" id="fullname"  
                              onChange= {this.changeFullNameHandler}  ></Input>        
            </FormControl>
            <br /><br />
            <Button variant="contained" color="primary" onClick={this.updateClickHandler}>UPDATE</Button>                             
        </Modal>
        
                <Modal isOpen={this.state.imageClicked} ariaHideApp={false} onRequestClose={this.closeModalHandler}>
                <div className={classes.flexcontainerDiv}>
                            <div>
                                <img src={this.state.url} alt="pic" />
                            </div>

                            <div className={classes.rightDiv}>
                                <div className={classes.userDiv}>
                                    <Avatar src={this.state.profile_pic} />
                                    <Typography style={{ marginLeft: '10px' }}>{this.state.username}</Typography>
                                </div>
                                <Divider />
                                <Typography variant="subtitle1">
                                    {this.state.caption}
                                </Typography>
                                <div className="tags">
                                    {this.state.hashtags.map((tag, tagIndex) => (
                                        <Typography key={tagIndex} style={{ color: '#29B6F6' }}>
                                            #{tag} &nbsp;
                            </Typography>
                                    ))}

                                   

                   {this.state.comments.map((comment,commentIndex) => (
                        <Typography component="p" key={commentIndex}>
                        <span style={{ fontWeight: 'bold' }}>{this.state.username}:</span>{comment}
                      </Typography>
                  ))}
                    <IconButton aria-label="Add to favorites" onClick={this.onLikeClicked.bind(this,this.state.picId)}>
                {this.state.isLiked && <FavoriteIconFill style={{color:'#F44336'}} />}
                {!this.state.isLiked && <FavoriteIconBorder />}
              </IconButton>
              <Typography component="p">
                {this.state.likes} Likes              </Typography>
                                </div>
                                <div className={classes.formControl}>
              <FormControl style={{flexGrow:1}}>
                <InputLabel htmlFor="comment">Add Comment</InputLabel>
                <Input id="comment"  defaultValue="" onChange={this.commentChangeHandler}/>
              </FormControl>
              <FormControl>
                <Button onClick={this.onAddCommentClicked.bind(this,this.state.picId)}
                   variant="contained" color="primary">
                  ADD
                </Button>
              </FormControl>
            </div>
                                </div>
                                </div>
                                </Modal>

                                </div>
            </div>
        )
    }
}
export default withStyles(styles)(Profile);