const exampleSchool = {
    school: 'Whittier High',
    degree: '',
    location: '',
    startDate: '',
    endDate: '',
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
      currentForm: { school: '', degree: '', location: '', startDate: '', endDate: '' },
      editForm: { school: '', degree: '', location: '', startDate: '', endDate: '' }
    },
    career: {
      currentForm: { company: '', position: '', description: '', startDate: '', endDate: '', id: '' },
      editForm: { company: '', position: '', description: '', startDate: '', endDate: '', id: '' }
    }
  };  


  export { initialFormState, examplePersonal, exampleSchool}