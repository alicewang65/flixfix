import React from 'react' 

// MovieDetails is the component that formats the display of each individual movie
import MovieDetails from './MovieDetails'

/**
 * Displays the results of the API search in an accordion style.
 */
class MovieResults extends React.Component {
    render() {
        let movieAccordions

        // If there is an error message (i.e. the movie results are undefined), 
        // display the error and don't attempt to format non-existent results
        if (!(this.props.movies)) {
            movieAccordions = <p className="bodytext highlighttext">Error: {this.props.error}</p>
        }
        else {
            // Utilizing map to format the details and display of each movie
            movieAccordions = this.props.movies.map(movie => {
                return (
                    // Setting the key to the unique IMDb ID of the movie
                    <div className="accordion-item" key={movie.imdbID}>
                        <h2 className="accordion-header" id={"heading" + movie.imdbID}>
                            <button className="accordion-button collapsed titleheader" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + movie.imdbID} aria-expanded="false" aria-controls={"collapse" + movie.imdbID}>
                                { movie.Title }
                            </button>
                        </h2>
                        <div id={"collapse" + movie.imdbID} className="accordion-collapse collapse" aria-labelledby={"heading" + movie.imdbID} data-bs-parent="#movieAccordion">
                            <div className="accordion-body">
                                {/* Using the MovieDetails component to format the bulk of the details. */}
                                <MovieDetails imdbID={movie.imdbID}/>
                            </div>
                        </div>
                    </div>
                )
            })
        }

        return (
            <div className="accordion py-4 px-5" id="movieAccordion">
                { movieAccordions }
            </div>
        )
    }
}

export default MovieResults
