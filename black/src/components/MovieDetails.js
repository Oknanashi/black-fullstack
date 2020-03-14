import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import '../App.css';
import Movie from './Movie'
import CommentSection from  './CommentSection'
import axios from 'axios'


const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280';



export class MoviesDetails extends Component {
  state = {
    movie: {},
    currentMovie:false,
    inFavourites: false,
    inWatchList:false,
    recommendations:false,
    fakeData:null,
    comments:[],
    fakeState:false
  };

  async componentDidMount(){

    try{
      const res = await fetch(`https://api.themoviedb.org/3${this.props.match.url}?api_key=979c677011397c51c03888adfa9b06ac&language=en-US`);
      const videos = await fetch(`https://api.themoviedb.org/3${this.props.match.url}/videos?api_key=979c677011397c51c03888adfa9b06ac`);
      const recommends = await fetch(`https://api.themoviedb.org/3${this.props.match.url}/recommendations?api_key=979c677011397c51c03888adfa9b06ac&language=en-US&page=1`);
      const movie = await res.json();
      const videosRes = await videos.json();
      const recommendsRes = await recommends.json();
      this.setState({
        movie,
        genres:movie.genres,
        videos:videosRes,
        recommendations:recommendsRes
      })
    } catch (e) {
      console.log(e);
    }
    this.props.setPage(this.props.match.url,'movie')
    if(localStorage.getItem('movie')!==null){
      if(localStorage.getItem('movie').includes(this.props.match.params.id)){
        this.setState({
          inFavourites:true
        })
      }
    }
    if(localStorage.getItem('watch')!==null){
      if(localStorage.getItem('watch').includes(this.props.match.params.id)){
        this.setState({
          inWatchList:true
        })
      }
    }
    setTimeout(() => {
      this.setState({fakeData: "I am the app header"})
    }, 1500)
     await axios.get(`https://black-fullstack.herokuapp.com/api/comments${this.props.match.url}`)
      .then(res=>{
        this.setState({comments:res.data.movie})
        console.log(this.state.comments)
      })
  }
  addToFavourites = () =>{
    this.setState({
      inFavourites:true
    })
    let oldArray = localStorage.getItem('movie');
    let newArray;
    if(oldArray === null ){
      oldArray = ''
    }
    if(oldArray.includes(`${this.props.match.params.id}`)){
    } else {
      if(oldArray === ''){
        newArray = this.props.match.params.id
        localStorage.setItem('movie', newArray)
      } else {
        newArray = oldArray +';'+ this.props.match.params.id;
        localStorage.setItem('movie', newArray)
      }
    }
  };
  deleteFromFavourites = (e) =>{
    e.preventDefault()
    this.setState({
      inFavourites:false
    })
    let oldArray = localStorage.getItem('movie');
    const movieID = this.props.match.params.id;

    let newArray = this.getNewArray(movieID,oldArray);
    if(newArray===undefined){
      newArray=''
    }
    localStorage.setItem('movie',newArray)
  };

