import React from 'react'

// fetchMovie is the function that retrieves the detailed movie
// information using the API
const { fetchMovie } = require('../lib/MovieApi')

/**
 * Retrieves the additional movie details via the API and formats these
 * details using the card style from Bootstrap.
 */
class MovieDetails extends React.Component {
    constructor(props) {
        super(props)

        // movie: detailed information of the movie with the specific IMDb ID
        // loading: if true, don't attempt to display the information; if false,
        //          display the information
        this.state = { movie: {}, loading: true }
    }

    /**
     * Invoked after a component is mounted and the best place to load data
     * from a remote endpoint. Loads the first movie.
     */
    async componentDidMount() {
        // Update movie with the expanded movie details from the API
        this.setState({movie: await fetchMovie(this.props.imdbID)})
        // Info is retrieved, so no longer in "loading" stage
        this.setState({loading: false})
    }

    /**
     * Invoked immediately after updating occurs and a good place
     * for network requests. Loads data for additional/new movies
     * after the first one (which is done in componentDidMount)
     */
    async componentDidUpdate(prevProps) {
        if (this.props.imdbID !== prevProps.imdbID) {
            this.setState({movie: await fetchMovie(this.props.imdbID)})
            this.setState({loading: false})
        }
    }

    render() {
        return (
            <div className="card">
                {/* If in "loading" stage, print 'Loading...' instead of the movie details. */}
                {this.state.loading ? <p>Loading...</p> : (
                    <div className="row">
                        {/* Poster and details styled such that on a small screen they will stack
                            instead of be side-by-side */}
                        <div className="col-lg-5 col-sm-12 p-4 d-flex justify-content-center">
                            <img src={this.state.movie["Poster"]} className="img-fluid" alt={this.state.movie["Title"]} />          
                        </div>
                        <div className="col-lg-7 col-sm-12">
                            <div className="card-body p-4">
                                {/* It seems that if information is missing the field will exist but equal "N/A". However,
                                    in case this isn't consistent across the API, the error will be caught and handled. */}
                                {/* The information is organized based on some user testing of what would be most relevant. */}
                                <p className="card-text bodytext">Genre(s): {this.state.movie["Genre"] ? this.state.movie["Genre"] : "Not Available"}</p>
                                <p className="card-text bodytext">IMDb Rating: {this.state.movie["imdbRating"] ? this.state.movie["imdbRating"] : "Not Available"}</p>
                                <p className="card-text bodytext">Plot: {this.state.movie["Plot"] ? this.state.movie["Plot"] : "Not Available"}</p>
                                <p className="card-text bodytext">Runtime: {this.state.movie["Runtime"] ? this.state.movie["Runtime"] : "Not Available"}</p>
                                <p className="card-text bodytext">Release Date: {this.state.movie["Released"] ? this.state.movie["Released"] : "Not Available"}</p>
                                <p className="card-text bodytext">Director: {this.state.movie["Director"] ? this.state.movie["Director"] : "Not Available"}</p>
                                <p className="card-text bodytext">Actors: {this.state.movie["Actors"] ? this.state.movie["Actors"] : "Not Available"}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default MovieDetails
