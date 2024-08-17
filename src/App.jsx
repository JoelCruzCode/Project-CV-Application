import { useState } from 'react';
import {v4 as uuidv4 } from 'uuid'
import PersonalForm from './components/personal-info/personal-form';
import EducationSection from './components/education/education-section';
import Resume from './resume';
import './App.css';

export default function App() {

  const whittier = {
    school: 'Whittier High',
    degree: '',
    location: '',
    start: '',
    end: '',
    id: '123'
  }

    const [person, setPerson] = useState({
        name: 'John Smith',
        email: 'john@aol.com',
        phone: '626-700-4000',
        address: '6252 Mills Ave, Whittier CA'
    });

    // TODO rename update to sections
    // TODO Refactor education to hold careers
    // TODO add a dataset.key property to access arrays: schools : jobs
    const [education, setEducation] = useState({
      schools: [whittier,] ,
      currentForm: {
        school: '',
        degree: '',
        location: '',
        start: '',
        end: ''
      },
      editForm: {
        school: '',
        degree: '',
        location: '',
        start: '',
        end: ''
      }
    });

    const [sections, setSections] = useState({
        education: {
         schools: [whittier,] ,
        currentForm: {
          school: '',
          degree: '',
          location: '',
          start: '',
          end: ''
        },
        editForm: {
          school: '',
          degree: '',
          location: '',
          start: '',
          end: ''
        }
      },
      career: {
        Jobs: [],
        currentForm: {
          company: '',
          position: '',
          description: '',
          start: '',
          end: '',
          id: ''
        },
        editForm: {
          company: '',
          position: '',
          description: '',
          start: '',
          end: '',
          id: ''
        }
      }
      }
    );

    const initialFormState = {
      education: {
        currentForm: { school: '', degree: '', location: '', start: '', end: '' },
        editForm: { school: '', degree: '', location: '', start: '', end: '' }
      },
      career: {
        currentForm: { company: '', position: '', description: '', start: '', end: '', id: '' },
        editForm: { company: '', position: '', description: '', start: '', end: '', id: '' }
      }
    };

    function handleSectionChange(e, sectionName) {
      const {name, value} = e.target
      const section = sections[sectionName]
      setSections(prev => ({
        ...prev,
        [sectionName]: {
          ...section,
          currentForm: {
            ...section.currentForm,
            [name]: value
          }
        }
      }))
    }

    function handleTargetedSectionChange(e, sectionName) {
      const {name, value} = e.target
      const form = e.target.closest('form')
      const id = form.dataset.id
      const arrayName = form.dataset.key
      const section = sections[sectionName]
      const array = section[arrayName]

      setSections(prev => ({
        ...prev, 
        [sectionName]: {
          ...section,
          [arrayName]: array.map(obj => 
            obj.id === id ? {...obj, [name]: value} : obj
          )
        }
      }))
    }

    function handleSectionDelete(e, sectionName) {
      const form = e.target.closest('form')
      const id = form.dataset.id
      const section = sections[sectionName]
      const arrayName = form.dataset.key
      const array = section[arrayName]
      const remaining = array.filter(obj => 
        obj.id !== id
      )
      
      setSections(prev => ({
        ...prev,
        [sectionName]: {
          ...section,
          [arrayName]: remaining
        }
      }))
    }

    function handleSectionSubmit(sectionName, arrayName) {
      const newSectionId = uuidv4();
      const section = sections[sectionName]
      const array = section[arrayName]
      setSections(prev => ({
        ...prev,
        [sectionName]: {...section, 
          [arrayName]: [...array, {...section.current, id: newSectionId}],
          currentForm: initialFormState[sectionName].currentForm
        }
      }))
  
      return newSectionId
    }
  
    function fillSectionEditForm(id, sectionName, arrayName) {
      const section = sections[sectionName]
      const array = section[arrayName]
      const data = array.find(obj => obj.id === id)

      setSections(prev => ({
        ...prev, 
        [sectionName]: {...section, 
          editForm: data
        }
      }))

      return data
    }
    
    //////////////////////////////


    function handlePersonalChange(e) {
        const { name, value } = e.target;

        setPerson(prevPerson => ({
            ...prevPerson,
            [name]: value,
        }));
    }

    function handleEducationChange(e) {
      const {name, value} = e.target;

      setEducation(prevEducation => ({
        ...prevEducation, 
        currentForm: {
          ...prevEducation.currentForm,
          [name]: value
        }
      }))
    }


  function handleTargetedEducationChange(e) {
    const {name, value} = e.target
    const id = e.target.closest('form').dataset.id

    setEducation(prevEducation => ({
      ...prevEducation,

      schools: prevEducation.schools.map(school => 
        school.id === id ? {...school, [name]: value} : school,
      ),
    })
    )
  }


  function handleEducationDelete(id) {
    setEducation(prev => ({
      ...prev, 
      schools: prev.schools.filter(school => 
        school.id !== id
      ),
    }))
  }

  function handleSectionCancel(id, sectionName, arrayName) {
    const section = sections[sectionName]
    const array = section[arrayName]
    setSections(prev => ({
      ...prev,
      [sectionName]: {...section,
        [arrayName]: array.map(obj => 
          obj.id === id ? section.editForm : obj
        ),
        currentForm: initialFormState[sectionName].currentForm,
        editForm : initialFormState[sectionName].editForm,
    }}))
}

  function handleEducationCancel(id) {
    setEducation(prev => ({
      ...prev, 
      schools: prev.schools.map(school => 
        school.id === id ? prev.editForm : school
      ),
      currentForm: {
        school: '',
        degree: '',
        location: '',
        start: '',
        end: ''
      },
      editForm: {
        school: '',
        degree: '',
        location: '',
        start: '',
        end: ''
      }
    }))
  }

  function handleEducationSubmit() {
      const newSchoolId = uuidv4()

      setEducation(prevEducation => ({
        schools: [...prevEducation.schools, {...prevEducation.currentForm, id: newSchoolId }],
        currentForm: {
          school: '',
          degree: '',
          location: '',
          start: '',
          end: ''
        }
      }));

      return newSchoolId
    }

    function fillSectionEditForm(id, sectionName, arrayName) {
      const section = sections[sectionName]
      const array = section[arrayName]
      const data = array.find(obj => obj.id === id)

      setSections(prev => ({
        ...prev, 
        [sectionName]: {...section, 
          editForm: data
        }
      }))

      return data
    }


    function fillEditForm(id) {
      const data = education.schools.find(school =>  school.id === id)

      if(data) {
        setEducation(prev => ({
          ...prev,
          editForm: data
        }))
      }

      return data
    }

  
  
    return (
        <>
            <main>
                <div>{person.name}</div>
                <PersonalForm person={person} onInputChange={handlePersonalChange} />
                <EducationSection education={education}  
                onChange={handleEducationChange} 
                onSubmit={handleEducationSubmit} 
                onDelete={handleEducationDelete}
                targetedChange={handleTargetedEducationChange}
                onCancel={handleEducationCancel}
                fillEditForm={fillEditForm}/>
            </main>
            <aside>
                <Resume person={person} education={education} />
            </aside>
        </>
    );
}



