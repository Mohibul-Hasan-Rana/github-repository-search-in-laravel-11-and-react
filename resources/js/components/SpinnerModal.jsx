import React from "react";
import Spinner from "./Spinner";

const SpinnerModal = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg">
                <Spinner />
                <p className="mt-2 text-center">Loading...</p>
            </div>
        </div>
    );
};

export default SpinnerModal;
