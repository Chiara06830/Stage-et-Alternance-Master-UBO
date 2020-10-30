import React, {Component} from 'react';

class Onglet extends Component{
    constructor(props){
        super(props);
        this.noms = [];
        this.contenu = [];
        this.state = {
            numActive : 0
        }
    }

    changeNum(i){
        this.setState({numActive : i});
    }

    creerFonction(){
        const lignes = document.getElementsByClassName("ligne");
        for(let i=0; i<lignes.length; i++){
            lignes[i].onclick = () => this.changeNum(i);
        }
    }

    createOnglet(noms, contenus){
        console.log(this.state.numActive);
        this.noms = noms;
        this.contenu = contenus;


        let lignes = "";
        for(let i=0; i<this.noms.length; i++){
            if(i === this.state.numActive){
                lignes += "<li class=\"active ligne\"><button type=\"button\" onlick=\"() => changeNum(" + i + ")\">" + this.noms[i] + "</button></li>";
            }else{
                lignes += "<li class=\"ligne\"><button type=\"button\"  onlick=\"() => changeNum(" + i + ")\">" + this.noms[i] + "</button></li>";
            }
        }
        
        return(<ul id="onglets" dangerouslySetInnerHTML={{ __html: lignes }}/>);
    }

    afficherContenu(){
        return(
            <div className="stats">
                {this.contenu[this.state.numActive]}
            </div>
        );
    }

    render(){
        return(
            <div id="menu">
                {this.createOnglet(this.props.noms, this.props.contenus)}
                {this.afficherContenu()}
                {this.creerFonction()}
            </div>
        );
    }
}

export default Onglet;