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

import Button from "@material-ui/core/Button"
import MenuItem from '@material-ui/core/MenuItem'
const serverURL = ""

const Review = ({addReview}) => {
 
  const [rating, setSelectedRating] = useState("")

}
export default function Home(){
  const [movies, setMovies ] = React.useState([])
  const [userId, setUserId] = React.useState(1)
  const [review, setReview] = React.useState({userId})

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
  }
  function changeMovie(e){
    const currentRev = review
    currentRev.movie = e.target.value
    setReview(currentRev)
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
  return(
  <div>
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
            value = {"movieChoice"}
            Label = "Movie Choice"
            onChange={changeMovie}
            >
              {
                movies.map((movie) => {
                  return <MenuItem value={movie.id}>{movie.name}</MenuItem>

                })
              }
            </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl noValidate autoComplete = "off">
          <TextField
          label = "Enter Review Title"
          fullWidth
          onChange={changeTitle}
          /> 
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl noValidate autoComplete = "off">
          <TextField
          label = "Enter Review below"
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
          <RadioGroup value ={"rating"} onChange = {(e) => changeRating(e)}>
            <FormControlLabel value = '1' control={<Radio/>} label = '1'/> 
            <FormControlLabel value = '2' control={<Radio/>} label = '2'/> 
            <FormControlLabel value = '3' control={<Radio/>} label = '3'/> 
            <FormControlLabel value = '4' control={<Radio/>} label = '4'/> 
            <FormControlLabel value = '5' control={<Radio/>} label = '5'/> 
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item>
      <Button
        onClick={submit}
      >Submit</Button>
      </Grid>
    </Grid>
  </div>
  )
}