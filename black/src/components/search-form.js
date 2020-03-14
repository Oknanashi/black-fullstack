import React from "react";
import PropTypes from 'prop-types';


class SearchBox extends React.Component {
  state = {inputValue: '', API_KEY: '979c677011397c51c03888adfa9b06ac'};

  onChangeHandler = e => {
    this.setState({inputValue: e.target.value})
    const { inputValue, API_KEY } = this.state;

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${inputValue}&page=1&include_adult=false`)
      .then(res => res.json())
      .then(data => {
        this.props.getMovies(data.results)
      })
      .catch(err => new Error(err));

  };

  onClickHandler = e => {
    const { inputValue, API_KEY } = this.state;

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${inputValue}&page=1&include_adult=false`)
      .then(res => res.json())
      .then(data => {
        this.props.getMovies(data.results)
      })
      .catch(err => new Error(err));
  };
  onsubmit = (e) =>{
    e.preventDefault();
  };
  render() {

    return (
      <div className="searchForm">
        <form className="input-group" onSubmit={this.onsubmit}>
          <input
            className="form-control"
            type="text"
            placeholder="Find your movie"
            autoFocus="on"
            autoCorrect="off"
            autoComplete="off"
            spellCheck="false"
            onChange={this.onChangeHandler}
          />
          <button className="btn btn-secondary" onClick={ this.onClickHandler }>search</button>
        </form>
      </div>
    );
  }
}

SearchBox.propTypes =  {
  getMovies: PropTypes.func.isRequired
};

export default SearchBox;
