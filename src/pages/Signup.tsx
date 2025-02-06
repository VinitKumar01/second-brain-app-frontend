import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signup () {
        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/signup`, {username, email, password});
        navigate("/signin");
    }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-md border-md min-w-48 p-4">
            <Input placeholder="Email" reference={emailRef}/>
            <Input placeholder="Username" reference={usernameRef}/>
            <Input placeholder="Password" reference={passwordRef} type="password"/>
            <div className="flex justify-center p-2">
                <Button loading={false} varinat="primary" text="Sign Up" onClick={signup} fullWidth={true}/>
            </div>
        </div>
    </div>
}