import React from "react";
import { Link } from "react-router-dom";
import No_image from "../../images/no-image.jpg";

const Memories = ({ memory }) => {
    return (
        <Link to={`/view/${memory._id}`}>
            <div className="h-80 w-full bg-gradient-to-t from-background to-navbar overflow-hidden rounded-lg hover:shadow-2xl ">
                {memory.photo !== null ? (
                    //eslint-disable-next-line
                    <img
                        className="h-36 w-64 mx-auto mt-6"
                        src={memory.photo.secure_url}
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
                <div className="text-center text-2xl ">
                    <u>{memory.title}</u>
                </div>
                <div className="p-6 ">{memory.desc}</div>
            </div>
        </Link>
    );
};

export default Memories;
