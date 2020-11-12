import React, {Component} from 'react';
import "../../general.css";
import Info from "../enseignant/infoEnseignant";
import TableauBord from "../enseignant/boardEnseignant";

class Admin extends Component {
    render(){
        return(
            <div>
                <Info admin={true} chargerEtat={this.props.chargerEtat}/>
                <TableauBord admin={true} chargerEtat={this.props.chargerEtat}/>
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

export default Admin;