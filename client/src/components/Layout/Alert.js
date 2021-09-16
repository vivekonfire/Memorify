import React, { useContext } from "react";
import AlertContext from "../../Context/AlertContext/alertContext";

const Alert = () => {
    const alertContext = useContext(AlertContext);

    const { error } = alertContext;

    return (
        error.length > 0 &&
        error.map((err) => (
            <div
                className="h-16 w-full flex justify-center bg-background border-2 border-black absolute inset-0 top-20 "
                key={err.id}
            >
                <i className="fas fa-info-circle my-auto px-4 fa-x" />{" "}
                <p className="my-auto">{err.err}</p>
            </div>
        ))
    );
};

export default Alert;
