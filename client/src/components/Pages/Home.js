import React, { useContext, useEffect } from "react";
import Search from "../HomeComponents/Search";
import Memories from "../HomeComponents/Memories";
import memoryContext from "../../Context/MemoryContext/memoryContext";

const Home = () => {
    const MemoryContext = useContext(memoryContext);

    const { getMemories, memories, filter } = MemoryContext;

    useEffect(() => {
        getMemories();

        //eslint-disable-next-line
    }, []);

    return (
        <div className="pt-40">
            <Search />
            <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-16 2xl:px-80 xl:px-60 md:px-48 sm:px-32 pt-20">
                {filter.length > 0
                    ? filter.map((memory) => (
                          <Memories key={memory._id} memory={memory} />
                      ))
                    : memories.map((memory) => (
                          <Memories key={memory._id} memory={memory} />
                      ))}
            </div>
        </div>
    );
};

export default Home;
