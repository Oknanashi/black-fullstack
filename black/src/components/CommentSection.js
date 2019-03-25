import React , {Component} from 'react'
import styled from 'styled-components'

const CommentCard = styled.div`
  height:100px
  width:300px
  display:flex
  justify-content:space-between
  align-items:center
  background-color:#fff
  margin-bottom:1em
  padding:0
  text-align:center
  box-shadow: -1px 5px 2px -2px #000
  
`


export default class CommentSection extends Component {
  state={

  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.comments)
    this.setState({comments:nextProps.comments})
  }
  componentWillUpdate(nextProps){
    if(this.props !==nextProps){
      this.setState({
        comments:nextProps.comments
      })
    }
  }
  render(){
    let {comments} = this.state
    if(comments){
      return(
        <div className='container'>
          <h2>Comments</h2>
          <div className="row">
            {comments.map(comment=>
              <CommentCard className="col-12">

                <div className="col-4">
                  <h6>{comment.name}</h6>
                  <span>{comment.date.slice(0,10)}</span>
                </div>
                <div className="col-8 comment-area">
                  <p>{comment.text}</p>
                </div>


              </CommentCard>
            )}
          </div>
        </div>
      )
    }
    else{
      return(
        <div>No comments</div>
      )
    }
  }
}
