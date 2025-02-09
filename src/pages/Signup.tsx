import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

type ZodError = {
    response: {
        data: {
            errors: {
                email?: {
                    _errors: string
                },
                password?: {
                    _errors: string
                },
                username?: {
                    _errors: string
                }
            }
        }
    }
}

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState<String>();
    const [usernameError, setUsernameError] = useState<String>();
    const [passwordError, setPasswordError] = useState<String>();

    async function signup () {
        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        try {
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {username, email, password});
            navigate("/signin");
        } catch (error) {
            console.log((error as ZodError).response.data.errors);
            setEmailError((error as ZodError).response.data.errors.email?._errors )
            setUsernameError((error as ZodError).response.data.errors.username?._errors)
            setPasswordError((error as ZodError).response.data.errors.password?._errors)
        }
    }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-md border-md min-w-48 p-4">
            <Input placeholder="Email" reference={emailRef}/>
            {emailError? <div className="text-red-800 w-52 break-words">{emailError}</div> : ""}
            <Input placeholder="Username" reference={usernameRef}/>
            {usernameError? <div className="text-red-800 w-52 break-words">{usernameError}</div> : ""}
            <Input placeholder="Password" reference={passwordRef} type="password"/>
            {passwordError? <div className="text-red-800 w-52 break-words">{passwordError}</div> : ""}
            <div className="flex justify-center p-2">
                <Button loading={false} varinat="primary" text="Sign Up" onClick={signup} fullWidth={true}/>
            </div>
        </div>
    </div>
}