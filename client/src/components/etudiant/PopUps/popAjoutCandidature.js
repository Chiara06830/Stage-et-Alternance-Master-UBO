import React, {Component} from 'react';
import axios from 'axios';
import UsePopup from '../../../utilitaires/PopUp';

class PopAjoutCandidature extends Component {
    constructor(props){
        super(props);
        this.state = {
            entrepriseCandidature : "",
            sourceCandidature : "",
        }
    }

    //------------- Sauvegarde des données -------------//

    sauvEntrepriseCandidature(event){this.setState({entrepriseCandidature : event.target.value})}
    sauvSourceCandidature(event){this.setState({sourceCandidature : event.target.value})}

    //------------- Envoie des données -------------//

    async handleCandidature(event){
        event.preventDefault();

        const data = JSON.stringify(this.state);

        try{
            await axios.post('http://localhost:7146/api/etudiant/candidature', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }catch(err){
            if(err.response.status === 500){
                alert('There was a problem with the server');
            }else {
                alert(err.response.data.msg);
            }
        }
    }

    render(){
        const contenu = 
                <form onSubmit={(event) => this.handleCandidature(event)}>
                    <p>Entreprise :<br/>
                        <input type="text" value={this.state.entrepriseCandidature} onChange={(event) => this.sauvEntrepriseCandidature(event)}/> <br/>
                        <a href="google.com">Si l'entreprise n'existe pas, ajouter l'entreprise</a>
                    </p>
                    <p>Origine de l'offre :<br/>
                            <select>
                                <option>Carrier center</option>
                                <option>Site web</option>
                                <option>Autre</option>
                            </select>
                    </p>
                    <p>Si autre, précisez :<br/>
                        <input type="text" value={this.state.sourceCandidature} onChange={(event) => this.sauvSourceCandidature(event)}/><br/>
                    </p><br/>
                    <button type="submit">Valider</button>
                </form>
        return <UsePopup text='Créer une candidature' contenu={contenu}/>
    }
}

export default PopAjoutCandidature;