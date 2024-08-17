import { Fragment } from "react";
import EducationCard from './components/education/education-card';
import PropTypes from 'prop-types'


export default function Resume ({ person, education, sections}) {

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
                        <EducationCard school={education.currentForm} />
                        <br></br>
                        {education.schools.map((school) => (
                            <>
                            <EducationCard key={school.id} school={school} />
                            <br></br>
                            </>
                        ))}
                    </div>
                   <div>
                    <h3 className="details-title">Experience</h3>
                    <br></br>
                    {sections.career.jobs.map(job => (
                        <>
                        <div key={job.id}>
                            <p>{job.company}</p>
                            <p>{job.position}</p>
                            <p>{job.description}</p>
                            <p>{job.start}</p>
                            <p>{job.end}</p>
                        </div>
                        </>
                    ))}
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
    }).isRequired,
    education: PropTypes.shape({
        schools: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                school: PropTypes.string.isRequired,
                degree: PropTypes.string.isRequired,
                location: PropTypes.string.isRequired,
                start: PropTypes.string.isRequired,
                end: PropTypes.string.isRequired,
            })
        ).isRequired,
        currentForm: PropTypes.shape({
            school: PropTypes.string.isRequired,
            degree: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            start: PropTypes.string.isRequired,
            end: PropTypes.string.isRequired,
        }).isRequired
    }).isRequired,
}