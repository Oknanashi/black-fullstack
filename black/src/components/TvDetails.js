import React, { Component } from 'react';
import '../App.css';
import TvPopular from "./TvPopular"
import Movie from './Movie'
const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280';

export default class TvDetails extends Component {

  state = {
    show: {},
    inFavourites: false,
    recommendations:{},
    currentTv:this.props.match.url

  };

  async componentDidMount(){
    console.log(this.props.match.url)
    try{
      const res = await fetch(`https://api.themoviedb.org/3${this.props.match.url}?api_key=979c677011397c51c03888adfa9b06ac&language=en-US`);
      const videos = await fetch(`https://api.themoviedb.org/3${this.props.match.url}/videos?api_key=979c677011397c51c03888adfa9b06ac&language=en-US`);
      const recommends = await fetch(`https://api.themoviedb.org/3${this.props.match.url}/recommendations?api_key=979c677011397c51c03888adfa9b06ac&language=en-US&page=1`);
      const recommendsRes = await recommends.json();
      const show = await res.json();
      const videosRes = await videos.json();
      this.setState({
        show,
        genres:show.genres,
        videos:videosRes,
        recommendations:recommendsRes
      })

    } catch (e) {
      console.log(e);
    }
    if(localStorage.getItem('tv')!==null){
      if(localStorage.getItem('tv').includes(this.props.match.params.id)){
        this.setState({
          inFavourites:true
        })
      }
    }
    this.props.setPage(this.state.currentTv,'tv')
  }
  addToFavourites = () =>{
    this.setState({
      inFavourites:true
    })
    let oldArray = localStorage.getItem('tv');
    let newArray;
    if(oldArray == null ){
      oldArray = ''
    }


    if(oldArray.includes(`${this.props.match.params.id}`)){

    } else {

      if(oldArray == ''){

        newArray = this.props.match.params.id
        localStorage.setItem('tv', newArray)
      } else {
        newArray = oldArray +';'+ this.props.match.params.id;
        localStorage.setItem('tv', newArray)
      }

    }



  };
  deleteFromFavourites = (e) =>{
    e.preventDefault()
    this.setState({
      inFavourites:false
    })
    let oldArray = localStorage.getItem('tv');
    const movieID = this.props.match.params.id;

    let newArray = this.getNewArray(movieID,oldArray);
    if(newArray==undefined){
      newArray=''
    }
    localStorage.setItem('tv',newArray)
  };

  getNewArray = (movieID,oldArray) => {

    if(oldArray.slice(0)!==';' && oldArray.slice(7)!==';'){

      if(oldArray.slice(0,6)==movieID && oldArray.slice(6,7)==';'){
        console.log('delete first one')
        return oldArray.replace(`${movieID};`,'')
      } else if(oldArray.slice(-6)==movieID && oldArray.slice(-7,-6)==';'){
        console.log('Last one')
        return oldArray.replace(`;${movieID}`,'')
      } else if(oldArray.includes(`;${movieID};`)){
        console.log('middle one')
        return oldArray.replace(`;${movieID}`,'')
      }

      console.log('deletes the only one');
      return ''
    }
  };
  updatePage = (id) =>{
      this.setState({
        currentTv:`/tv/${id}`
      })
  }
  async componentDidUpdate(prevProps){
    console.log(this.props.match.url,prevProps.match.url)
    if (this.props.match.url !== prevProps.match.url) {
      console.log(this.props.currentPage,prevProps.currentPage)
      const res = await fetch(`https://api.themoviedb.org/3${this.props.match.url}?api_key=979c677011397c51c03888adfa9b06ac&language=en-US`);
      const videos = await fetch(`https://api.themoviedb.org/3${this.props.match.url}/videos?api_key=979c677011397c51c03888adfa9b06ac&language=en-US`);
      const recommends = await fetch(`https://api.themoviedb.org/3${this.props.match.url}/recommendations?api_key=979c677011397c51c03888adfa9b06ac&language=en-US&page=1`);
      const recommendsRes = await recommends.json();
      const show = await res.json();
      const videosRes = await videos.json();
      this.setState({
        show,
        genres:show.genres,
        videos:videosRes,
        recommendations:recommendsRes
      })
      console.log(this.state.movies)
    } else{
      console.log('hey ooo')
    }

  }


  render() {
    const {show,genres,videos,recommendations} = this.state;
    const backgroundB = `url(${BACKDROP_PATH}${show.poster_path})`;
    console.log(this.props)

    if(show!==null){
      const genresList =[]
      const companyList =[]
      let getTrailers = []
      let recommendsList =[]
      if(Array.isArray(show.genres)==true){
        show.genres.map((a)=>genresList.push(a.name))
        show.production_companies.map((a)=>companyList.push(a.name))
        videos.results.map((trailer) => {
          if (trailer.type == 'Trailer') {
            getTrailers.push(trailer)
          }
        })
        recommendsList = recommendations.results.slice(0,4)
      }

      return (
        <div className="Details col-12" >
          <div className="posterHeader" style={{
            backgroundImage: backgroundB,
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover',
            backgroundPosition:'30% 8%'}}>

          </div>
          <div className="moviePart">
            <div className="moviePoster">
              <img className="Poster col-2" src={`${POSTER_PATH}${show.poster_path}`} alt={show.title}/>
              <button onClick={()=>{this.addToFavourites();this.props.fakesetState()}} >Add to favourites</button>
              {
                this.state.inFavourites &&
                <button onClick={this.deleteFromFavourites}>Delete from favourites</button>

              }
              <div className="recommendations">
                {recommendsList.map(mapShow=><TvPopular key={mapShow.id} updatePage={this.updatePage} mapShow={mapShow}/>)}
              </div>
            </div>
            <div className="movieInfo">
              <h1 className="text">{show.original_name}</h1>
              <h3>    Rating: {show.vote_average}/10<sub className="subText">({show.vote_count} votes)</sub></h3>
              <h4 className="text">Genres : {genresList.join(', ')}</h4>
              <h4 className="text">First air date : {show.first_air_date}</h4>
              <h4 className="text">Number of Seasons : {show.number_of_seasons}</h4>
              <h4 className="text">Number of Episodes : {show.number_of_episodes}</h4>
              <h4 className="text">Production Companies : {companyList.join(', ')}</h4>
              <div className="text row movieInfo">
                <h3 className="col-10 text">{show.overview}</h3>
              </div>
              <h2 >Trailers : </h2>
              {getTrailers.map(trailer=><iframe id="ytplayer" type="text/html" width="640" height="300px" src={`https://www.youtube.com/embed/${trailer.key}`}/>)}

            </div>
          </div>
        </div>
      );
    }
  }
}





