import React from 'react';
import "./general.css";
import "./components/etudiant/etudiant.css";

class Tableau extends React.Component{
    constructor(props){
        super(props);
        this.nbCol = 0;
    }
    createRow(){
        let infos = "";
        for(let i=0; i<this.nbCol-2; i++){
            infos += "<td> </td>";
        }
        infos += "<td style=\"text-align: center\"/> <img src=\"/img/crayon_376363.png\" alt=\"bouton modifier\" width=\"20\" height=\"20\">";
        infos += "<td style=\"text-align: center\"/> <img src=\"/img/csm_Accroche_dechets_menagers_28360027d4.png\" alt=\"bouton modifier\" width=\"20\" height=\"20\">";
        return <tr dangerouslySetInnerHTML={{ __html: infos }}/>;
    }

    createTable(nbColonne, tab){
        let col = "";
        this.nbCol = nbColonne;
        for(let i=0; i<nbColonne; i++){
            let nom = tab[i];
            col += "<th>" + nom + "</th>";
        }

        return <tr className="titre" dangerouslySetInnerHTML={{ __html: col }}/>;
    }

    render(){
        return(
            <table>
                {this.createTable(this.props.nbColonne, this.props.nomColonne)}
                {this.createRow()}
            </table>
        );
    }
}

export default Tableau;