import React, {Component} from 'react';
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

    handleCandidature(){

    }

    render(){
        const contenu = 
                <form onSubmit={this.handleCandidature}>
                    <p>Entreprise :<br/>
                        <input type="text" value={this.state.entrepriseCandidature} onChange={() => this.sauvEntrepriseCandidature}/> <br/>
                        <a href="google.com">Si l'entreprise n'existe pas, ajouter l'entreprise</a>
                    </p>
                    <p>Origine de l'offre :<br/>
                        <form>
                            <select>
                                <option>Carrier center</option>
                                <option>Site web</option>
                                <option>Autre</option>
                            </select>
                        </form>
                    </p>
                    <p>Si autre, précisez :<br/>
                        <input type="text" value={this.state.sourceCandidature} onChange={() => this.sauvSourceCandidature()}/><br/>
                    </p><br/>
                    <button type="submit">Valider</button>
                </form>
        return <UsePopup text='Créer une candidature' contenu={contenu}/>
    }
}

export default PopAjoutCandidature;