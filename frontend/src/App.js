import React, { useState } from 'react';

import './App.css';

import Header from './components/Header';

function App() { 
    const [projects, setProjects] = useState(['Desenvolvimento de app', 'Front-end Web']);
    //uState retorna um array com 2 posições
    //1 Variavel com seu valor inicial. Ex.: Desenvolvimento de app, Front-end Web
    //2 Função para atualizarmos esse valor
    function handleAddProject() {
        
        setProjects([... projects, `Novo projeto ${Date.now()}` ]);

        console.log(projects);
    }

    return (
    <>          
        <Header title="Homepage"/>
        <ul>
            {projects.map(project => <li key={project}>{ project }</li>)}
        </ul>
        
        <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
          </>
    );
}

export default App;