import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";
import {useAuthStore} from "../state";
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const token = useAuthStore(state => state.token);
    const setToken = useAuthStore(state => state.setToken);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password}),
            });

            if (!response.ok) throw new Error("Error");
            const data = await response.json();
            setToken(data.token);
            console.log(data.token);
            navigate('/')
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <div className="mt-8 ml-55 font-bold text-3xl">Login</div>
            <div className="mt-2 border-b border-black w-260 mb-4 ml-55"></div>

            <Form
                className="border border-gray-400 p-4 w-120 ml-55 flex flex-col gap-4"
            >
                <Form.Group controlId="username">
                    <Form.Label className="mb-1 font-medium">Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-orange-400 shadow-none"
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label className="mb-1 font-medium">Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-orange-400 shadow-none"
                    />
                </Form.Group>

                <Button
                    onClick={handleSubmit}
                    type="submit"
                    className="mt-2 w-32 bg-gray-200 text-black py-1 rounded hover:bg-gray-300 border border-gray-400"
                    variant="light"
                >
                    Login
                </Button>
            </Form>
        </>
    );
};

export default Login;
