const express = require('express');
const app = express();
const port = 5000;

app.get('/api/etudiants', (req, res) => {
    const etudiants = [
        {id : 1, nom : 'Jean', prenom : 'Dupont'},
        {id : 2, nom : 'Jhon', prenom : 'Travolta'},
        {id : 3, nom : 'Brad', prenom : 'Pitt'}
    ];

    res.json(etudiants);
});

app.listen(port, () =>{
    console.log(`Server demarrer sur le port ${port}`);
});