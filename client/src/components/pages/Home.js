import React, { useContext, useEffect } from "react";
import memoryContext from "../../Context/MemoryContext/memoryContext";

const Home = () => {
    const MemoryContext = useContext(memoryContext);

    const { getMemories, memories } = MemoryContext;

    useEffect(() => {
        getMemories();

        //eslint-disable-next-line
    }, []);
    console.log(memories);

    return <div></div>;
};

export default Home;
