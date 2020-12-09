import React, {Component} from 'react';
import UsePopup from '../../../utilitaires/PopUp';
import axios from 'axios';

class PopAjoutEntretien extends Component {
    constructor(props){
        super(props);
        this.nbIntervenant = 0;
        this.state = {
            date : "",
            nom : [],
            prenom : [],
            fonction : [],
            entreprise : []
        }
    }

    //------------- Sauvegarde des données -------------//
    sauvDate(event){this.setState({date : event.target.value})}
    sauvNom(event, i){
        let sauv = this.state.nom;
        sauv[i] = event.target.value;
        this.setState({nom : sauv});
    }
    sauvPrenom(event, i){
        let sauv = this.state.prenom;
        sauv[i] = event.target.value;
        this.setState({prenom : sauv});
    }
    sauvFonction(event, i){
        let sauv = this.state.fonction;
        sauv[i] = event.target.value;
        this.setState({fonction : sauv});
    }
    sauvEntreprise(event, i){
        console.log("--" + i);
        let sauv = this.state.entreprise;
        sauv[i] = event.target.value;
        this.setState({entreprise : sauv});
    }

    //------------- Fonction utilitaires -------------//
    ajoutIntervenant(){
        //initialisation des données du nouvel intervenant
        this.state.nom.length = this.state.nom.length + 1;
        this.state.nom[this.state.nom.length-1] = '';
        this.state.prenom.length = this.state.prenom.length + 1;
        this.state.prenom[this.state.prenom.length-1] = '';
        this.state.fonction.length = this.state.fonction.length + 1;
        this.state.fonction[this.state.fonction.length-1] = '';
        this.state.entreprise.length = this.state.entreprise.length + 1;
        this.state.entreprise[this.state.entreprise.length-1] = '';
        this.nbIntervenant ++;
        this.afficherIntervenant();
    }

    suppIntervenant(){
        if(this.nbIntervenant>0){
            //initialisation des données du nouvel intervenant
            this.state.nom.length = this.state.nom.length - 1;
            this.state.prenom.length = this.state.prenom.length - 1;
            this.state.fonction.length = this.state.fonction.length - 1;
            this.state.entreprise.length = this.state.entreprise.length - 1;
            this.nbIntervenant--;
            this.afficherIntervenant();
        }
    }

    attribuerSauv(){
        let input = document.getElementsByName("intervenant");
        for(let i=0; i<input.length; i = i+4){
            let ligne = i/4;
            input[i].onchange = (event) => this.sauvEntreprise(event, ligne);
        }
    }

    afficherIntervenant(){
        let inter = "";

        for(let i=0; i<this.nbIntervenant; i++){
            inter +=
            "<div>\
                <p>Intervenant n° " + (i+1)  + " :</p>\
                <input type=\"text\" placeholder=\"Nom de l'intervenant\" value=\"" + this.state.nom[i] + "\" name=\"intervenant\">\
                <input type=\"text\" placeholder=\"Prénom de l'intervenant\" value=\"" + this.state.prenom[i] + "\" name=\"intervenant\"/>\
                <input type=\"text\" placeholder=\"Fonction de l'intervenant\" value=\"" + this.state.fonction[i] + "\" name=\"intervenant\"/>\
                <input type=\"text\" placeholder=\"Entreprise\" value=\"" + this.state.entreprise[i] + "\" name=\"intervenant\"/>\
            </div>";
        }
        document.getElementById("intervenant").innerHTML = inter;
        this.attribuerSauv();
    }

    //------------- Envoie des données -------------//

    handleSubmit = (e) => {
        e.preventDefault();

        //radio bouton avec ou sans candidature
        let type;
        let types = document.getElementsByName("type");
        for(let i=0; i<types.length; i++){
            if(types[i].checked){
                type = types[i].id
            }
        }

        //checkbox annulé
        let check = document.getElementById("annule").checked ? 1 : 0
        //checkbox perso
        let perso= document.getElementById("perso").checked ? 1 : 0

        const entretien = {
            date : this.state.date,
            candidature : type,
            annule : check,
            perso : perso,
            nom : this.state.nom,
            prenom : this.state.prenom,
            fonction : this.state.fonction,
            entreprise : this.state.entreprise
        };

        console.log(entretien);
        axios.post("http://localhost:7146/api/etudiant/entretien", {entretien})
            .catch(err =>{
                if(err) throw err;
            });
    }

    //------------- Rendu -------------//

    render(){
        const contenu = 
            <form>
                <p>Entretien personel <input type="checkbox" id="perso"/><br/>
                Est annulé <input type="checkbox" id="annule"/></p>
                <p>Date de l'entretien :<br/> <input type="date" value={this.state.date} onChange={(event) => this.sauvDate(event)}/></p>
                <p>Entretien: <br/>
                    <input type="radio" id="avec" name="type"/> <label htmlFor="avec">avec candidature</label> <br/>
                    <input type="radio" id="sans" name="type"/> <label htmlFor="sans">sans candidature</label>
                </p> 
                <button type="button" onClick={() => this.ajoutIntervenant()}>Ajouter un intervenant</button>
                <button type="button" onClick={() => this.suppIntervenant()}>Supprimer un intervenant</button><br/>
                <div id="intervenant"></div><br/>
                <button type="button" onClick={this.handleSubmit}>Valider</button>
            </form>
        return <UsePopup text='Ajouter un entretien' contenu={contenu} class={this.props.class} bouton={this.props.bouton}/>
    }
}

export default PopAjoutEntretien;