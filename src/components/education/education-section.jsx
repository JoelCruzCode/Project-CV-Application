import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EducationForm from './educationForm';
import "../../styles/accordion.css";

export default function EducationSection({ education, onChange, onSubmit, onCancel, onDelete, targetedChange, fillEditForm}) {

    const [isOpen, setOpen] = useState(false);
    const [isFormOpen, setForm] = useState(true);

    const [formDisplay, setFormDisplay] = useState({
        forms: [{ id: '123', visible: false }],
        currentForm: { id: null, visible: false}
    });

    // useEffect(() => {
    //     console.log('Education: ', education);
    // }, [education])

    useEffect(() => {
        console.log('FormDisplay: ', formDisplay);
    }, [formDisplay])

    const handleVisibility = (id) => {
        console.log('Checking visibility for form with id:', id);
        const form = formDisplay.forms.find(f => f.id === id);

        if (form) {
            return form.visible
        } 
        return formDisplay.currentForm.visible
    };

    // Helper function for toggleForms and HandleCancel
    function updateFormDisplay(id, found) {
        setFormDisplay(prev => ({
            ...prev,
            forms: prev.forms.map(form => 
                form.id === id ? {...form, visible: !form.visible} : {...form, visible: false}
            ),
            currentForm: !found ? {id: null, visible: !prev.currentForm.visible} : {id: null, visible: false}
        }))
    }


    function toggleForms(e) {
       e.preventDefault()
       const id =  e.target.dataset.id 
       const found = fillEditForm(id)
       updateFormDisplay(id, found)
    }


    function expandSection(e) {
        setOpen(prevIsOpen => !prevIsOpen);
        const id = e.target.dataset.sectionId;
        const panel = document.getElementById(id);

        if (panel) {
            panel.style.display = isOpen ? 'none' : 'block';
        }
    }


    function handleSubmit(e) {
        e.preventDefault();
        const uuid = onSubmit();
        console.log('UUID generated on submit:', uuid);
        setFormDisplay(prev => ({
            ...prev,
            forms: [...prev.forms, { id: uuid, visible: false }],
            currentForm: {id: null, visible: false}
        }));
        setForm(prevStatus => !prevStatus);
    }


    function handleCancel(e) {
        e.preventDefault()
        const id  = e.target.dataset.id
        const found = education.schools.find(school => school.id === id)
        onCancel(id);
        updateFormDisplay(id, found)
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
                {/* <button className="school-btn" type='click' onClick={toggleForm}> View</button> */}
                <div className='school-container'>
                    {education.schools.map(school => (
                        <div key={school.id}>
                            <button 
                                // style={{ display: handleVisibility(school.id) ? 'block' : 'none' }}
                                onClick={toggleForms} 
                                className="school-btn" 
                                data-id={school.id}
                            >
                                {school.school}               
                            </button>
                            <EducationForm
                                key={school.id}
                                style={{ display: handleVisibility(school.id) ? 'block' : 'none' }}
                                className="education-form"
                                id={school.id}
                                education={school}
                                onChange={targetedChange}
                                onSubmit={toggleForms}
                                onDelete={onDelete}
                                onCancel={handleCancel}
                            />
                        </div>
                    ))}
                <button 
                    // style={{ display: handleVisibility(null) ? 'block' : 'none' }}
                    onClick={toggleForms} 
                    type='button' 
                    className="school-btn" 
                    data-id={null}
                >
                    New
                </button>
                <EducationForm
                    style={{ display: handleVisibility(null) ? 'block' : 'none' }}
                    className="education-form"
                    education={education.currentForm}
                    onChange={onChange}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}

                />
                </div>

            </div>
        </>
    );
}

EducationSection.propTypes = {
    education: PropTypes.shape({
        schools: PropTypes.array.isRequired,
        currentForm: PropTypes.shape({
            school: PropTypes.string.isRequired,
            degree: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            start: PropTypes.string.isRequired,
            end: PropTypes.string.isRequired,
        }).isRequired
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    targetedChange: PropTypes.func.isRequired,
    fillEditForm: PropTypes.func.isRequired,
};



    // function toggleForm() {
    //     const formElement = document.querySelector('.education-form');
    //     if (formElement) {
    //         setForm(prevStatus => !prevStatus);
    //         formElement.style.display = isFormOpen ? 'none' : 'block';
    //     }
    // }