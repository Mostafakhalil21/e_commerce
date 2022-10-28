import React from 'react'
import {AppBar , Toolbar , IconButton , Badge , MenuItem , Menu , Typography} from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'  
import logo from '../../assets/jewelry-store.png'
import useStyles from './styles'



const Navbar = ({totalItems}) => {
    const classes = useStyles();
  return (
    <>
        <AppBar position='fixed' className={classes.appBar} color="inherit">
        <Toolbar>
            <Typography variant='h6' className={classes.title} color="inherit">
                <img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
                Cosmatic Amal
                </Typography>
                <div className={classes.grow} />
                <div className={classes.button}>
                    <IconButton aria-label="Show cart item" color="inherit" >
                        <Badge overlap="rectangular" badgeContent={totalItems} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div>  
        </Toolbar>

        </AppBar>
    </>

  )
}

export default Navbar