import React, { useState, useContext, useEffect } from "react";
import authContext from "../../Context/AuthContext/authcontext";

const SignUp = (props) => {
    const AuthContext = useContext(authContext);

    const { register, isAuth } = AuthContext;

    useEffect(() => {
        if (isAuth) {
            props.history.push("/");
        }
    }, [isAuth, props.history]);

    const [person, setPerson] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = person;

    const onSubmit = (e) => {
        e.preventDefault();
        register(person);
    };

    const onChange = (e) => {
        setPerson({ ...person, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-navbar h-screen w-screen bg-gradient-to-t from-background to-navbar flex justify-between">
            <div className="m-auto text-center text-7xl flex-1">
                Make Your Account
            </div>
            <div className="flex-1 m-auto flex justify-center">
                <form
                    className="m-auto bg-background h-101 w-100 border-black shadow-lg mx-10 "
                    onSubmit={onSubmit}
                >
                    <h1 className="text-2xl text-center pt-6">Sign Up</h1>
                    <h2 className="text-xl p-6 pt-4">Name</h2>
                    <div className="flex justify-center">
                        <input
                            className="w-5/6 rounded-lg mx-4 shadow-lg h-12 px-4"
                            name="name"
                            type="name"
                            value={name}
                            placeholder="Type your name"
                            onChange={onChange}
                        ></input>
                    </div>
                    <h2 className="text-xl p-6 pt-4">Email</h2>
                    <div className="flex justify-center">
                        <input
                            className="w-5/6 rounded-lg mx-4 shadow-lg h-12 px-4"
                            name="email"
                            type="email"
                            value={email}
                            placeholder="Email Account"
                            onChange={onChange}
                        ></input>
                    </div>
                    <h2 className="text-xl p-6 pt-4">Password</h2>
                    <div className="flex justify-center">
                        <input
                            className="w-5/6 rounded-lg mx-4 shadow-lg h-12 px-4"
                            name="password"
                            type="password"
                            value={password}
                            placeholder="password"
                            onChange={onChange}
                        ></input>
                    </div>
                    <div className=" flex justify-center my-6">
                        <button
                            type="submit"
                            className="w-2/3 rounded-lg shadow-lg bg-navbar h-14 text-center"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
