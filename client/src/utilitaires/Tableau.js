import React, {Component} from 'react';
import "../general.css";
import "../components/etudiant/etudiant.css";

class Tableau extends Component{
    constructor(props){
        super(props);
        this.state = {
            contenu : []
        }
    }

    //-----------recupère les infos du backend-----------
    componentDidMount(){
        this.fetchContenu();
    }

    fetchContenu(){
        const chemin = this.props.chemin + `?id=${this.props.getIdUtilisateur}`
        fetch(chemin)
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    contenu: data 
                });
            })
            .catch(error => this.setState({error}));
    }

    //-----------creer les lignes du tableau en fonction de contenu-----------
    //Il faut que les noms de colonnes du contenu soit les meme que celles passé en paramètre
    createRows(){
        let infos = "";
        for(let j=0; j<Object.keys(this.state.contenu).length; j++){
            infos+="<tr>";
            for(let i=0; i<this.props.nbColonne; i++){
                if(this.props.nomColonne[i] === "CV" || this.props.nomColonne[i] === "Lettre" || this.props.nomColonne[i] === "Document"){
                    //envoie sur le lien du pdf
                    infos += "<td style=\"text-align: center\"/>\
                    <a target=\"_blank\" className=\"transparent\" class=\"voir\" href=\"" + this.state.contenu["" + j][this.props.nomColonne[i]] + "\">\
                        <img id=\"vue\" src=\"/img/eye-2387853_960_720.webp\" alt=\"bouton voir\" width=\"30\" height=\"30\">\
                    </a>";
                }else if(this.props.nomColonne[i] === "Traiter" || this.props.nomColonne[i] === "Modifier"){
                    //ouvre la popup du tableau
                    infos += "<td style=\"text-align: center\"/>\
                        <div class=\"modifier\"></div>";
                }else if(this.props.nomColonne[i] === "Supprimer"){
                    //bouton qui envoie l'id de la ligne au back end pour ensuite la supprimer de la BDD
                    infos += "<td style=\"text-align: center\"/> \
                        <form action=\"" + this.props.post + "\" method=\"POST\">\
                            <button style=\"background: none; border: none;\" class=\"jeter\" type=\"submit\">\
                                <input style=\"visibility: hidden; width:0; height:0\" name=\"id\" value=\"" + this.state.contenu[j]["id"] + "\"/>\
                                <img src=\"/img/csm_Accroche_dechets_menagers_28360027d4.png\" alt=\"bouton modifier\" width=\"20\" height=\"20\">\
                            </button>\
                        </form>";
                }else{
                    //remplie la case avec l'info de contenu
                    infos += "<td>" + this.state.contenu[j][this.props.nomColonne[i]] +" </td>" ;
                }
            }
            infos+="</tr>";
        }
        
        return <tbody dangerouslySetInnerHTML={{ __html: infos }}/>;
    }

    ajoutPopModif(){
        const cases = document.getElementsByClassName("modifier");
        for(let i=0; i<cases.length; i++){
            cases[i].innerHTML = this.props.pop;
        }
    }

    //-----------Créer l'entête de la table-----------
    createTable(){
        let col = "";
        for(let i=0; i<this.props.nbColonne; i++){
            let nom = this.props.nomColonne[i];
            col += "<th>" + nom + "</th>";
        }
        return <tr className="titre" dangerouslySetInnerHTML={{ __html: col }}/>;
    }

    render(){
        return(
            <table>
                <thead>
                    {this.createTable()}
                </thead>
                    {this.createRows()}
                    {this.ajoutPopModif()}
            </table>
        );
    }
}

export default Tableau;