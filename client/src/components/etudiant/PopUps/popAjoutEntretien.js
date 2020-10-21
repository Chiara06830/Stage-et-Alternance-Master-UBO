import React from 'react';
import UsePopup from '../../../PopUp';

class PopAjoutEntretien extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            intervenants : [],
            nbIntervenant : 0,
            nomIntervenant : "",
            prenomIntervenant : "",
            fonctionIntervenant : "",
            entrepriseIntervenant : ""
        }
    }

    //------------- Sauvegarde des données -------------//

    toggleCheckbox(event){}
    sauvNomIntervenant(event){}
    sauvPrenomIntervenant(event){}
    sauvFonctionIntervenant(event){}
    sauvEntrepriseIntervenant(event){}

    //------------- Envoie des données -------------//

    handleEntretien(){

    }
    
    //------------- Fonction utilitaires -------------//

    ajoutIntervenant(){
        console.log("pouet");
        console.log(document.getElementById("intervenant"));
        const inter = 
        <form>
            <input type="text" placeholder="Nom de l'intervenant" value={this.state.nomIntervenant} onChange={this.sauvNomIntervenant}/>
            <input type="text" placeholder="Prénom de l'intervenant" value={this.state.prenomIntervenant} onChange={this.sauvPrenomIntervenant}/>
            <input type="text" placeholder="Fonction de l'intervenant" value={this.state.fonctionIntervenant} onChange={this.sauvFonctionIntervenant}/>
            <input type="text" placeholder="Entreprise" value={this.state.entrepriseIntervenant} onChange={this.sauvEntrepriseIntervenant}/>
        </form>
    }

    //------------- Rendu -------------//

    render(){
        const contenu = 
            <form onSubmit={this.handleEntretien}>
                <p>Entretien personel <input type="checkbox" id="personel" value="1"/></p> 
                <p>Est annulé <input type="checkbox" id="personel" value="1"/></p>
                <p>Date de l'entretien <input type="date" id="dateEntretien"/></p>
                <p>Entretien avec candidature <input type="checkbox"/> Entretien sans candidature <input type="checkbox"/></p> 
                <button type="button" onClick={this.ajoutIntervenant()}>Ajouter un intervenant</button>
                <div id="intervenant"></div>
                <button type="submit">Valider</button>
            </form>
        return <UsePopup text='Ajouter un entretien' contenu={contenu}/>
    }
}

export default PopAjoutEntretien;