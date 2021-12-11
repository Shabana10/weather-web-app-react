import './App.css';
import { Button, TextField, Card, CardContent, Typography, Container, Grid, Box } from '@mui/material'
import { makeStyles } from '@mui/styles';
import Navbar from './Components/Navbar';
import axios from 'axios'
import { useEffect, useState } from 'react';


const useStyles = makeStyles({
  day: {
    background: 'linear-gradient(to right, #1c92d2, #f2fcfe)',
    textAlign: 'center',
    minHeight: '100vh'
  }
});

function App() {
  const classes = useStyles();
  const [city, setCity] = useState(null)
  const [search, setSearch] = useState('Karachi')

  const getData = async () => {
    await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=70eefff73d1dfcf0e9ca4bfb45c3c9d2`)
      .then((response) => {
        setCity(response.data)
        console.log(city);
      }).catch((err) => console.log(err))

  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className={classes.day}>

      <Navbar />
      <main>
        {/* First unit */}
        <Box
          sx={{
            bgcolor: 'transparent',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
              <div sx={{ m: 2 }}>
                <TextField label="Enter city name" variant="filled"
                  sx={{ color: '#448aff' }} onChange={(e) => setSearch(e.target.value)} />
                <Button variant='filled' sx={{p:2}} onClick={getData}>Search</Button>
              </div>
          </Container>
        </Box>
        <Container maxWidth='md'>
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <h1>Live Weather App</h1>
              {!city ? 'Loading' :
                <Card
                  sx={{
                    width: '90%', display: 'flex',
                    flexDirection: 'column', bgcolor: 'transparent', margin: 'auto'
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h4"
                      component="h2" sx={{ color: 'yellow', fontWeight: 700 }}>
                      {parseFloat(city.main.temp - 273.15).toFixed(1)}<sup>o</sup>
                    </Typography>
                    <Typography gutterBottom sx={{ width: '100%', height: '100px' }}>
                      <img
                        src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                        alt="imgIcon" className="weatherIcon" />

                    </Typography>
                    <Typography variant='h6' gutterBottom sx={{ fontWeight: 700 }}>
                      <i className="fas fa-street-view fa-2x logoIcon"></i>
                      {city.name} || {city.sys.country}
                    </Typography>
                    <Typography variant='h6' gutterBottom>
                      temp_min: {parseFloat(city.main.temp_min - 273.15).toFixed(1)}<sup>o</sup> ||
                      temp_max: {parseFloat(city.main.temp_max - 273.15).toFixed(1)}<sup>o</sup> ||
                      hymidity: {city.main.humidity}%                                </Typography>
                  </CardContent>
                </Card>
              }
            </Grid>
          </Grid>
        </Container>
      </main>

    </div >
  );
}

export default App;
