import { Fragment } from "react";
import ResumeCard from './components/resume-card';
import PropTypes from 'prop-types'


export default function Resume ({ person, sections}) {

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
                    <br></br>
                    {sections.education.schools.map(school => (
                        <>
                        <ResumeCard section={school} />
                        <br></br>
                        </>
                    ))}
                        <div>
                         <ResumeCard section={sections.education.currentForm}/>
                        </div>
                   </div>
                   <div>
                    <h3 className="details-title">Professional Experience</h3>
                    <br></br>
                    {sections.career.jobs.map(job => (
                        <>
                        <ResumeCard section={job}/>
                        <br></br>
                        </>
                    ))}
                        <ResumeCard section={sections.career.currentForm}/>
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
    sections: PropTypes.shape({
        education: PropTypes.shape({
            schools: PropTypes.arrayOf(
                PropTypes.shape({
                    [PropTypes.string]: PropTypes.string.isRequired,
                }),
            ),
            currentForm: PropTypes.shape({
                [PropTypes.string] : PropTypes.string.isRequired
            })    
            
        }),
        career: PropTypes.shape({
            jobs: PropTypes.arrayOf(
                PropTypes.shape({
                [PropTypes.string]: PropTypes.string.isRequired,
                })
            ),
            currentForm: PropTypes.shape({
                [PropTypes]: PropTypes.string.isRequired,
            })
        })
    }).isRequired,
}