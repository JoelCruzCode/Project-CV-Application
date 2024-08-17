const exampleSchool = {
    school: 'Whittier High',
    degree: '',
    location: '',
    start: '',
    end: '',
    id: '123'
  }



  const examplePersonal = {
    name: 'John Smith',
    email: 'john@aol.com',
    phone: '626-700-4000',
    address: '6252 Mills Ave, Whittier CA'
  }


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


  export { initialFormState, examplePersonal, exampleSchool}