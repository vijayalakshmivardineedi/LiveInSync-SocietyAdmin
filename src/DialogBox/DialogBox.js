import React from 'react';

const Dialog = ({ message, showDialog, onClose }) => {
    if (!showDialog) return null;

    const dialogStyle = {
        backgroundColor: "#630000",
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        textAlign: 'center',
        zIndex: 1001 // Ensure it's above the overlay
    };

    const overlayStyle = {
        position: 'absolute',
        top: "20%",
        left: "40%",
        backgroundColor: 'White',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={dialogStyle} onClick={(e) => e.stopPropagation()}>
                <p style={{color:"white"}}>{message}</p>
                <button  onClick={onClose} style={{ padding: '10px 20px', marginTop: '10px', cursor: 'pointer', backgroundColor: "white", color:"#630000" }}>Close</button>
            </div>
        </div>
    );
};

export default Dialog;
