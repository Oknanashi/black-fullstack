import React, { Component } from 'react';
import './App.css';
import MoviesList from "./components/MoviesList";
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import {withRouter} from 'react-router'
import MovieDetails from './components/MovieDetails';
import Favourites from './components/favourites'
import WatchList from './components/WatchList'
import Footer from './components/Footer'
import TvDetails from "./components/TvDetails";
import Register from './components/Register'
import Login from './components/Login'
import {MovieShow,MoviesDetails} from './components/MovieDetails'
import axios from "axios/index";
const instance = axios.create({baseURL:'http://localhost:5000'})


 class App extends Component{

      constructor(props){
        super(props);
        this.state = {
          showWatchList:false,
          currentMoviePage:1,
          currentTvPage:1,
          isLoggedIn:false,
          currentUser:{},
          fakeState:false
        };
      }
      async componentDidMount(){

        if(localStorage.getItem('movie')!==null){
          this.setState({
            showFavourites:true
          })
        }
        if(localStorage.getItem('watch')==undefined || localStorage.getItem('watch')==null || localStorage.getItem('watch') == ''){
          this.setState({
            showWatchList:false
          })
        } else {
          this.setState({
            showWatchList:true
          })
        }
        if(localStorage.getItem('key')== null || localStorage.getItem('key')== ''){
          this.setState({
            isLoggedIn:false
          })
        }else{
          this.setState({
            isLoggedIn:true
          })
        }
        const id = localStorage.getItem('key')
        const idObj = {id:id}
        axios.post(`https://black-fullstack.herokuapp.com/api/users/current`,idObj)
          .then(res=>{

            this.setState({
              currentUser:res.data.user,
              isLoggedIn:true
            })
          })
          .catch(err=>console.log(err))

      }
      fakesetState = (prop)=> {

        if(prop==='watch'){
          this.setState({
            showFavourites:true
          })
        } else {
          this.setState({
            showWatchList:true
          })
        }
      }
      goback = (action) =>{
        if(action=='movie'){
          this.setState({
            currentMoviePage:this.state.currentMoviePage-1
          })
        } else {
          this.setState({
            currentTvPage:this.state.currentTvPage-1
          })
        }
      }
      LogOut = () =>{
        localStorage.removeItem('key')
        this.setState({
          currentUser:{},
          isLoggedIn:false
        })
      }
      updatePage = (action) => {
        console.log('update page')
        if(action=='movie'){
          this.setState({
            currentMoviePage:this.state.currentMoviePage+1
          })
        } else{
          this.setState({
            currentTvPage:this.state.currentTvPage+1
          })
        }
      }

      setPage = (id,action) =>{
        if(action=='movie'){
          console.log('setmovie')
          this.setState({
            currentMovie:id
          })
        }
        if(action=='tv'){
          console.log('setTv')
          this.setState({
            currentTv:id
          })
        }
      }
    onRegister=(userData)=>{

          this.setState({
            currentUser:userData,
            isLoggedIn:true
          })


    }
    onLogin=userData=>{
          this.setState({
            currentUser: userData,
            isLoggedIn: true
          })
    }
    rerenderPage = () =>{
        this.setState({
          fakeState:!this.state.fakeState
        })
    }
      render(){
      console.log(new Date().getDay())
        return(
          <Router>
            <div className="App">

                <header className="App-header">

                  <ul id="menu">
                    <li>
                      <Link to="/">
                        <i className="fas fa-home"></i>
                        <h1>Main Page</h1>
                      </Link>
                    </li>

                    <li>
                      <Link to="/favourites">
                        <i className="fas fa-heart"></i>
                        <h1>Favourites</h1>
                      </Link>
                    </li>


                    <li>
                      {this.state.showWatchList &&
                      <Link to="/watchlist">
                        <i className="fas fa-eye"></i>
                        <h1>WatchList</h1>
                      </Link>
                      }
                    </li>
                  </ul>
                  {
                    !this.state.isLoggedIn ? (<div><Link to='/register' >Register</Link>
                      <Link to='/login' >Log in</Link></div>) : (
                        <div>
                          {this.state.currentUser.name}
                          <button onClick={this.LogOut}>Log Out</button>
                        </div>
                    )
                  }
                </header>




                <Switch>
                  <Route exact path="/favourites" render={(props)=><Favourites {...props} />}/>
                  <Route exact path="/WatchList" component={WatchList}/>
                  <Route exact path="/" render={(props)=><MoviesList {...props}  updatePage={this.updatePage} goback={this.goback} currentTvPage={this.state.currentTvPage} currentMoviePage={this.state.currentMoviePage} />}/>
                  <Route path="/movie/:id" render={(props)=><MoviesDetails {...props} rerenderPage={this.rerenderPage} user={this.state.currentUser} setPage={this.setPage} fakesetState={this.fakesetState} currentMovie={this.state.currentMovie}/>}/>
                  <Route path="/tv/:id" render={(props)=><TvDetails {...props} setPage={this.setPage} fakesetState={this.fakesetState} currentTv={this.state.currentTv}/>}/>
                  <Route path="/register"  render={(props)=><Register getData={this.onRegister}/>}/>
                  <Route path="/login"  render={(props)=><Login getData={this.onLogin}/>}/>
                </Switch>

              <Footer/>
            </div>
          </Router>
        )
      }
};


export default App
