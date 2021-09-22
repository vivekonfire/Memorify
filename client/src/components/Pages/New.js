import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import MemoryContext from "../../Context/MemoryContext/memoryContext";
import AlertContext from "../../Context/AlertContext/alertContext";

const New = (props) => {
    const memoryContext = useContext(MemoryContext);
    const { addMemory } = memoryContext;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [pic, setPic] = useState();

    const onChange = (e) => {
        if (e.target.name === "title") setTitle(e.target.value);
        else if (e.target.name === "desc") setDesc(e.target.value);
        else {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPic(reader.result);
            };
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (title === "" || desc === "" || pic == null)
            setAlert("Please enter everything");
        else {
            addMemory({ title, desc, pic });
        }
    };

    return (
        <div className="pt-40">
            <form onSubmit={onSubmit}>
                <div className="flex justify-center">
                    <input
                        className="text-4xl text-center p-4 rounded-lg border-2 border-black"
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={title}
                        onChange={onChange}
                    />
                </div>
                <div className="flex justify-center">
                    <input
                        className="text-lg text-center p-4 rounded-lg border-2 border-black my-6"
                        type="file"
                        name="pic"
                        onChange={onChange}
                        accept="image/png, image/jpeg, image/jpg"
                    />
                </div>
                <div className="flex justify-center">
                    <textarea
                        className="w-full h-96 my-10 mx-40 text-sm p-4 rounded-lg border-2 border-black"
                        placeholder="Description"
                        name="desc"
                        value={desc}
                        onChange={onChange}
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        className="text-center bg-navbar rounded-lg px-6 py-4"
                        type="submit"
                    >
                        <Link to="/">Submit</Link>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default New;
