import React  from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import '../App.css'
import loader from '@hoc-react-loader/core'
const MyLoadingIndicator = () => <div>Movie Loading...</div>

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';

const Movie = ({movie,updatePage}) => (
      <div className="Movie">
        <Link to={`/movie/${movie.id}`} onClick={()=>updatePage(movie.id)}>
          <img className="" src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title}/>
          <h6 className="">{movie.title}</h6>
        </Link>
      </div>
);

Movie.propTypes ={
  movie: PropTypes.shape({
    title:PropTypes.string.isRequired,
  }).isRequired
};

export default loader({ print: ['movie'], LoadingIndicator: MyLoadingIndicator })(Movie)
