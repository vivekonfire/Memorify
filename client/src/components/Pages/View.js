import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import NoImage from "../../images/no-image.jpg";
import MemoryContext from "../../Context/MemoryContext/memoryContext";

const View = ({ match }) => {
    const memoryContext = useContext(MemoryContext);
    const { getMemory, memory, deleteMemory } = memoryContext;

    useEffect(() => {
        getMemory(match.params.id);
        //eslint-disable-next-line
    }, []);

    const { photo, title, desc } = memory;

    const onClick = () => {
        console.log("asdff");
        deleteMemory(match.params.id);
    };

    return (
        <div className="pt-40">
            <div className="flex mx-6 justify-between">
                <Link to={`/update/${match.params.id}`}>
                    <i className="fas fa-pencil-alt fa-2x"></i>
                </Link>
                <button>
                    <Link to="/">
                        <i className="fas fa-trash fa-2x" onClick={onClick} />
                    </Link>
                </button>
            </div>
            <div className="flex justify-center text-4xl p-6">
                <u>{title}</u>
            </div>
            <div className="flex ring-4 ring-black rounded-lg mx-4">
                {photo !== undefined ? (
                    <img src={photo.url} alt="pic" className="h-96 p-4" />
                ) : (
                    <img src={NoImage} alt="pic" className="w-1/6 p-4" />
                )}
                <div className="p-4 text-lg">{desc}</div>
            </div>
        </div>
    );
};

export default View;
