import React from 'react';
import Info from "./infosEtudiant";
import TableauBord from "./boardEtudiant";
import "../style/general.css";
import "../style/etudiant.css";

class Etudiant extends React.Component {
    render(){
        return(
            <div>
                <Info />
                <TableauBord />
            </div>
        );
    }
}

export default Etudiant;