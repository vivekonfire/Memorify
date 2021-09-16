import React from "react";
import No_image from "../../images/no-image.jpg";
import Images from "./Images";

const Memories = ({ memory }) => {
    return (
        <div className="h-80 bg-navbar overflow-hidden rounded-lg hover:shadow-2xl border-2 border-opacity-50 hover:border-gray-500 )">
            {memory.photos.length > 0 ? (
                memory.photos.map((photo) => (
                    <Images key={photo.filename} photo={photo} />
                ))
            ) : (
                // eslint-disable-next-line
                <img
                    className="h-36 w-64 mx-auto"
                    src={No_image}
                    alt="description of image"
                />
            )}
            <div className="text-center text-2xl">{memory.title}</div>
            <div className="p-6">{memory.desc}</div>
        </div>
    );
};

export default Memories;
