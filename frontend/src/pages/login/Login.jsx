import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type='submit'>Login</button>
			<br />
			<button type='button' onClick={() => window.location.href = '/signup'}>Register</button>
        </form>
    );
};

export default Login;