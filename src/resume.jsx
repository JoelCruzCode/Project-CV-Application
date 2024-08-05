import { Fragment } from "react";
import PropTypes from 'prop-types'

export default function Resume ({ person }) {

    return (
        <Fragment>
            <div className="resume-container">
                <div className='resume-personal'>
                    <h3 className="resume-name">{person.name}</h3>
                    <p className="resume-email">{person.email}</p>
                    <p className="resume-phone">{person.phone}</p>
                    <p className="resume-address">{person.address}</p>
                </div>
                <div className="resume-details">
                    <div>
                        <h3 className="details-title">Education</h3>
                    </div>
                   <div>
                    <h3 className="details-title">Experience</h3>
                   </div>
                </div>
            </div>
        </Fragment>
    )

}

Resume.propTypes = {
    person: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired
    }).isRequired
};