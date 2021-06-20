import React from 'react'

/**
 * Dropdown component that allows the user to change how many movie
 * results are displayed on one page, options are 10, 50 and 100.
 */
class Dropdown extends React.Component {
    render() {
        return (
            <div className="dropdown d-flex flex-row-reverse w-100 pe-5">
                <button className="btn btn-secondary dropdown-toggle fancybutton" type="button" id="dropdownMenu" data-bs-toggle="dropdown" aria-expanded="false">
                    Page Size
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu">
                    <li>
                        {/* If currently showing 10 results, "disable" the button to help reduce unnecessary rendering/actions.
                            (Also applies for 50 and 100 results). The handler is the function on Search.jsx that handles the re-rendering
                            given the change in results per page. API returns 10 results at a time, hence the param for the handler is
                            divided by 10. */}
                        {this.props.pSize === 1 ? <button className="dropdown-item disabled" type="button" onClick={() => this.props.handler(1)}>10</button> : 
                        <button className="dropdown-item" type="button" onClick={() => this.props.handler(1)}>10</button>}
                    </li>
                    <li>
                        {this.props.pSize === 5 ? <button className="dropdown-item disabled" type="button" onClick={() => this.props.handler(5)}>50</button> : 
                        <button className="dropdown-item" type="button" onClick={() => this.props.handler(5)}>50</button>}
                    </li>
                    <li>
                        {this.props.pSize === 10 ? <button className="dropdown-item disabled" type="button" onClick={() => this.props.handler(10)}>100</button> : 
                        <button className="dropdown-item" type="button" onClick={() => this.props.handler(10)}>100</button>}
                    </li>
                </ul>
            </div>
        )
    }
}

export default Dropdown