import React, { Component } from 'react';
import Movie from "./Movie";
import '../App.css'
import SearchBox from "./search-form";

export default class WatchList extends Component {

  state = {
    movies:[]
  };

  async componentDidMount() {
    let movieArray = JSON.stringify(localStorage.getItem('watch'));
    movieArray = movieArray.split(';');
    movieArray[0] = movieArray[0].slice(1);
    movieArray[movieArray.length-1] = movieArray[movieArray.length-1].slice(0,-1)
    for(let movieID of movieArray){
      try{
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=979c677011397c51c03888adfa9b06ac&language=en-US`);
        const movie = await res.json();
        this.setState({
          movies: [...this.state.movies,movie]
        });


      } catch (e) {
        console.log(e);
      }

    }

  }

  render() {

    let mapMovies = this.state.movies;
    return (
      <div className="main col-12">
        <div className="favourites">
          {mapMovies.map(movie=> <Movie key={movie.id} movie={movie}/>)}
        </div>
      </div>
    );
  }
}






