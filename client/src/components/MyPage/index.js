
import React from 'react';
import Typography from "@material-ui/core/Typography";
import { AppBar } from '@material-ui/core';
import history from '../Navigation/history'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/SnackBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const serverURL = 'ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3003'
export default function MyPage() {
  const [movies, setMovies] = React.useState([])
  const [movie, setMovie] = React.useState({})
  const [movieId,setMovieId]= React.useState(0)
  const [movieTitle, setMovieTitle] = React.useState(0)
  const [movieYear, setMovieYear] = React.useState(0)
  const [guess,setGuess] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [onSubmitMessage, setOnSubmitMessage] = React.useState("");
  
  
  function changeMovie(e) {
    const newMovie = movie;
    setMovieYear(e.target.value.id)
    setMovieTitle(e.target.value.year)
    console.log(e.target.value)
  }
  async function showYear() {
    const url = serverURL + "/api/getMovie?movieId=" + movieId
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },

    })
    console.log(res)
    if (res.status == 200) {
      const body = await res.json()
    }

    console.log("guess " + guess)
    console.log("movie title " + movieTitle)
    console.log(guess == movieTitle)
    if (guess == movieTitle){
      setOnSubmitMessage("Correct!" )
    }
    else{
      setOnSubmitMessage("Incorrect :(")
    }
    setOpen(true)

}

  function handleOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }
   

  function changeGuess(e) {
    setGuess(e.target.value)
  }
 
  
  React.useEffect(() => {
    async function getMovies() {
      console.log('get movies')
      const url = serverURL + "/api/getMovies"
      const res = await fetch(url, {
        method: "POST",
        headers: {

        }
      })
      const body = await res.json()
      console.log(body.express)
      setMovies(body)
    }
    getMovies()
  }, [])

  return (

    <div style={{ margin: '50px' }}>
      <AppBar position="static">

        <Link
          color='inherit'
          style={{ cursor: "pointer" }}
          onClick={() => history.push('/')}>
          <Typography
            variant="h6"
            noWrap
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Home
          </Typography>
        </Link>
        <Link
          color='inherit'
          style={{ cursor: "pointer" }}
          onClick={() => history.push('/reviews')}>
          <Typography
            variant="h6"
            noWrap
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Review
          </Typography>
        </Link>

        <Link
          color='inherit'
          style={{ cursor: "pointer" }}
          onClick={() => history.push('/mypage')}>
          <Typography
            variant="h6"
            noWrap
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MyPage
          </Typography>
        </Link>

        <Link
          color='inherit'
          style={{ cursor: "pointer" }}
          onClick={() => history.push('/search')}>
          <Typography
            variant="h6"
            noWrap
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Search
          </Typography>
        </Link>

      </AppBar>
      <Grid>
        <Grid item xs = {12}>
            <Typography variant = 'h2'>
            Year guesser
            </Typography>
        </Grid>
        <Grid item xs = {12}>
        <Typography variant = 'h3'>
          Try to guess what year the movie you selected was released. 
          The page will then tell you if you were right or not.
        </Typography>
      </Grid>
    </Grid>
      <grid>
       <Grid item>       
        <FormControl noValidate autoComplete = "off">
          <TextField       
        label = "Enter Movie Year"
          fullWidth
          onChange={changeGuess}
          /> 
        </FormControl>
      </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel> Movie Choices </InputLabel>
            <Select

              Label="Movie Choice"
              onChange={changeMovie}
            >
              {
                movies.map((movie) => {
                  return <MenuItem value={movie}>{movie.name}</MenuItem>
                })

              }

            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <Button onClick={showYear} open={handleOpen}>Submit</Button>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={onSubmitMessage}
          />                
        </Grid>
      </grid>
    </div>
  )
}