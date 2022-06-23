import { Avatar, Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import useStyles from './style'
import LockIcon from '@material-ui/icons/Lock';
import Input from './Imput';
//import {GoogleLogin} from 'react-google-login';
//import Icon from './Icon'
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom';
import {signin, signup} from '../../actions/authAction'

const initialState = {
    firstName : '',
    lastName: '',
    password: '',
    confirmPassword: '',
    country: '',
    telephone: '',
    documentT: '',
    document: ''
}

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()


    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(isSignUp){
            dispatch(signup(formData, history))
        }else{
            dispatch(signin(formData, history))
        }
    }

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const switchMode = () =>{
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
    }

  /*  const googleSuccess = async (res) =>{
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: 'AUTH', data: {result, token}}) 
            history.pushState('/')
        } catch (error) {
            console.log(error)
        }
    }
    const googleError = (error) =>{
        console.log(error)
        console.log('unsuccessful. Try again now')
    } */
    

  return (
    <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockIcon/>
            </Avatar>
            <Typography variant='h6'>{isSignUp ? 'Sign up' : 'Sign in'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                {
                    isSignUp && (
                        <>
                            <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                            <Input name='lastName' label='Last Name' handleChange={handleChange} half/>
                            <Input name='country' label='Country' handleChange={handleChange} half/>
                            <Input name='telephone' label='Telephone' handleChange={handleChange} half/>
                            <Box sx={{ minWidth: 100 }}  style={{marginLeft: '15px'}}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" name='documentT'>Tipo</InputLabel>
                                    <Select
                                    name='documentT'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Tipo"
                                    handleChange={handleChange}
                                    onChange={handleChange}
                                    >
                                    <MenuItem value={'v'}>V</MenuItem>
                                    <MenuItem value={'e'}>E</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Input name='document' label='Document Number' handleChange={handleChange} half/>
                        </>
                    )
                }
                <Input name='email' label='Email Address' handleChange={handleChange} type='email'/>
                <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                { isSignUp && <Input name='confirmPassword' label='repeat Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} /> }
                </Grid>
                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                    {isSignUp  ? 'Sign up' : 'Sign in'}
                </Button>

           { /*  <GoogleLogin
                    clientId="446561782196-23g8e031e2npga947hapfvad591d8dvq.apps.googleusercontent.com"
                    render={(renderProps) => (
                    <Button 
                        className={classes.googleButton} 
                        color="primary" 
                        fullWidth onClick={renderProps.onClick} 
                        disabled={renderProps.disabled} 
                        startIcon={<Icon/>} 
                        variant="contained">
                            Google Sign In
                    </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy="single_host_origin"
                    />*/}

                <Grid container justify='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignUp ? 'Already have an account? Sign In' : 'Don´t have an account? Sign up'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth