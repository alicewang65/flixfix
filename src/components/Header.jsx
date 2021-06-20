import React from 'react'

/**
 * Header component of the website, describing what the website does
 * and how to use it.
 */
class Header extends React.Component {
    render() {
        return (
            <div className = "d-flex flex-column align-items-center justify-content-center p-5">
                <h1 className="header">FLiX FiX</h1>
                <p className="bodytext">
                    In this digital age, movies have a tremendous impact on both individuals and the broader society.
                    However, given all of the movies that are produced, it can be incredibly difficult to find movie details
                    such as release date, director, rating and more. That's where we come in.
                </p>
                <p className="bodytext">
                    FLiX FiX is <em>the</em> tool to help you get your movie fix.
                    Enter any movie title into the search bar below and press "Search". 
                    Below the search bar will display a table of all the movies with the inputted title and additional details
                    including, but not limited to, release date, runtime, genre and director. Have fun!
                </p>
                <p className="bodytext highlighttext">
                    Please note: Sometimes it might take a second for the results to load!
                </p>
            </div>
        )
    }
}

export default Header
