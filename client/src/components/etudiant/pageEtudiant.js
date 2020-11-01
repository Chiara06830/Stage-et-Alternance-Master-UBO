import React, {Component} from 'react';
import Info from "./infosEtudiant";
import TableauBord from "./boardEtudiant";
import "../../general.css";
import "./etudiant.css";
import Connexion from "../../index";

class Etudiant extends Component {
    constructor(props){
        super(props);
        this.state = {
            page : 1
        }
    }
    deconnecter(){
        fetch('http://localhost:7146/login')
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    page: data['page']
                });
            })
            .catch(error => this.setState({ error}));
    }
    
    render(){
        if(this.state.page == 1){
            return(
                <div>
                    <Info />
                    <form className="deconnexion" action="http://localhost:7146/retourLogin" method="POST">
                        <label>Se déconnecter : </label>
                        <button type="submit" onClick={() => this.deconnecter()}>
                            <img src="/img/deco.png" alt="bouton modifier" width="20" height="20"/>
                        </button>
                    </form>
                    <TableauBord />
                    
                </div>
            );
        }else{
            return(<Connexion />);
        }
    }
}

export default Etudiant;