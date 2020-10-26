import React,{Component} from 'react';
import axios from 'axios';
import './style.css'
import UsePopup from '../../../utilitaires/PopUp';

class PopAjoutCV extends Component {
    constructor(props){
        super(props);
        this.state = {
            lettre : "",
            nomFichier: "C://"
        }
    }

    //------------- Sauvegarde des données -------------//

    sauvLettre(event){
        this.setState({cv: event.target.files[0]});
        this.setState({nomFichier: event.target.files[0].name});
    }

    //------------- Envoie des données -------------//

    async handleLettre(event){
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", this.state.lettre);

        try{
            const res = await axios.post('http://localhost:7146/upload/etudiant/cv', formData, {
                headers: {
                    'Content-Type': 'multipart/from-data'
                }
            });

            const {fileName, filePath} = res.data;
            //setUploadedFile({fileName, filePath});
        }catch(err){
            if(err.response.status === 500){
                console.log('There wes a problem with the server');
            }else {
                console.log(err.response.data.msg);
            }
        }
    }

    //------------- Rendu -------------//

    render(){
        const contenu = 
            <div>
                <form onSubmit = {(event) => this.handleLettre(event)}>
                    <div className="custom-file mb-4">
                        <input type="file" className="custom-file-input" id="customFile" onChange={(event) => this.sauvLettre(event)}/>
                        <label className="custom-file-label" htmlFor="customFile">{this.state.nomFichier}</label>
                    </div>
                    <p>Seul le format pdf est accepté</p>
                    <input type="submit" value="Valider" ></input>
                </form>
                
            </div>
            return <UsePopup text='Déposer une lettre de motivation' contenu = {contenu}/>;
        } 
}

export default PopAjoutCV;