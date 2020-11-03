import React, {Component} from 'react';
import "../general.css";
import "../components/etudiant/etudiant.css";

class Tableau extends Component{
    constructor(props){
        super(props);
        this.nbCol = 0;
        this.chemin = "";
        this.nomColonne = [];
        this.state = {
            contenu : []
        }
    }

    //-----------recupère les infos du backend-----------
    componentDidMount(){
        this.fetchContenu();
    }

    fetchContenu(){
        fetch(this.chemin)
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    contenu: data 
                });
                console.log("Tableau : ", data);
            })
            .catch(error => this.setState({error}));
    }

    //-----------creer les lignes du tableau en fonction de contenu-----------
    //Il faut que les noms de colonnes du contenu soit les meme que celles passé en paramètre
    createRows(){
        let infos = "";
        for(let j=0; j<Object.keys(this.state.contenu).length; j++){
            infos+="<tr>";
            for(let i=0; i<this.nbCol; i++){
                if(this.nomColonne[i] == "CV" || this.nomColonne[i] == "Lettre" || this.nomColonne[i] == "Document"){
                    console.log("passage");
                    infos += "<td style=\"text-align: center\"/>\
                    <button className=\"transparent\" id=\"modifier\" type=\"button\">\
                        <img id=\"vue\" src=\"/img/eye-2387853_960_720.webp\" alt=\"bouton voir\" width=\"30\" height=\"30\">\
                    </button>";
                }else if(this.nomColonne[i] == "Traiter" || this.nomColonne[i] == "Modifier"){
                    infos += "<td style=\"text-align: center\"/>\
                    <button className=\"transparent\" id=\"modifier\" type=\"button\">\
                        <img src=\"/img/crayon_376363.png\" alt=\"bouton modifier\" width=\"20\" height=\"20\">\
                    </button>";
                }else if(this.nomColonne[i] == "Supprimer"){
                    infos += "<td style=\"text-align: center\"/> \
                        <button className=\"transparent\" id=\"jeter\" type=\"button\">\
                            <img src=\"/img/csm_Accroche_dechets_menagers_28360027d4.png\" alt=\"bouton modifier\" width=\"20\" height=\"20\">\
                        </button>";
                }else{
                   infos += "<td>" + this.state.contenu[j][this.nomColonne[i]] +" </td>" ;
                }
            }
            infos+="</tr>";
        }
        
        return <tbody dangerouslySetInnerHTML={{ __html: infos }}/>;
    }

    //-----------Créer l'entête de la table-----------
    createTable(chemin, nbColonne, tab){
        let col = "";
        this.nbCol = nbColonne;
        this.chemin = chemin;
        this.nomColonne = tab;
        for(let i=0; i<nbColonne; i++){
            let nom = tab[i];
            col += "<th>" + nom + "</th>";
        }
        return <tr className="titre" dangerouslySetInnerHTML={{ __html: col }}/>;
    }

    render(){
        return(
            <table>
                <thead>
                    {this.createTable(this.props.chemin, this.props.nbColonne, this.props.nomColonne)}
                </thead>
                    {this.createRows()}
            </table>
        );
    }
}

export default Tableau;