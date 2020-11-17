import React, {Component} from 'react';
import Info from "./infosEtudiant";
import TableauBord from "./boardEtudiant";
import "../../general.css";
import "./etudiant.css";

export default class Etudiant extends Component {
    
    render(){
        return(
            <div >
                <Info chargerEtat={this.props.chargerEtat} getIdUtilisateur={this.props.getIdUtilisateur}/>
                <TableauBord chargerEtat={this.props.chargerEtat}/>
                <div className="deconnexion">
                <label>Se déconnecter : </label>
                    <button type="submit" onClick={() => this.props.chargerEtat(0)}>
                        <img src="/img/deco.png" alt="bouton modifier" width="20" height="20"/>
                    </button>
                </div>
            </div>
        );
    }
}