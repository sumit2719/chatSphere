import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });

    const { signup } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Full Name:
                <input type='text' value={inputs.fullName} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} />
            </label>
            <label>
                Username:
                <input type='text' value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })} />
            </label>
            <label>
                Password:
                <input type='password' value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
            </label>
            <label>
                Confirm Password:
                <input type='password' value={inputs.confirmPassword} onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} />
            </label>
            <label>
                Gender:
                <input type='text' value={inputs.gender} onChange={(e) => setInputs({ ...inputs, gender: e.target.value })} />
            </label>
            <button type='submit'>Sign Up</button>
        </form>
    );
};

export default SignUp;