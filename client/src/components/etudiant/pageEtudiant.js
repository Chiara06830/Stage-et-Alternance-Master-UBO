import React, {Component} from 'react';
import Info from "./infosEtudiant";
import TableauBord from "./boardEtudiant";
import "../../general.css";
import "./etudiant.css";

class Etudiant extends Component {
    deconnecter(){

    }
    
    render(){
        return(
            <div>
                <Info />
                <TableauBord />
                <button type="button" onClick={() => this.deconnecter()}>
                    <img src="/img/deco.png" alt="bouton modifier" width="20" height="20"/>
                </button>
            </div>
        );
    }
}

export default Etudiant;