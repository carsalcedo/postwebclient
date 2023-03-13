import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import {TextField, Button, Typography, Paper} from '@material-ui/core'
import FileBase from 'react-file-base64'
import {useDispatch, useSelector} from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'
import nerd from '../../images/nerd.jpg'
import { useHistory } from 'react-router-dom';


const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        link: '',
        selectedFile: ''
    })
    const post = useSelector((state) => (currentId ? state.posts.posts.find((p) => p._id === currentId) : null));
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();

    {/*useEffect(() => {
        if (post) setPostData(post);
      }, [post]);*/}

      useEffect(() => {
        if (!post?.title) clear();
        if (post) setPostData(post);
      }, [post]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}, history));
        }else{
            dispatch(createPost({...postData, name: user?.result?.name}, history));
        }
        clear()
    }

    const clear = () =>{
        setCurrentId(null);
        setPostData({  title: '', message: '', tags: '', link: '', selectedFile: '' });
    }

    if (!user?.result?.name) {
        return (
          <Paper className={classes.paper}>
            <img src={nerd} style={{width: "10rem", height: 'auto', marginLeft: 'auto', marginRight: 'auto'}}/>
            <Typography variant="h6" align="center">
              Please Sign In to post your own web projects and like other's projects.
            </Typography>
          </Paper>
        );
      }

  return (
    <Paper className={classes.paper} elevation={6}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant='h6'>{currentId ? "Editing" : "Add a Web Project"}</Typography>
           
            <TextField
                name='title' 
                variant='outlined' 
                label='title' 
                fullWidth
                value={postData.title}
                onChange={(e)=> setPostData({...postData, title: e.target.value})}
             />
            <TextField
                name='message' 
                variant='outlined' 
                label='message' 
                fullWidth
                value={postData.message}
                onChange={(e)=> setPostData({...postData, message: e.target.value})}
             />
            <TextField
                name='link' 
                variant='outlined' 
                label='link' 
                fullWidth
                value={postData.link}
                onChange={(e)=> setPostData({...postData, link: e.target.value})}
             />
            <TextField
                name='tags' 
                variant='outlined' 
                label="Tags (coma separated)" 
                fullWidth
                value={postData.tags}
                onChange={(e)=> setPostData({...postData, tags: e.target.value.split(',')})}
             />
               <div className={classes.fileInput}>
                <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
           
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
            {currentId ? "Update" : "Add"}
            </Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
    </Paper>
  )
}

export default Form