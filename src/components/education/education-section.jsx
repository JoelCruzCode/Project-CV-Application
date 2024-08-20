import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import EducationForm from './educationForm';
import "../../styles/accordion.css";
import CreateForm from '../createForm';


export default function EducationSection({sections, onChange, onSubmit, onCancel, onDelete, targetedChange, fillEditForm}) {
    const sectionName = 'education'
    const arrayName = 'schools'

    const [isOpen, setOpen] = useState(false);

    const [formDisplay, setFormDisplay] = useState({
        // buttons: [{id: '123', visible: true}],
        forms: [{ id: '123', visible: false}],
        currentForm: { id: null, visible: false}
    });

    useEffect(() => {
        console.log('Sections state: ', sections);
    }, [sections])

    useEffect(() => {
        console.log('FormDisplay1: ', formDisplay);
    }, [formDisplay])

    const handleVisibility = (id, type) => {
        console.log('Checking visibility for form with id:', id);
        if(type === 'form') {
            const form = formDisplay.forms.find(f => f.id === id);
            return form ? form.visible : formDisplay.currentForm.visible
        }
         // For buttons: Show only if no form is visible (including currentForm)
         console.log(formDisplay)
         return !formDisplay.forms.some(form => form.visible) && !formDisplay.currentForm.visible
    };

    // Helper function for toggleForms and HandleCancel
    function updateFormDisplay(id, found) {
        setFormDisplay(prev => ({
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
        setFormDisplay(prev => ({
            ...prev,
            // buttons: [...prev.buttons, {id:uuid, visible: true}],
            forms: [...prev.forms, { id: uuid, visible: false }],
            currentForm: {id: null, visible: false}
        }));
    }

    function handleDelete(e) {
        e.preventDefault()
        const id = e.target.dataset.id
        // const remainingButtons = formDisplay.buttons.filter(btn => btn.id !== id);
        const remainingForms = formDisplay.forms.filter(form => form.id !== id);

        setFormDisplay(prev => ({
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
            className={isOpen ? 'accordion collapsed': 'accordion '}
            data-section-id='section1'
            onClick={expandSection}            
        >
            Education
        </button>
        <div className='panel' id='section2' style={{display: isOpen ? "block" : "none"}}>
        <div className='section-container'>
                    {sections[sectionName].schools.map(job => (
                        <div key={job.id}>
                            <button 
                                style={{ display: handleVisibility(job.id) ? 'block' : 'none' }}
                                onClick={toggleForms} 
                                className="entry-btn" 
                                data-id={job.id}
                            >
                                {job.school}               
                            </button>
                            <CreateForm
                                dataKey='schools'
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
                    className="new-entry-btn" 
                    data-id={null}
                >
                    New
                </button>
                <CreateForm
                    data-key={'schools'}
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



EducationSection.propTypes = {
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

// export default function EducationSection({ education, onChange, onSubmit, onCancel, onDelete, targetedChange, fillEditForm}) {

//     const [isOpen, setOpen] = useState(false);

//     const [formDisplay, setFormDisplay] = useState({
//         // buttons: [{id: '123', visible: true}],
//         forms: [{ id: '123', visible: false}],
//         currentForm: { id: null, visible: false}
//     });

//     useEffect(() => {
//         console.log('Education: ', education);
//     }, [education])

//     useEffect(() => {
//         console.log('FormDisplay: ', formDisplay);
//     }, [formDisplay])

//     const handleVisibility = (id, type) => {
//         console.log('Checking visibility for form with id:', id);
//         if(type === 'form') {
//             const form = formDisplay.forms.find(f => f.id === id);
//             return form ? form.visible : formDisplay.currentForm.visible
//         }
//          // For buttons: Show only if no form is visible (including currentForm)
//          console.log(formDisplay)
//          return !formDisplay.forms.some(form => form.visible) && !formDisplay.currentForm.visible
//     };

//     // Helper function for toggleForms and HandleCancel
//     function updateFormDisplay(id, found) {
//         setFormDisplay(prev => ({
//             ...prev,
//             // buttons:prev.buttons.map(btn => ({
//             //     ...btn, visible: !btn.visible
//             // })),
//             forms: prev.forms.map(form => 
//                 form.id === id ? {...form, visible: !form.visible} : {...form, visible: false}
//             ),
//             currentForm: found ? {id: null, visible: false}  : {id: null, visible: !prev.currentForm.visible}  
//         }))
//     }

//     function toggleForms(e) {
//        e.preventDefault()
//        const id =  e.target.dataset.id 
//     //    const className = e.target.className
//        const found = fillEditForm(id)
//        updateFormDisplay(id, found)
//     }

//     function handleCancel(e) {
//         e.preventDefault()
//         const id  = e.target.dataset.id
//         const found = education.schools.find(school => school.id === id)
//         onCancel(id);
//         updateFormDisplay(id, found)
//     }

//     function expandSection(e) {
//         setOpen(prevIsOpen => !prevIsOpen);
//         const id = e.target.dataset.sectionId;
//         const panel = document.getElementById(id);

//         if (panel) {
//             panel.style.display = isOpen ? 'none' : 'block';
//         }
//     }

//     function handleSubmit(e) {
//         e.preventDefault();
//         const uuid = onSubmit();
//         console.log('UUID generated on submit:', uuid);
//         setFormDisplay(prev => ({
//             ...prev,
//             // buttons: [...prev.buttons, {id:uuid, visible: true}],
//             forms: [...prev.forms, { id: uuid, visible: false }],
//             currentForm: {id: null, visible: false}
//         }));
//     }

//     function handleDelete(e) {
//         e.preventDefault()
//         const id = e.target.dataset.id
//         // const remainingButtons = formDisplay.buttons.filter(btn => btn.id !== id);
//         const remainingForms = formDisplay.forms.filter(form => form.id !== id);

//         setFormDisplay(prev => ({
//             ...prev, 
//             // buttons: remainingButtons,
//             forms: remainingForms,
//         })
//         )
//         onDelete(id)
//     }




//     return (
//         <>
//             <button
//                 className='accordion'
//                 data-section-id='section1'
//                 onClick={expandSection}
//             >
//                 Education
//             </button>
//             <div className='panel' id="section1" style={{ display: isOpen ? "block" : "none" }}>
//                 <div className='school-container'>
//                     {education.schools.map(school => (
//                         <div key={school.id}>
//                             <button 
//                                 style={{ display: handleVisibility(school.id) ? 'block' : 'none' }}
//                                 onClick={toggleForms} 
//                                 className="school-btn" 
//                                 data-id={school.id}
//                             >
//                                 {school.school}               
//                             </button>
//                             <EducationForm
//                                 key={school.id}
//                                 style={{ display: handleVisibility(school.id, 'form') ? 'block' : 'none' }}
//                                 className="education-form"
//                                 id={school.id}
//                                 education={school}
//                                 onChange={targetedChange}
//                                 onSubmit={toggleForms}
//                                 onDelete={handleDelete}
//                                 onCancel={handleCancel}
//                             />
//                         </div>
//                     ))}
//                 <button 
//                     style={{ display: handleVisibility(null) ? 'block' : 'none' }}
//                     onClick={toggleForms} 
//                     type='button' 
//                     className="school-btn" 
//                     data-id={null}
//                 >
//                     New
//                 </button>
//                 <EducationForm
//                     style={{ display: handleVisibility(null, 'form') ? 'block' : 'none' }}
//                     className="education-form"
//                     education={education.currentForm}
//                     onChange={onChange}
//                     onSubmit={handleSubmit}
//                     onCancel={handleCancel}
//                     id={''}
//                     onDelete={()=>{}}

//                 />
//                 </div>

//             </div>
//         </>
//     );
// }

// EducationSection.propTypes = {
//     education: PropTypes.shape({
//         schools: PropTypes.array.isRequired,
//         currentForm: PropTypes.shape({
//             school: PropTypes.string.isRequired,
//             degree: PropTypes.string.isRequired,
//             location: PropTypes.string.isRequired,
//             start: PropTypes.string.isRequired,
//             end: PropTypes.string.isRequired,
//         }).isRequired
//     }).isRequired,
//     onChange: PropTypes.func.isRequired,
//     onCancel: PropTypes.func.isRequired,
//     onSubmit: PropTypes.func.isRequired,
//     onDelete: PropTypes.func.isRequired,
//     targetedChange: PropTypes.func.isRequired,
//     fillEditForm: PropTypes.func.isRequired,
// };


