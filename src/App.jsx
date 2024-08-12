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

    // const dexter = {
    //   school: 'Dexter Middle School',
    //   degree: '',
    //   location: '',
    //   start: '',
    //   end: '',
    //   id: '345'
    // }
    // const pioneer = {
    //   school: 'Pioneer High School',
    //   degree: '',
    //   location: '',
    //   start: '',
    //   end: '',
    //   id: '567'
    // }
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
    const form = e.target.closest('form'); 
    const id = e.target.closest('form').dataset.id

    console.log(form)
    setEducation(prevEducation => ({
      ...prevEducation,
      schools: prevEducation.schools.map(school => 
        school.id === id ? {...school, [name]: value} : school,
      ),
    })
    )
  }



  function handleEducationDelete(e) {
    e.preventDefault()
    const id = e.target.closest('.education-form').dataset.id
    console.log('logging id: ', id)
    setEducation(prev => ({
      ...prev, 
      schools: prev.schools.filter(school => 
        school.id !== id
      ),
    }))
  }
  // TODO // modifty education state to include a new property editForm to keep state when form is opened so user can cancel the edit
  function handleEducationCancel(id) {
    setEducation(prev => ({
      ...prev, 
      schools: prev.schools.map(school => 
        school.id === id ? prev.editForm : school
      ),
      editForm: {
        school: '',
        degree: '',
        location: '',
        start: '',
        end: ''
      }
    }))
  }

  function fillEditForm(id) {
    const edit = education.schools.find(school =>  school.id === id)
    setEducation(prev => ({
      ...prev,
      editForm: edit
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



