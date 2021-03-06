import { Button, Paper, TextField, Typography } from '@material-ui/core';
import FileBase from 'react-file-base64';
import React, { useEffect, useState } from 'react';
import useStyles from './style';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/postsAction';
import nerd from '../../images/nerd.jpg'

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
      link: ''
    });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
      if(post) setPostData(post);
    }, [post])

  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (currentId === 0) {
        dispatch(createPost({ ...postData, name: user?.result?.name }));
        clear();
      } else {
        dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        clear();
      }
    };

    const clear = () => {
      setCurrentId(0);
      setPostData({
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
        link: ''
      })
    }

    if (!user?.result?.name) {
      return (
        <Paper className={classes.paper}>
          <img src={nerd} style={{width: "10rem", height: 'auto', marginLeft: 'auto', marginRight: 'auto'}}/>
          <Typography variant="h6" align="center">
            Please Sign In to post your own web projects and can like other's.
          </Typography>
        </Paper>
      );
    }

  return (
   <Paper className={classes.paper} elevation={6}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>{currentId ? 'Update' : 'Add'} a Web Project</Typography>
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({base64}) => setPostData({ ...setPostData, selectedFile: base64 }) }  
          />
        </div>
        <TextField 
          name='title'
          variant='outlined' 
          label='title' 
          fullWidth 
          value={postData.title} 
          onChange={(e) => setPostData({ ...postData, title: e.target.value})}/>
        <TextField 
          name='message'
          variant='outlined' 
          label='message' 
          fullWidth 
          value={postData.message} 
          onChange={(e) => setPostData({ ...postData, message: e.target.value})}/>
        <TextField 
          name='link'
          variant='outlined' 
          label='link' 
          fullWidth 
          value={postData.link} 
          onChange={(e) => setPostData({ ...postData, link: e.target.value})}/>
        <TextField 
          name='tags'
          variant='outlined' 
          label='tags' 
          fullWidth 
          value={postData.tags} 
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})}/>
      
        <Button 
          className={classes.buttonSubmit} 
          variant='contained' 
          color='primary' 
          size='large' 
          type='submit' 
          fullWidth>
            {currentId ? 'Update' : 'Add'}
        </Button>
        <Button  
          variant='contained' 
          color='secondary' 
          size='small' 
          onClick={clear} 
          fullWidth>
            clear
        </Button>
      </form>
   </Paper>
  )
}

export default Form