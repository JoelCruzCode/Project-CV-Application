import { useState } from 'react';
import PersonalForm from './components/personal-info/personal-details';
import EducationCard from './components/education/education-container';
import Resume from './resume';
import './App.css';

function App() {
    const [person, setPerson] = useState({
        name: 'John Smith',
        email: 'john@aol.com',
        phone: '626-700-4000',
        address: '6252 Mills Ave, Whittier CA'
    });

    function handlePersonalChange(e) {
        const { name, value } = e.target;
        setPerson((prevPerson) => ({
            ...prevPerson,
            [name]: value,
        }));
    }

    return (
        <>
            <main>
                <div>{person.name}</div>
                <PersonalForm person={person} onInputChange={handlePersonalChange} />
                <EducationCard />
            </main>
            <aside>
                <Resume person={person} />
            </aside>
        </>
    );
}

export default App;
