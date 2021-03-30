const { response } = require('express');
const express = require('express'); //importar o micro framework express dentro de uma variável
const { uuid, isUuid } = require('uuidv4'); //isUuid passa uma string para verificar se é válido ou não
const app = express();// criando a aplicação puxando o express

app.use(express.json()); // precisa vir antes das Rotas pois o express funciona de forma linear

const projects = [];

function logRequests(request, response, next){ //PAREI AQUI
    const {method, url} = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);

    return next(); //Próximo middleware
}

function validateProjectId(request, response, next){
    const { id } = request.params;

    if(!isUuid(id)){
        return response.status(400).json({error: 'Invalid project ID.'});
    }
    return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => { //get = parametro dentro do express, projects o local, segundo parametro é a resquisição e resposta
  const { title }= request.query; //Query Params
 
  const results = title
  ? projects.filter(project => project.title.includes(title))
  : projects;

    return response.json(results);
});

app.post('/projects', (request, response) => {
    const { title, owner} = request.body;

    const project = { id: uuid(), title, owner };

    projects.push(project);

    return response.json(project); 
});

app.put('/projects/:id', (request, response) => { 
    const { id } = request.params;
    const { title, owner} = request.body;
    
    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.' })
    }
    
    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(project); 
});

app.delete('/projects/:id', (request, response) => { 
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.' })
    }
    
    projects.splice(projectIndex, 1);
    return response.status(204).send(); 
});

app.listen(3333, () => {
    console.log('Back-end started!');
});