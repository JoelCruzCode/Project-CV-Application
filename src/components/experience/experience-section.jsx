import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CreateForm from '../createForm';
import "../../styles/accordion.css";


export default function CareerSection({sections, onChange, onSubmit, onCancel, onDelete, targetedChange, fillEditForm}) {
    const sectionName = 'career'
    const arrayName = 'jobs'

    const [isOpen, setOpen] = useState(false);

    const [formDisplay2, setFormDisplay2] = useState({
        // buttons: [{id: '123', visible: true}],
        forms: [{ id: '123', visible: false}],
        currentForm: { id: null, visible: false}
    });

    useEffect(() => {
        console.log('Sections state: ', sections);
    }, [sections])

    useEffect(() => {
        console.log('FormDisplay2: ', formDisplay2);
    }, [formDisplay2])

    const handleVisibility = (id, type) => {
        console.log('Checking visibility for form with id:', id);
        if(type === 'form') {
            const form = formDisplay2.forms.find(f => f.id === id);
            return form ? form.visible : formDisplay2.currentForm.visible
        }
         // For buttons: Show only if no form is visible (including currentForm)
         console.log(formDisplay2)
         return !formDisplay2.forms.some(form => form.visible) && !formDisplay2.currentForm.visible
    };

    // Helper function for toggleForms and HandleCancel
    function updateFormDisplay(id, found) {
        setFormDisplay2(prev => ({
            ...prev,
            // buttons:prev.buttons.map(btn => ({
            //     ...btn, visible: !btn.visible
            // })),
            forms: prev.forms.map(form => 
                form.id === id ? {...form, visible: !form.visible} : {...form, visible: false}
            ),
            currentForm: found ? {id: null, visible: false}  : {id: null, visible: !prev.currentForm.visible}  
        }))
    }

    function toggleForms(e) {
       e.preventDefault()
       const id =  e.target.dataset.id 
    //    const className = e.target.className
       const found = fillEditForm(id, sectionName, arrayName)
       updateFormDisplay(id, found)
    }

    function handleCancel(e) {
        e.preventDefault()
        const id  = e.target.dataset.id
        const found = sections[sectionName][arrayName].find(school => school.id === id)
        onCancel(id, sectionName, arrayName);
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
        const uuid = onSubmit(sectionName, arrayName);
        console.log('UUID generated on submit:', uuid);
        setFormDisplay2(prev => ({
            ...prev,
            // buttons: [...prev.buttons, {id:uuid, visible: true}],
            forms: [...prev.forms, { id: uuid, visible: false }],
            currentForm: {id: null, visible: false}
        }));
    }

    function handleDelete(e) {
        e.preventDefault()
        const id = e.target.dataset.id
        // const remainingButtons = formDisplay2.buttons.filter(btn => btn.id !== id);
        const remainingForms = formDisplay2.forms.filter(form => form.id !== id);

        setFormDisplay2(prev => ({
            ...prev, 
            // buttons: remainingButtons,
            forms: remainingForms,
        })
        )
        onDelete(e, sectionName)
    }



    return (
        <>
        <button
            className='accordion'
            data-section-id='section1'
            onClick={expandSection}            
        >
            Career
        </button>
        <div className='panel' id='section2' style={{display: isOpen ? "block" : "none"}}>
        <div className='school-container'>
                    {sections[sectionName].jobs.map(job => (
                        <div key={job.id}>
                            <button 
                                style={{ display: handleVisibility(job.id) ? 'block' : 'none' }}
                                onClick={toggleForms} 
                                className="school-btn" 
                                data-id={job.id}
                            >
                                {job.company}               
                            </button>
                            <CreateForm
                                dataKey='jobs'
                                key={job.id}
                                section={job}
                                id={job.id}
                                className="section-form"
                                style={{ display: handleVisibility(job.id, 'form') ? 'block' : 'none' }}
                                onChange={(e) => targetedChange(sectionName, e)}
                                onSubmit={toggleForms}
                                onDelete={handleDelete}
                                onCancel={handleCancel}
                            />
                        </div>
                    ))}
                <button 
                    style={{ display: handleVisibility(null) ? 'block' : 'none' }}
                    onClick={toggleForms} 
                    type='button' 
                    className="school-btn" 
                    data-id={null}
                >
                    New
                </button>
                <CreateForm
                    data-key={'jobs'}
                    section={sections[sectionName].currentForm}
                    id={''}
                    className="section-form"
                    style={{ display: handleVisibility(null, 'form') ? 'block' : 'none' }}
                    onChange={(e) => onChange(sectionName, e)}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    onDelete={()=>{}}
                />
                </div>
        </div>
        </>
    );
}



CareerSection.propTypes = {
    sections: PropTypes.shape({
        jobs: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            company: PropTypes.string,
            position: PropTypes.string,
            description: PropTypes.string,
            start: PropTypes.string,
            end: PropTypes.string,
        })),
        currentForm: PropTypes.shape({
            // Define the shape based on the section type (education or career)
            school: PropTypes.string,
            degree: PropTypes.string,
            location: PropTypes.string,
            start: PropTypes.string,
            end: PropTypes.string,
            company: PropTypes.string,
            position: PropTypes.string,
            description: PropTypes.string,
            id: PropTypes.string,
        }).isRequired,
        editForm: PropTypes.shape({
            // Define the shape based on the section type (education or career)
            school: PropTypes.string,
            degree: PropTypes.string,
            location: PropTypes.string,
            start: PropTypes.string,
            end: PropTypes.string,
            company: PropTypes.string,
            position: PropTypes.string,
            description: PropTypes.string,
            id: PropTypes.string,
        }).isRequired,
    }),
    onChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    targetedChange: PropTypes.func.isRequired,
    fillEditForm: PropTypes.func.isRequired,
}