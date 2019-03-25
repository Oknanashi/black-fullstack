export const TOGGLE_MESSAGE = 'TOGGLE_MESSAGE';
export const GET_MOVIES = 'GET_MOVIES';

export function toggleMessage(){
  return {type:'TOGGLE_MESSAGE',};
}
export function getMovies() {
  return async function(dispatch){
    const res = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=d4c86d3d23078bb5e3ea14ae379a2726&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1');
    const movies = await res.json();
    return dispatch({
      type:'GET_MOVIES',
      data:movies.results,
    })

  };
}
