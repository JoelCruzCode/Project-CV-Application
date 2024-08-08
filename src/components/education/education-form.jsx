// import { useState } from 'react';
import PropTypes from 'prop-types';
import EducationCard from './education-card';
export default function EducationForm({ education, onChange, onSubmit}) {
    const { currentForm} = education

    // function toggleEducation() {}


return (
    <>
    <button className='accordion'> Education</button>
    <div className='panel'>
    <form onSubmit={onSubmit}>
        <p>School name</p>
        <input
            type="text"
            name="school"
            value={currentForm.school}
            onChange={onChange}
        />
        <p>Degree</p>
        <input
            type="text"
            name="degree"
            value={currentForm.degree}
            onChange={onChange}
        />
        <p>Location</p>
        <input
            type="text"
            name="location"
            value={currentForm.location}
            onChange={onChange}
        />
        <p>Start date</p>
        <input
            type="date"
            name="start"
            value={currentForm.start}
            onChange={onChange}
        />
        <p>End date</p>
        <input
            type="date"
            name="end"
            value={currentForm.end}
            onChange={onChange}
        />
        <div>
        <button type="submit">Add</button>
        </div>
        
    </form>
        <button type='click'> View</button>
        <div className='school-container'>
        <button type='click'>Delete</button>
     
        {education.schools.map(school => {
                return (
                    <div className="school-card" key={school.id}>
                    <EducationCard school={school} />
                    <div className="school-input-box">
                    <label>Delete</label>
                    <input type='checkbox'/>
                    </div>
                    <button>Edit</button>
                    </div>)
            })}
        </div>
        
        </div>
        </>
);
}

EducationForm.propTypes = {
    education: PropTypes.shape({
        schools : PropTypes.arrayOf.isRequired, 
        currentForm: PropTypes.shape({
            school : PropTypes.string.isRequired,
            degree: PropTypes.string.isRequired,
            location : PropTypes.string.isRequired,
            start: PropTypes.string.isRequired,
            end: PropTypes.string.isRequired,
        })
    }),
    onChange : PropTypes.func.isRequired,
    onSubmit : PropTypes.func.isRequired,
}