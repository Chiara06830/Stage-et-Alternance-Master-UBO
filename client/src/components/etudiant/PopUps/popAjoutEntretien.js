import React, {Component} from 'react';
import UsePopup from '../../../utilitaires/PopUp';

class PopAjoutEntretien extends Component {
    constructor(props){
        super(props);
        this.state = {
            nbIntervenant : 0,
            nomIntervenant : [],
            prenomIntervenant : [],
            fonctionIntervenant : [],
            entrepriseIntervenant : []
        }
    }

    //------------- Sauvegarde des données -------------//

    sauvNomIntervenant(event){this.setState({nomIntervenant: event.target.value});}
    sauvPrenomIntervenant(event){this.setState({prenomIntervenant: event.target.value});}
    sauvFonctionIntervenant(event){this.setState({fonctionIntervenant: event.target.value});}
    sauvEntrepriseIntervenant(event){this.setState({entrepriseIntervenant: event.target.value});}

    //------------- Envoie des données -------------//

    handleEntretien(){

    }
    
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
            <form onSubmit={() => this.handleEntretien}>
                <p>Entretien personel <input type="checkbox" id="personel" value="1"/><br/>
                Est annulé <input type="checkbox" id="personel" value="1"/></p>
                <p>Date de l'entretien<br/> <input type="date" id="dateEntretien"/></p>
                <p>Entretien avec candidature <input type="checkbox"/>
                Entretien sans candidature <input type="checkbox"/></p> 
                <button type="button" onClick={() => this.ajoutIntervenant()}>Ajouter un intervenant</button><br/>
                <div id="intervenant"></div><br/>
                <button type="submit">Valider</button>
            </form>
        return <UsePopup text='Ajouter un entretien' contenu={contenu}/>
    }
}

export default PopAjoutEntretien;