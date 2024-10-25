import React, { Fragment } from "react";
import spinner from "./images/spinner.gif";

const Spinner = () => {
    return (
        <Fragment>
            <img
                src={spinner}
                alt="Loading..."
                style={{ width: "100px", display: "block", margin: "auto" }}
            />
        </Fragment>
    );
};

export default Spinner;
