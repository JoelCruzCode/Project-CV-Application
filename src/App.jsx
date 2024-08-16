import { useState } from 'react';
import {v4 as uuidv4 } from 'uuid'
import PersonalForm from './components/personal-info/personal-form';
import EducationSection from './components/education/education-section';
import EducationCard from './components/education/education-card';
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



