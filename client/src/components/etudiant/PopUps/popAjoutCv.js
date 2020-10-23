import React from 'react';
import './style.css'
import UsePopup from '../../../utilitaires/PopUp';

class PopAjoutCV extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cv : ""
        }
    }

    //------------- Sauvegarde des données -------------//

    sauvCV(event){
        //this.setState({cv: event.target.value});
    }

    //------------- Envoie des données -------------//

    handleCv(){
        
    }

    //------------- Fonction utilitaires -------------//

    searchFile(){
        console.log("Recupération du CV");
    }

    //------------- Rendu -------------//

    render(){
        const contenu = 
            <div>
                <form onSubmit={this.handleCv}>
                    <input type="text" placeholder="C://" value={this.state.cv} onChange={this.sauvCV}/>
                    <button className="parcour" type="button" onClick={() => this.searchFile()}>Parcourir</button><br/>
                    <p className="soustexte">Seul le format pdf est accepté</p>
                    <button type="submit">valider</button>
                </form>
                
            </div>
            return <UsePopup text='Déposer un CV' contenu = {contenu}/>;
                
        } 
}

export default PopAjoutCV;