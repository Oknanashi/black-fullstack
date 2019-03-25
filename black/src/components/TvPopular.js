import React  from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import '../App.css'

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';

const TvPopular = ({mapShow,updatePage}) => (
    <div className="Movie">
      <Link to={`/tv/${mapShow.id}`} onClick={()=>updatePage(mapShow.id)}>
        <img className="" src={`${POSTER_PATH}${mapShow.poster_path}`} alt={mapShow.title}/>
        <h6 className="">{mapShow.original_name}</h6>
      </Link>
    </div>

);

TvPopular.propTypes ={
  movie: PropTypes.shape({
    title:PropTypes.string.isRequired,
  }).isRequired
};

export default TvPopular;
