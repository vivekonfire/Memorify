import React from "react";
import No_image from "../../images/no-image.jpg";

const Memories = ({ memory }) => {
    return (
        <div className="h-80 w-full bg-navbar overflow-hidden rounded-lg hover:shadow-2xl border-2 border-opacity-50 hover:border-gray-500 )">
            {memory.photos.length > 0 ? (
                //eslint-disable-next-line
                <img
                    className="h-36 w-64 mx-auto"
                    src="/1631811467757--invoker-dota-2-ulsae-hd-wallpaper-1920x1080.jpg"
                    alt="description of image"
                />
            ) : (
                // eslint-disable-next-line
                <img
                    className="h-36 w-64 mx-auto"
                    src={No_image}
                    alt="description of image"
                />
            )}
            <div className="text-center text-2xl">
                <u>{memory.title}</u>
            </div>
            <div className="p-6">{memory.desc}</div>
        </div>
    );
};

export default Memories;
