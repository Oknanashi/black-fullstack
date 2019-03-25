import React, { Component } from 'react';
import '../App.css';
import styled from 'styled-components'
import gitHubLogo from './../img/25231.svg'
import tmbdLogo from './../img/tmdb.svg'

const FooterWrapper = styled.div`
  height:100px
  display:flex
  justify-content:space-around
  align-items:center
  width:100%
  background-color:#444
  border-top:3px solid #00bc8c
  position:absolute
  bottom:-100px
  .gitHub{
    display:flex
    flex-direction:column
    align-items:center
    justify-content:center
    img{
      width:50px
      height:50px
    }
  }
  img{
    width:200px
    height:70px
  }
  
`


export default class Footer extends Component{

  render(){
    return(

        <FooterWrapper>
          <a className={'gitHub'} href="https://github.com/Oknanashi/black-moviesearcher">
            GitHub link:
            <img  src={gitHubLogo} alt=""/>
          </a>
          <a href="https://www.themoviedb.org/">
            <img src={tmbdLogo} alt=""/>
          </a>
        </FooterWrapper>

    )
  }
}
