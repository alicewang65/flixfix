/**
 * Uses the OMDB API to search for a specific page from all the results
 * with the given title/name.
 * 
 * @param {string} input title to search for
 * @param {number} page specific page of all results
 * @returns movies on the given page with the given search term
 */
const searchMovies = async(input, page) => {
    let response = await fetch(`https://www.omdbapi.com/?apikey=c13968c7&type=movie&s=${encodeURIComponent(input)}&page=${encodeURIComponent(page)}`);
    response = await response.json();
    return(response);
}

/**
 * Uses the OMDB API to find the detailed information of the movie
 * with the given IMDb ID
 * 
 * @param {string} imdbID IMDb ID of the movie to search for
 * @returns detailed information of the desired movie
 */
const fetchMovie = async(imdbID) => {
    let response = await fetch(`https://www.omdbapi.com/?apikey=c13968c7&i=${encodeURIComponent(imdbID)}`);
    response = await response.json();
    return response;
}

export {searchMovies, fetchMovie};