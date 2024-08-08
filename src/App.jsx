import { useState } from 'react';
import {v4 as uuidv4 } from 'uuid'
import PersonalForm from './components/personal-info/personal-form';
import EducationForm from './components/education/education-form';
import EducationCard from './components/education/education-card';
import Resume from './resume';
import './App.css';

export default function App() {
    const [person, setPerson] = useState({
        name: 'John Smith',
        email: 'john@aol.com',
        phone: '626-700-4000',
        address: '6252 Mills Ave, Whittier CA'
    });

    const [education, setEducation] = useState({
      schools: [], 
      currentForm: {
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

    function handleEducationSubmit(e) {
      e.preventDefault();
      setEducation(prevEducation => ({
        schools: [...prevEducation.schools, {...prevEducation.currentForm, id: uuidv4() }],
        currentForm: {
          school: '',
          degree: '',
          location: '',
          start: '',
          end: ''
        }
      }));
    }

  
  
    return (
        <>
            <main>
                <div>{person.name}</div>
                <PersonalForm person={person} onInputChange={handlePersonalChange} />
                <EducationForm education={education} onChange={handleEducationChange} onSubmit={handleEducationSubmit} educationCard={EducationCard} />
                <div>
                    {education.schools.map((school) => (
                        <EducationCard key={school.id} school={school} />
                    ))}
                </div>
            </main>
            <aside>
                <Resume person={person} education={education} />
            </aside>
        </>
    );
}




// TODO //  create a handler for submitting an education form
// TODO // pass submitEducation Handler to EducationForm
// TODO // research keys prop so react can correctly identify Education objects
// TODO // create a handler to delete education objects
