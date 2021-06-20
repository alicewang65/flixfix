import React from 'react'

/**
 * Series of buttons/clickable items for navigating the various pages
 * of movie results. In the case of extensive movie results, only the
 * pages near the current page will have buttons, and there will be a
 * place holder "ellipse" for the middle pages. The first and last
 * page will always be shown. The previous and next buttons will be
 * available unless it is the first or last page, respectively.
 */
class PageNav extends React.Component{
    render() {
        let numbers = []

        // For ease, determine the total number of pages
        // Have to divide by pSize which is the number of results per page
        // in order to properly calculate the number of pages of results
        const numPages = Math.ceil(this.props.results/10/this.props.pSize)

        // For ease, determine the low and high range for page buttons
        // that will be displayed
        const pageLow = this.props.page - 2
        const pageHigh = this.props.page + 2

        for (let i = 1; i <= numPages; i++) {
            // This specific order of if-else statements is designed such that the navigation
            // buttons will be properly displayed and usable.

            // If we are on the first or last page, which always has to be displayed
            if (i === 1 || i === numPages) {
                // If the first/last page is the current page, add the active class to change the style
                // The handler is the changePage function in Search.jsx, which we're also passing in
                // the page it should change to, based on the value of i.
                if (i === this.props.page) {
                    numbers.push( <li className="page-item active page-num" onClick={() => this.props.handler(i)}><span className="page-link modactive">{i}</span></li> )
                }
                else {
                    numbers.push( <li className="page-item page-num" onClick={() => this.props.handler(i)}><span className="page-link modnumber">{i}</span></li> )
                }
            }
            else {
                // If we are on a page that is below the range of buttons to be shown
                if (i < pageLow) {
                    // Introduce the placeholder button
                    numbers.push( <li className="page-item disabled"><span className="page-link">...</span></li> )
                    // Skip i to pageLow (there is a -1 because the loop will do i++, so this means the next loop
                    // will have i equal to pageLow)
                    i = pageLow - 1
                }
                // If we are above the range of buttons to be shown
                else if (i > pageHigh) {
                    // Introduce the placeholder button
                    numbers.push( <li className="page-item disabled"><span className="page-link">...</span></li> )
                    // Skip to the last page (there is a -1 because the loop will do i++, so with the -1 the next
                    // loop will have i equal to numPages)
                    i = numPages - 1
                }
                // In the range of buttons to be shown
                else {
                    // If page i is the current page, add the active class to change the style
                    if (i === this.props.page) {
                        numbers.push( <li className="page-item active page-num" onClick={() => this.props.handler(i)}><span className="page-link modactive">{i}</span></li> )
                    }
                    else {
                        numbers.push( <li className="page-item page-num" onClick={() => this.props.handler(i)}><span className="page-link modnumber">{i}</span></li> )
                    }
                }
            }
        }

        return(
            <form className="d-flex w-100 align-items-center justify-content-center p-3">
                <nav aria-label="Page nav">
                    <ul className ="pagination">
                        {/* If current page is the first page, disable the previous button. Otherwise, handler is the
                            changePage function in Search.jsx and pass in the current page number MINUS 1. */}
                        {(this.props.page === 1) ? <li className="page-item disabled"><span className="page-link">Previous</span></li> :
                            <li className="page-item page-num" onClick={() => this.props.handler(this.props.page - 1)}><span className="page-link modnumber">Previous</span></li>
                        }
                        {/* numbers is the remaining page navigation buttons */}
                        { numbers }
                        {/* If current page is the last page, disable the next button. Otherwise, the handler is the
                            changePage function in Search.jsx and pass in the current page number PLUS 1.*/}
                        {(this.props.page === numPages) ? <li className="page-item disabled"><span className="page-link">Next</span></li> :
                            <li className="page-item page-num" onClick={() => this.props.handler(this.props.page + 1)}><span className="page-link modnumber">Next</span></li>
                        }
                    </ul>
                </nav>
            </form>
        )
    }
}

export default PageNav