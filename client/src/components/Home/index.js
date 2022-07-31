import React, { useState, setCategory } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import "./index.css";
import Select from "@material-ui/core/Select"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import TextField from "@material-ui/core/TextField"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import { Snackbar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import {AppBar} from '@material-ui/core';
import {Container} from '@material-ui/core'
import {Link} from '@material-ui/core'
import history from '../Navigation/history'



const serverURL = "ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3003"

export default function Home(){
  const [movies, setMovies ] = React.useState([])
  const [userId, setUserId] = React.useState(1)
  const [review, setReview] = React.useState({userId})
  const [open, setOpen] = React.useState(false);
  const [movieTitle, setMovieTitle] = React.useState("")


  const onSubmitMessage = "Your review has been recieved. "+ "Movie: '" + movieTitle + "' Review Title: '" +review.title +"' Review: '" +review.review + "' Review Score: '" + review.rating + "'"

  React.useEffect(() => {
    async function getMovies(){
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
  
  async function submit(){
    setOpen(true); 
    const url = serverURL + "/api/addMovie"
          // console.log(review)
        
          const body = JSON.stringify(review)
          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body : body
            
          })

          console.log(res)

          if (res.Status == 200) {
            alert("Submitted successfully")
          }   
   }
  function changeMovie(e){
    const currentRev = review
    currentRev.movie = e.target.value.id
    setReview(currentRev)
    setMovieTitle(e.target.value.name)
    console.log(currentRev)
  }
  function changeRating(e){
    const currentRev = review
    currentRev.rating = e.target.value
    setReview(currentRev)
    console.log(currentRev)
  }
  function changeReview(e){
    const currentRev = review
    currentRev.review = e.target.value
    setReview(currentRev)
    console.log(currentRev)
  }
  function changeTitle(e){
    const currentRev = review
    currentRev.title = e.target.value
    setReview(currentRev)
    console.log(currentRev)
  }


  function handleOpen() {
    setOpen(true)
  }
  
  function handleClose() {
    setOpen(false)
  }

  return(
  <div  style={{ margin: '50px' }}>
    <AppBar position="static">

    <Link
            color = 'inherit'
            style={{cursor:"pointer"}}
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
            color = 'inherit'
            style={{cursor:"pointer"}}
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
        color = 'inherit'
        style={{cursor:"pointer"}}
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
        color = 'inherit'
        style={{cursor:"pointer"}}
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
        <Typography variant = 'h3'>
          Review a movie
        </Typography>
      </Grid>

      <Grid item>
        <FormControl fullWidth>
          <InputLabel> Movie Choices </InputLabel>
          <Select
            value = {review.movie}
            Label = "Movie Choice"
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
        <FormControl noValidate autoComplete = "off">
          <TextField
          value = {review.title}
          label = "Enter Review Title"
          fullWidth
          onChange={changeTitle}
          /> 
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl fullWidth noValidate autoComplete = "off">
          <TextField
          label = "Enter Review below"
          value = {review.review}
          multiLine
          fullWidth
          inputProps = {{ maxLength: 200 }}
          onChange={changeReview}
          /> 
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <FormLabel>Enter your overall rating out of 5</FormLabel>
          <RadioGroup value={review.rating} onChange = {(e) => changeRating(e)}>
            <FormControlLabel value = '1' control={<Radio/>} label = '1'/> 
            <FormControlLabel value = '2' control={<Radio/>} label = '2'/> 
            <FormControlLabel value = '3' control={<Radio/>} label = '3'/> 
            <FormControlLabel value = '4' control={<Radio/>} label = '4'/> 
            <FormControlLabel value = '5' control={<Radio/>} label = '5'/> 
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <Button onClick={submit} open={handleOpen}>Submit</Button>
        <Snackbar       
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message = {onSubmitMessage}
        />
      </Grid>
    </Grid>
  </div>
  )
}