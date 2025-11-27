import React from "react";
import "./modal.css";

export default function Modal({open, onClose, OnConfirm}){
    
    if(!open) return null;
    
    return(
        <div className="body-modal">
            <div className="modal">
                <h3>Tem certeza que deseja excluir o produto?</h3>

                <div className="button-style">
                    <button onClick={OnConfirm} className="yesBtn">Sim</button>
                    <button onClick={onClose} className="noBtn">Não</button>
                </div>
            </div>
        </div>
    );
}