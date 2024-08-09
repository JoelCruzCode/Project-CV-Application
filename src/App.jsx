import { useState } from 'react';
import {v4 as uuidv4 } from 'uuid'
import PersonalForm from './components/personal-info/personal-form';
import EducationSection from './components/education/education-section';
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
    const whittier = {
      school: 'Whittier High',
      degree: '',
      location: '',
      start: '',
      end: '',
      id: '123'
    }

    const dexter = {
      school: 'Dexter Middle School',
      degree: '',
      location: '',
      start: '',
      end: '',
      id: '345'
    }
    const pioneer = {
      school: 'Pioneer High School',
      degree: '',
      location: '',
      start: '',
      end: '',
      id: '567'
    }
    const [education, setEducation] = useState({
      schools: [whittier, dexter, pioneer], 
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
    // This works but logic could be better 
    function fillSchoolInput (e) {
      const id = e.target.dataset.id
      const selected = education.schools.find(school => (
          id === school.id
      ))
      const remainingSchools = education.schools.filter(school => (
        id !== school.id
      ))

      setEducation(prevEducation => ({
        ...prevEducation, 
        schools: remainingSchools,
        currentForm: {
          school: selected.school,
          degree: selected.degree,
          location: selected.location,
          start: selected.start,
          end: selected.end,
        }
      }))
  }
  /////////////////////////////////////////////////////////////////////


    // function selectSchool (e) {
    //   const id = e.target.dataset.id
    //   const selected = education.schools.find(school => (
    //       id === school.id
    //   ))

    //   setEducation(prevEducation => ({
    //     ...prevEducation,
    //     currentForm: { ...selected }
    //   }))
    // }

    // function handleEducationChange(e) {
    //   const {name, value} = e.target;

    //   setEducation(prevEducation => ({
    //     ...prevEducation,
    //     currentForm: {...prevEducation.currentForm},
    //     [name]: value,
    //     schools: prevEducation.schools.map(school => 
    //       school.id === prevEducation.currentForm.id 
    //       ? {...school, [name]: value }
    //       : school
    //     )
        
    //   }))
    // }
    



    function handleEducationSubmit() {
      // e.preventDefault();
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
                <EducationSection education={education} fillInput={fillSchoolInput}onChange={handleEducationChange} onSubmit={handleEducationSubmit} educationCard={EducationCard} />
                {/* <EducationSection education={education} fillInput={fillSchoolInput}onChange={handleEducationChange} onSubmit={handleEducationSubmit} educationCard={EducationCard} /> */}
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
