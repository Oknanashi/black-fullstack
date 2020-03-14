import React, { Component } from 'react';
import Movie from "./Movie";
import '../App.css'
import SearchBox from "./search-form";
import TvPopular from './TvPopular'



export default class MoviesList extends Component {


  constructor(props){
    super(props);
    this.state = {
      movies: null,
      setScreen: [],
      shows:[],
      currentMoviePage:this.props.currentMoviePage,
      currentTvPage:this.props.currentTvPage
    };
  }

  async componentDidMount(){
    console.log('MOVIELIST')
      const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=979c677011397c51c03888adfa9b06ac&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.props.currentMoviePage}`);
      const movies = await res.json();
      const tvshowsRes = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=979c677011397c51c03888adfa9b06ac&language=en-US&page=${this.props.currentTvPage}`)
      const shows = await tvshowsRes.json();
      this.setState({
        movies: movies.results,
        shows: shows.results
      })

  }
  getMovies = movies => {
    console.log(typeof movies)
    this.setState({
      movies: movies || this.state.setScreen
    });
  };
  async componentDidUpdate(prevProps){
    if (this.props.currentMoviePage !== prevProps.currentMoviePage) {
      console.log(this.props.currentMoviePage,prevProps.currentMoviePage)
      const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=979c677011397c51c03888adfa9b06ac&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.props.currentMoviePage}`);
      const movies = await res.json();
      this.setState({
        movies: movies.results,
      })
      console.log(this.state.movies)
    } else{
      console.log('hey ooo')
    }
    if (this.props.currentTvPage !== prevProps.currentTvPage) {
      console.log(this.props.currentTvPage,prevProps.currentTvPage)
      const res = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=979c677011397c51c03888adfa9b06ac&language=en-US&page=${this.props.currentTvPage}`);
      const movies = await res.json();
      this.setState({
        shows: movies.results,
      })
      console.log(this.state.movies)
    } else{
      console.log('hey ooo')
    }

  }
  isEmpty=(prop) =>{
    return (
      prop === null
      || prop === undefined
      || (Array.isArray(prop) && prop.lengh === 0)
      || (prop.constructor === Object && Object.keys(prop).length === 0)
    );
  }


  render() {
    let mapMovies = this.state.movies;
    let mapShows = this.state.shows;
    console.log('MovieList Rerenders');

    return (
      <div>
        {this.isEmpty(mapMovies) ? (<div className="lds-dual-ring"></div>) :
          (<div className="main">

              <SearchBox getMovies={ this.getMovies }/>
              <h1>Popular Movies</h1>
              <div className="paging-buttons">
                {this.props.currentMoviePage>1 &&
                <button className="pageMinus" onClick={()=>this.props.goback('movie')}>Prev page</button>
                }
                <button className="pagePlus" onClick={()=>this.props.updatePage('movie')}>Next page</button>
              </div>

              <div className="MovieGrid">
                {mapMovies.map(movie=> <Movie key={movie.id} movie={movie}/>)}
              </div>
              <h1>Popular Tv Shows</h1>
              <div className="paging-buttons">
                {this.props.currentTvPage>1 &&
                <button className="pageMinus" onClick={()=>this.props.goback('tv')}>Prev page</button>
                }
                <button className="pagePlus" onClick={()=>this.props.updatePage('tv')}>Next page</button>
              </div>
              <div className="MovieGrid">

                {mapShows.map(mapShow=>{

                  if(mapShow.vote_count!==0){

                    return <TvPopular key={mapShow.id} mapShow={mapShow}/>
                    console.log(mapShow.vote_count)
                  } else {
                    console.log(`Missing ${mapShow.original_name}`)
                  }
                })}
              </div>
            </div>
        )}
      </div>
    );
  }
}








