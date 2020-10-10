import React from 'react';
import ReactDOM from 'react-dom';
import "./style/general.css";
import Connexion from './connexion.js';
import Etudiant from"./etudiant/pageEtudiant.js";

class Page extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pages : [<Connexion onClick={() => this.chargerCompte()}/>, 
            <Etudiant />],
            pageActuel : 1
        };
    }

    chargerCompte(){
        this.changerPage(1);
    }

    changerPage(i){
        this.setState({pageActuel : i});
    }

    getCurrentPage(){
        return this.state.pages[this.state.pageActuel];
    }

    render(){
        return(
            <div>
                {this.getCurrentPage()}
            </div>
        );
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('root')
);
