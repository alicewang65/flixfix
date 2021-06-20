import React from 'react'
import linkedLogo from '../assets/linkedin.png'

/**
 * Footer component of the website, for copyright information, my contact
 * information and LinkedIn.
 */
class Footer extends React.Component {
    render() {
        return(
            <div className="row justify-content-center p-5 mt-auto pb-2 footertext">
                <div className="col-lg-4 col-sm-12 text-center">
                    <p><a href="mailto:ayw2006@nyu.edu">Email</a></p>
                </div>
                <div className="col-lg-4 col-sm-12 text-center">
                    <p>&copy; {new Date().getFullYear()} Alice Wang</p>
                </div>
                <div className="col-lg-4 col-sm-12 text-center">
                    <a href="https://www.linkedin.com/in/alice-wang-5276111b5">
                        <img className="linkedlogo" src={linkedLogo} alt="https://www.linkedin.com/in/alice-wang-5276111b5" />
                    </a>
                </div>
            </div>
        )
    }
}

export default Footer