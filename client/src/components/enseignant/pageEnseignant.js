import React, {Component} from 'react';
import "../../general.css";
import Info from "./infoEnseignant";
import TableauBord from "./boardEnseignant";

class Enseignant extends Component {
    render(){
        return(
            <div>
                <Info admin={false} chargerEtat={this.props.chargerEtat} getIdUtilisateur={this.props.getIdUtilisateur}/>
                <TableauBord admin={false} chargerEtat={this.props.chargerEtat} getIdUtilisateur={this.props.getIdUtilisateur}/>
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

export default Enseignant;