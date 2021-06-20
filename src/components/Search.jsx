import React from 'react'

// Dropdown is the component for changing number of results displayed (aka 'page size')
import Dropdown from './Dropdown'
// MovieResults is the component that displays the movie results
import MovieResults from './MovieResults'
// PageNav is the component for paginating
import PageNav from './PageNav'
// searchMovies is the function for accessing the API
const { searchMovies } = require('../lib/MovieApi')


/**
 * Encompasses the search component of the website, featuring a search bar, the resulting
 * movies, page navigation and dropdown for changing the number of results per page.
 * Most of the website functionality goes through this component.
 */
class Search extends React.Component {
    constructor(props) {
        super(props)
        /**
         * value: search term
         * movies: array of movie results returned by the API currently displayed (<= 10 movies)
         * results: total number of results for the search
         * curPage: current page of the movie results that is displayed
         * pageSize: (x10) gives number of results displayed
         * error: any error information returned by the API
         */
        this.state = { value: '', movies: [], results: 0, curPage: 1, pageSize: 1, error: '', loading: true }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.changePage = this.changePage.bind(this)
        this.getLargePage = this.getLargePage.bind(this)
        this.switchPageSize = this.switchPageSize.bind(this)
    }

    /**
     * Handles changes in the search bar so that the value is "captured"
     * and stays visible
     */
    handleChange(event) {
        this.setState({value: event.target.value})
    }

    /**
     * Runs after the search term is entered and submitted, allowing
     * the API to be called and the movies to be displayed.
     */
    async handleSubmit(event) {
        event.preventDefault()
        // get the 1st page of movie results based on search term
        const movieList = await searchMovies(this.state.value, 1)
        //if there is an error with the search, store that
        if (movieList.Response === "False") {
            this.setState({error: movieList.Error})
        }
        //set the movies and total number of results
        this.setState({movies: movieList.Search, results: movieList.totalResults, loading: false})
    }

    /**
     * Gets the new page of movie results based on the page number
     * passed in. Entry point to change the page of results shown.
     * 
     * @param {number} page new page of movie results to display
     */
    async changePage(page) {
        this.setState({loading: true})

        let movieList
        // If the number of results displayed is not the default 10
        if (this.state.pageSize > 1) {
            // Call the specific method for fetching the results for a "large page"
            movieList = await this.getLargePage(page);
            // Update the movies and current page displayed
            this.setState({movies: movieList, curPage: page, loading: false})
        }
        else {
            // Utilize the standard function for getting results
            movieList = await searchMovies(this.state.value, page)
            // Update the movies and current page displayed
            this.setState({movies: movieList.Search, curPage: page, loading: false})
        }
    }

    /**
     * Gets the new page of movie results when the number of movies displayed
     * on the site is 50 or 100 (i.e. not the standard 10 results).
     * 
     * @param {number} page new page of "extended" movie results to display
     * @returns 
     */
    async getLargePage(page) {
        let extendedMov = []

        // Simple math for determining what the page of extended
        //results translates to in the API
        const startPage = this.state.pageSize*(page - 1) + 1
        const maxPage = Math.ceil(this.state.totalResults/10)

        // Loop for fetching the correct number of movie results from the API
        for (let i = 0; i < this.state.pageSize; i++) {
            // If the number of movie results is less than 50 or 100, break
            // so we aren't making unnecessary calls
            if ((startPage + i) > maxPage) {
                break
            }
            // Use .concat because the API returns and array and
            // we want an array of results not an array of arrays
            extendedMov = extendedMov.concat((await searchMovies(this.state.value, startPage + i)).Search)   
        }

        // Pass results back to the changePage function
        return extendedMov
    }

    /**
     * Changes the size of the page (i.e. the number of movie results displayed per
     * page). Once size is change, website will show the first page of the results.
     * 
     * @param {number} newSize new number of movie results to be displayed per page
     */
    async switchPageSize(newSize) {
        // Set the new page size and current page of results
        this.setState({pageSize: newSize, curPage: 1})

        // Retrieve and store the movies (i.e. results of the search)
        const movieList = await this.getLargePage(1)
        this.setState({movies: movieList})
    }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-center align-items-center">
                    {/* This "form" is for the user to enter the movie title to search for. */}
                    <form className="" onSubmit={this.handleSubmit}>
                        <label>
                            <input className="ms-2" type="text" value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <input className="ms-3 fancybutton" type="submit" value="Search"/>
                    </form>   
                </div>

                {/* If there are no results, don't display the dropdown that allows page size to change. */}
                {(this.state.results === undefined || this.state.results === 0) ? <></> : <Dropdown handler={this.switchPageSize} pSize={this.state.pageSize}/>}
                
                <MovieResults movies={this.state.movies} error={this.state.error}/>
                
                {/* If the results are still loading, pagination nav bar won't load to prevent spamming. However,
                    it does much the component a bit "blinky". If there are no results or less than/equal to 10 
                    results, don't show the pagination toolbar. */}
                {(this.state.loading || this.state.results === undefined || this.state.results <= 10) ? <></> : <PageNav results={this.state.results} handler={this.changePage} page={this.state.curPage} pSize={this.state.pageSize}/>}
            </div>
        )
    }
}

export default Search