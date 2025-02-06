import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signin () {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {username, password});
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/dashboard");
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-md border-md min-w-48 p-4">
            <Input placeholder="Username" reference={usernameRef}/>
            <Input placeholder="Password" reference={passwordRef} type="password"/>
            <div className="flex justify-center p-2">
                <Button loading={false} varinat="primary" text="Sign In" onClick={signin} fullWidth={true}/>
            </div>
        </div>
    </div>
}