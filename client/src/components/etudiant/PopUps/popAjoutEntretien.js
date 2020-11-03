import React, {Component} from 'react';
import UsePopup from '../../../utilitaires/PopUp';

class PopAjoutEntretien extends Component {
    constructor(props){
        super(props);
        this.nbIntervenant = 0;
    }

    //------------- Fonction utilitaires -------------//
    ajoutIntervenant(){
        this.nbIntervenant ++;
        this.afficherIntervenant();
    }

    suppIntervenant(){
        if(this.nbIntervenant>0){
            this.nbIntervenant--;
            this.afficherIntervenant();
        }
    }

    afficherIntervenant(){
        let inter = "";

        for(let i=0; i<this.nbIntervenant; i++){
            inter +=
            "<div>\
                <p>Intervenant n° " + (i+1)  + " :</p>\
                <input type=\"text\" placeholder=\"Nom de l'intervenant\" name=\"nom_intervenant_" + i + "\"/>\
                <input type=\"text\" placeholder=\"Prénom de l'intervenant\" name=\"prenom_intervenant_" + i + "\"/>\
                <input type=\"text\" placeholder=\"Fonction de l'intervenant\" name=\"fonction_intervenant_" + i + "\"/>\
                <input type=\"text\" placeholder=\"Entreprise\" name=\"entreprise_intervenant_" + i + "\"/>\
            </div>";
        }
        document.getElementById("intervenant").innerHTML = inter;
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
                <button type="button" onClick={() => this.ajoutIntervenant()}>Ajouter un intervenant</button>
                <button type="button" onClick={() => this.suppIntervenant()}>Supprimer un intervenant</button><br/>
                <div id="intervenant"></div><br/>
                <button type="submit">Valider</button>
            </form>
        return <UsePopup text='Ajouter un entretien' contenu={contenu} class="btnPlus" bouton="+"/>
    }
}

export default PopAjoutEntretien;