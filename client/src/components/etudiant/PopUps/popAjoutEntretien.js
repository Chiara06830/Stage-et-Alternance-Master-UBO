import React, {Component} from 'react';
import UsePopup from '../../../utilitaires/PopUp';

class PopAjoutEntretien extends Component {
    //------------- Fonction utilitaires -------------//

    ajoutIntervenant(){
        const inter = 
        <form>
            <input type="text" placeholder="Nom de l'intervenant" value={this.state.nomIntervenant} onChange={(event) => this.sauvNomIntervenant(event)}/>
            <input type="text" placeholder="Prénom de l'intervenant" value={this.state.prenomIntervenant} onChange={(event) => this.sauvPrenomIntervenant(event)}/>
            <input type="text" placeholder="Fonction de l'intervenant" value={this.state.fonctionIntervenant} onChange={(event) => this.sauvFonctionIntervenant(event)}/>
            <input type="text" placeholder="Entreprise" value={this.state.entrepriseIntervenant} onChange={(event) => this.sauvEntrepriseIntervenant(event)}/>
        </form>
    }

    //------------- Rendu -------------//

    render(){
        const contenu = 
            <form action="http://localhost:7146/api/etudiant/entretien" method="POST">
                <p>Entretien personel <input type="checkbox" name="perso"/><br/>
                Est annulé <input type="checkbox" name="annule"/></p>
                <p>Date de l'entretien :<br/> <input type="date" name="date"/></p>
                <p>Entretien: <br/>
                    <input type="radio" id="avec" name="candidature"/> <label htmlFor="avec">avec candidature</label> <br/>
                    <input type="radio" id="sans" name="candidature"/> <label htmlFor="avec">sans candidature</label>
                </p> 
                <button type="button" onClick={() => this.ajoutIntervenant()}>Ajouter un intervenant</button><br/>
                <div id="intervenant"></div><br/>
                <button type="submit">Valider</button>
            </form>
        return <UsePopup text='Ajouter un entretien' contenu={contenu} class="btnPlus" bouton="+"/>
    }
}

export default PopAjoutEntretien;