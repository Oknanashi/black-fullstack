import React, {Component} from 'react'
import {connect } from 'react-redux'
import {toggleMessage,getMovies} from './actions'
import {bindActionCreators} from 'redux'

class Toggle extends Component {

  render(){
    const {messageVisibility,toggleMessage,getMovies} = this.props;
    return(
      <div>
        {messageVisibility&&<p>If toggled then seen Pog</p>}
        <button onClick={toggleMessage} >Toggle me</button>
        <button onClick={getMovies} >Load movies for me</button>
      </div>
    )
  }
}
const mapStateToProps = (state) =>({
  messageVisibility:state.message.messageVisibility,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleMessage,getMovies
},dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Toggle)


