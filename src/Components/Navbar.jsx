import { AppBar, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  navBar: {
    background: '#448aff'
  }
})
function Navbar() {
  
  const classes = useStyles()
    return (
        <AppBar position="sticky">
        <Toolbar className={classes.navBar}>
          <Typography variant="h6" color="inherit" noWrap
          sx={{margin: 'auto'}}>
            Weather App
          </Typography>
        </Toolbar>
      </AppBar>
    )
}

export default Navbar
