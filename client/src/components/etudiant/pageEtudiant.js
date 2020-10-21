import React from 'react';
import Info from "./infosEtudiant";
import TableauBord from "./boardEtudiant";
import "../../general.css";
import "./etudiant.css";

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