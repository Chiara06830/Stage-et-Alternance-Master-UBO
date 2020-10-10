import React from 'react';

/*const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'obiwan2.univ-brest.fr/adminbdd/', 
    user:'zrelevach', 
    password: 'tq494ej8',
    connectionLimit: 5
});*/

class Connexion extends React.Component {
    render() {
        return (
            <div>
                <h1>Connexion</h1>
                <form>
                    <input type="text" id="fname" name="fname" value="Identifiant"/><br/>
                    <input type="text" id="lname" name="lname" value="Mot de passe"/><br/>
                    <button type="button" onClick={this.props.onClick} >Se connecter</button><br/>
                    <a href="">Mot de passe oublié</a><br/>
                    <p>Vous n'êtes pas encore inscrit ?</p>
                    <a href="">S'inscrire</a>
                </form>
            </div>
            
        );
    }
}

export default Connexion;