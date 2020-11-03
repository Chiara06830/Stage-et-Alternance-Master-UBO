import React, {Component} from 'react';
import UsePopup from '../../../utilitaires/PopUp';

class PopAjoutCandidature extends Component {
    render(){
        const contenu = 
                <form action="http://localhost:7146/api/etudiant/candidature" method="POST">
                    <p>Entreprise :<br/>
                        <input type="text" name="entreprise"/> <br/>
                        <a href="google.com">Si l'entreprise n'existe pas, ajouter l'entreprise</a>
                    </p>
                    <p>Origine de l'offre :<br/>
                        <select name="origine">
                            <option>Carrier center</option>
                            <option>Site web</option>
                            <option>Autre</option>
                        </select>
                    </p>
                    <p>Si autre, précisez :<br/>
                        <input type="text" name="orgine_autre"/><br/>
                    </p><br/>
                    <button type="submit">Valider</button>
                </form>
        return <UsePopup text='Créer une candidature' contenu={contenu} class={this.props.class} bouton={this.props.bouton}/>
    }
}

export default PopAjoutCandidature;