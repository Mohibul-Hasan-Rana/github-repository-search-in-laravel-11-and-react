import React, { useState } from 'react';

// Modal Component
const Modal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
                <h3 className="text-xl font-bold mb-4">Notice</h3>
                <div className="modal-message">
                    {message}
                </div>
                <button
                    onClick={onClose}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
