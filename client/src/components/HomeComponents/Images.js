import React from "react";

const Images = ({ photo }) => {
    const path = "../../../../" + photo.path;

    console.log(path);

    return (
        // eslint-disable-next-line
        <img
            className="h-36 w-64 mx-auto"
            src={path}
            alt="description of image"
        />
    );
};

export default Images;
