import { useEffect, useState } from 'react'
import './App.css'

function useAnimalSearch() {
  const [animals, setAnimals] = useState([]);

  const search = async (q) => {
    const response = await fetch(
      'http://localhost:8080?' + new URLSearchParams({ q })
    );

    const data = await response.json();
    setAnimals(data);

    localStorage.setItem('lastQuery', q);
  };

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    search(lastQuery);
  }, []);

  return { search, animals };
}


function App() {
  
  const { search, animals } = useAnimalSearch(); 

  return (
    <main>
      <h1>Animal Farm</h1>

      <input 
        type="text"
        placeholder="Search"
        onChange={(e) => search(e.target.value)} 
      />

        <ul>
          {animals.map((animal) => {
            return <Animal key={animal.id} {...animal} />
          })}
          {animals.length === 0 && 'No animals found'}
        </ul>
    </main>
  );
}

function Animal({ type, name, age}) {
  return (
    <li>
      <strong>{type}</strong> {name} ({age} years old)
    </li>
  );
}

export default App
