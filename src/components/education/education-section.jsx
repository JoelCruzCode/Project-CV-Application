// import { useState } from 'react';
import PropTypes from 'prop-types';
// import EducationCard from './education-card';
import EducationForm from './educationForm';
import { useState } from 'react';
import "../../styles/accordion.css"

export default function EducationSection({ education, fillInput, onChange, onSubmit}) {
    // const { currentForm} = education

    const [isOpen, setOpen] = useState(false)

    const [isFormOpen, setForm] = useState(true)

    function toggleForm() {
        const formElement = document.querySelector('.education-form');
        if(formElement) {
            setForm(prevStatus=> !prevStatus)
        formElement.style.display = isFormOpen ? 'none' : 'block';
        }
    }

    function expandSection(e) {
        setOpen(prevIsOpen => !prevIsOpen)
        const id = e.target.dataset.sectionId
        const panel = document.getElementById(id)

        if(panel) {
            panel.style.display = isOpen ? 'none' : 'block';
        }
    }
    function handleSubmit(e) {
        e.preventDefault()
        onSubmit()
        setForm(prevStatus => !prevStatus)
        toggleForm()
        
       
        }



return (
    <>
    <button 
    className='accordion' 
    data-section-id='section1'
    onClick={expandSection}
    > 
    Education
    </button>
    <div className='panel' id="section1" style={{ display: isOpen ? "block" : "none" }}>
    <button className="school-btn" type='click' onClick={toggleForm}> View</button>
    <div className='school-container'>
        {education.schools.map(school => {
            return (
                <button onClick={fillInput}className="school-btn"key={school.id} data-id={school.id} >{school.school}</button>
            )
        })}
        </div>
        <EducationForm className="education-form" education={education} onChange={onChange} onSubmit={handleSubmit} />
        
        </div>
        </>
);
}

EducationSection.propTypes = {
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
    fillInput : PropTypes.func.isRequired,
}