import React, {Component} from 'react';
import "../../general.css";
import Info from "../enseignant/infoEnseignant";
import TableauBord from "../enseignant/boardEnseignant";

class Admin extends Component {
    constructor(props){
        super(props);
        this.state = {
            page : 4
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
        return(
            <div>
                <Info admin={true}/>
                <form className="deconnexion" action="http://localhost:7146/retourLogin" method="POST">
                    <label>Se déconnecter : </label>
                    <button type="submit" onClick={() => this.deconnecter()}>
                        <img src="/img/deco.png" alt="bouton modifier" width="20" height="20"/>
                    </button>
                </form>
                <TableauBord admin={true}/>
            </div>
        );
    }
}

export default Admin;