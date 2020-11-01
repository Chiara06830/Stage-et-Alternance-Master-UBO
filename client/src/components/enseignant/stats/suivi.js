import React, {Component} from 'react';

class SuiviEtudiant extends Component{
    render(){
        if(this.props.admin){
            return(
                <div>
                    <p>pouep</p>
                    <button>Paramètre</button>
                </div>
            );
        }else {
            return(
                <p>pouep</p>
            );
        }
    }
}

export default SuiviEtudiant;