  getNewArray = (movieID,oldArray) => {
    if(oldArray.slice(0)!==';' && oldArray.slice(7)!==';'){
      if(oldArray.slice(0,6)===movieID && oldArray.slice(6,7)===';'){
        console.log('delete first one')
        return oldArray.replace(`${movieID};`,'')
      } else if(oldArray.slice(-6)===movieID && oldArray.slice(-7,-6)===';'){
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
  addToWatchList = () =>{
    this.setState({
      inWatchList:true
    })
    let oldArray = localStorage.getItem('watch');
    let newArray;
    if(oldArray === null ){
      oldArray = ''
    }


    if(oldArray.includes(`${this.props.match.params.id}`)){

    } else {
      if(oldArray === ''){

        newArray = this.props.match.params.id
        localStorage.setItem('watch', newArray)
      } else {
        newArray = oldArray +';'+ this.props.match.params.id;
        localStorage.setItem('watch', newArray)
      }

    }
  };
  deleteFromWatchList = (e) =>{
    e.preventDefault()
    this.setState({
      inWatchList:false
    })
    let oldArray = localStorage.getItem('watch');
    const movieID = this.props.match.params.id;

    let newArray = this.getWatchList(movieID,oldArray);
    if(newArray===undefined){
      newArray=''
    }
    localStorage.setItem('watch',newArray)
  };

  getWatchList = (movieID,oldArray) => {
    if(oldArray.slice(0)!==';' && oldArray.slice(7)!==';'){
      if(oldArray.slice(0,6)===movieID && oldArray.slice(6,7)===';'){
        console.log('delete first one')
        return oldArray.replace(`${movieID};`,'')
      } else if(oldArray.slice(-6)===movieID && oldArray.slice(-7,-6)===';'){
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
      currentTv:`/movie/${id}`
    })
  }
  async componentDidUpdate(prevProps,prevState){
    if (this.props.match.url !== prevProps.match.url) {
      const res = await fetch(`https://api.themoviedb.org/3${this.props.match.url}?api_key=979c677011397c51c03888adfa9b06ac&language=en-US`);
      const videos = await fetch(`https://api.themoviedb.org/3${this.props.match.url}/videos?api_key=979c677011397c51c03888adfa9b06ac`);
      const recommends = await fetch(`https://api.themoviedb.org/3${this.props.match.url}/recommendations?api_key=979c677011397c51c03888adfa9b06ac&language=en-US&page=1`);
      const movie = await res.json();
      const videosRes = await videos.json();
      const recommendsRes = await recommends.json();
      this.setState({
        movie,
        genres:movie.genres,
        videos:videosRes,
        recommendations:recommendsRes
      })
      axios.get(`https://black-fullstack.herokuapp.com/api/comments${this.props.match.url}`)
        .then(res=>{
          this.setState({comments:res.data.movie})
          console.log(res.data.movie)
        })

    }

  }
  newComments = () =>{
     axios.get(`https://black-fullstack.herokuapp.com/api/comments${this.props.match.url}`)
      .then(res=>{
        this.setState({comments:res.data.movie})
        console.log(res.data.movie)
      })
  }

  render() {

      return (
        <MovieShow
                    addToFavourites={this.addToFavourites}
                   fakesetState={this.props.fakesetState}
                   deleteFromFavourites={this.deleteFromFavourites}
                   deleteFromWatchList={this.deleteFromWatchList}
                   inFavourites={this.state.inFavourites}
                   inWatchList={this.state.inWatchList}
                   fakeData={this.state.fakeData}
                   movie={this.state.movie}
                   genres={this.state.genres}
                   videos ={this.state.videos}
                   recommendations={this.state.recommendations}
        addToWatchList={this.addToWatchList}
                    comments={this.state.comments}
                    user={this.props.user}
                    url={this.props.match.url}
                    newComments={this.newComments}
                    updatePage={this.updatePage}>
        </MovieShow>
      )
    }

}


export class MovieShow extends Component{
  state={
    text:'',
    errors:false
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.comments)
    this.setState({comments:nextProps.comments})
  }
    isEmpty=(prop) =>{
      return (
        prop === null
        || prop === undefined
        || (Array.isArray(prop) && prop.lengh === 0)
        || (prop.constructor === Object && Object.keys(prop).length === 0)
      );
    }
    onSubmit=(e)=>{
      e.preventDefault()
      console.log(this.props.user)
      const sendPost = {name:this.props.user.name, text : this.state.text,movie:this.props.videos.id}
      axios.post(`https://black-fullstack.herokuapp.com/api/comments${this.props.url}`,sendPost)
        .then(res=>{
            console.log(res)
            this.props.newComments()
          }
        )
        .catch(err=>this.setState({errors:err.response.data.response}))
     this.state.text = ''
      this.props.newComments()

    }
  onChange = (e) =>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }

    render(){

      let {movie,genres,videos,recommendations,fakeData,inFavourites,inWatchList} =this.props;
    if(movie!==null){

      const genresList =[]
      const companyList =[]
      let recommendsList = []
      let getTrailers =[]
      const backgroundB = `url(${BACKDROP_PATH}${movie.poster_path})`
      if(Array.isArray(movie.genres)===true) {
        movie.genres.map((a) => genresList.push(a.name))
        movie.production_companies.map((a) => companyList.push(a.name))
        videos.results.map((trailer) => {
          if (trailer.type === 'Trailer') {
            getTrailers.push(trailer)
          }
        })
        recommendsList = recommendations.results.slice(0,4)
      }

  console.log(this.state.errors)

    return (
      <div>
        {this.isEmpty(movie) ? (<div className="lds-dual-ring"></div>
        ) : (
          <div className="Details col-12">
            <div className="posterHeader" style={{
              backgroundImage: backgroundB,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: '30% 8%'
            }}>

            </div>
            <div className="moviePart">
              <div className="moviePoster">
                <img className="Poster col-2" src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title}/>

                {
                  inFavourites ? (<button onClick={this.props.deleteFromFavourites}>Delete from favourites</button>) :
                    (<button onClick={() => {
                      this.props.addToFavourites();
                      this.props.fakesetState('fav')
                    }}>Add to favourites
                    </button>)

                }
                {
                  inWatchList ? (<button onClick={this.props.deleteFromWatchList}>Delete from WatchList</button>) :
                    (<button onClick={() => {
                      this.props.addToWatchList();
                      this.props.fakesetState('watch')
                    }}>Add to WatchList
                    </button>)

                }
                <h4>Recommendations</h4>
                <div className="recommendations">
                  {recommendsList.map(movie => <Movie key={movie.id} updatePage={this.props.updatePage} movie={movie}/>)}
                </div>
              </div>
              <div className="movieInfo">
                <h1 className="text">{movie.title}</h1>
                <h4 className="text">Release Date : {movie.release_date}</h4>
                <h4 className="text">Revenue : {movie.revenue} $</h4>
                <h4 className="text">Genres : {genresList.join(', ')}</h4>
                <h4 className="text">Production Companies : {companyList.join(', ')}</h4>
                <div className="text row movieInfo">
                  <h3 className="col-10 text">{movie.overview}</h3>
                </div>
                <h2>Trailers : </h2>
                {getTrailers.map(trailer => <iframe id="ytplayer" type="text/html" width="70%" height="300px"
                                                    src={`https://www.youtube.com/embed/${trailer.key}`}/>)}
                {this.state.errors ? (<form onSubmit={this.onSubmit}>
                  <input className={'dangerInput'} onChange={this.onChange} value={this.state.text} type="text" name="text"/>
                  <span className={'dangerText'}>{this.state.errors}</span>
                </form>) : (<form onSubmit={this.onSubmit}>
                  <input  onChange={this.onChange} value={this.state.text} type="text" name="text"/>
                </form>)}
                <CommentSection comments={this.props.comments}/>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
}





