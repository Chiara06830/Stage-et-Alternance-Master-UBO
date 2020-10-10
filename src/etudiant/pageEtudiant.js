import React from 'react';
import Info from "./infos";
import TableauBord from "./tableauDeBord";
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