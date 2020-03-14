import React, { Component } from 'react';
import Movie from "./Movie";
import '../App.css'
import SearchBox from "./search-form";

export default class Favourites extends Component {

  constructor(props){
    super(props);

  }

  state = {
    movies:[],
    recommends:[]

  };

  async componentDidMount() {
      if(localStorage.getItem('movie')==null ||localStorage.getItem('movie')=='' ){
        this.setState({
          showMovies:false
        })
        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=979c677011397c51c03888adfa9b06ac&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
        const shorted = await res.json();
        this.setState({
          recommends: shorted.results,
        })
        console.log(shorted)
      }
      else {
        let movieArray = JSON.stringify(localStorage.getItem('movie'));
        movieArray = movieArray.split(';');
        movieArray[0] = movieArray[0].slice(1);
        movieArray[movieArray.length-1] = movieArray[movieArray.length-1].slice(0,-1)
        for(let movieID of movieArray){
          try{
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=979c677011397c51c03888adfa9b06ac&language=en-US`);
            const movie = await res.json();
            this.setState({
              showMovies:true,
              movies: [...this.state.movies,movie]
            });


          } catch (e) {
            console.log(e);
          }

        }
      }


  }

  render() {

    let {showMovies,movies,recommends} = this.state;
    let shorted = recommends.slice(0,4)
    return (
      <div>
        {showMovies ? (
        <div className="main col-12">
          <div className="favourites">
            {movies.map(movie=> <Movie key={movie.id} movie={movie}/>)}
          </div>
        </div>
        ) : (
          <div className="main col-12">
            <h1>Favourite something</h1>
            <h3>Here are some suggestions</h3>
            <div className="favourites">

              {shorted.map(movie=> <Movie key={movie.id} movie={movie}/>)}
            </div>
          </div>
        )}
      </div>
    )
  }
}






