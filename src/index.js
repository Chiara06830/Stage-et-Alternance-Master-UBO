import React from 'react';
import ReactDOM from 'react-dom';
import Connexion from './View/connexion.js';
import TableauEtudiant from"./View/pageEtudiant.js";

class Page extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pages : [<Connexion onClick={() => this.changerPage(1)}/>, 
            <TableauEtudiant />],
            pageActuel : 1
        };
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
