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
                    Everyone enjoys a good movie! There are a tremendous amount of movies and it can 
                    be difficult to find detailed information about each one. FLiX FiX is <em>the</em>  
                    tool to help you get your movie fix.
                </p>
                <p className="bodytext">
                    <span className="highlighttext"> Enter any movie title or keyword in the title into 
                    the search bar below and press "Search". </span> Displayed beneath will be a table of 
                    all the movies with the inputted search term in the title. Clicking on each movie entry 
                    will produce additional details including genre, rating and more. Have fun!
                </p>
                <p className="bodytext highlighttext">
                    Please note: Sometimes it might take a second for the results to load!
                </p>
            </div>
        )
    }
}

export default Header
