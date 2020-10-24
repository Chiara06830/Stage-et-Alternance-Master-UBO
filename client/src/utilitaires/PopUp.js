import './popup.css'
import React, {Component} from 'react';

class Popup extends Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h3>{this.props.text}</h3>
                    <div>{this.props.contenu}</div>
                    <span className="close-icon" onClick={this.props.closePopup}>x</span>
                </div>
            </div>
        );
    }
}

class UsePopup extends Component {
    constructor(props){
    super(props);
    this.state = { showPopup: false };
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render() {
        return (
            <div>
                <button className="btnPlus" onClick={this.togglePopup.bind(this)}>+</button>
        
                {this.state.showPopup ?
                    <Popup text={this.props.text} contenu = {this.props.contenu} closePopup={this.togglePopup.bind(this)} />
                    : null
                }
            </div>
        );
    }
}

export default UsePopup;