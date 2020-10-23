import React from 'react';
import "../general.css";
import "../components/etudiant/etudiant.css";

class Tableau extends React.Component{
    constructor(props){
        super(props);
        this.nbCol = 0;
        this.state = {
            contenu : []
        }
    }

    createRows(){
        let infos = "";
        for(let j=0; j<this.state.contenu.length; j++){
            infos+="<tr>";
            for(let i=0; i<this.nbCol-2; i++){
                infos += "<td>" + this.state.contenu[j][i] +" </td>";
            }
            infos += "<td style=\"text-align: center\"/> <img src=\"/img/crayon_376363.png\" alt=\"bouton modifier\" width=\"20\" height=\"20\" onClick={}>";
            infos += "<td style=\"text-align: center\"/> <img src=\"/img/csm_Accroche_dechets_menagers_28360027d4.png\" alt=\"bouton modifier\" width=\"20\" height=\"20\">";
            infos+="</tr>";
        }
        
        return <tbody dangerouslySetInnerHTML={{ __html: infos }}/>;
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
                <thead>
                    {this.createTable(this.props.nbColonne, this.props.nomColonne, this.props.fetch)}
                </thead>
                    {this.createRows()}
            </table>
        );
    }
}

export default Tableau;