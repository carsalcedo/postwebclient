import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import iconweb from '../../images/iconweb.png'
import useStyles from './style'
import {Link, useHistory, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation()

    const logout= () => {
        dispatch({type: 'LOGOUT'})
        history.push('/')
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;
    
        if (token) {
          const decodedToken = decode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    
        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);

    

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
        <div className={classes.brandContainer}>
            <img className={classes.image} src={iconweb} alt='iconweb' height='50' width='50' />
            <Typography component={Link} to='/' className={classes.heading} variant='h3' align='center'>Web Projects</Typography>
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
               <div className={classes.profile}>
                <div style={{display: 'flex'}}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                    {user.result.name.charAt(0)}
                </Avatar>
                <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                </div>
                <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>
                    Logout
                </Button>
               </div> 
            ) : (
                <Button component={Link} to='/auth' variant='contained' color='primary' className={classes.purple}>
                    Sign in
                </Button>
            )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar