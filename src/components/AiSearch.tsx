import { LegacyRef, useRef, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function AiSearch() {
    const aiSearchRef = useRef<HTMLInputElement>();
    const [aiData, setAiData] = useState();
    const [aiLink, setAiLink] = useState(); 

    async function search() {
        const userPrompt = aiSearchRef.current?.value;

        const response = await axios.post(`${BACKEND_URL}/api/v1/ai`, {
            userPrompt
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        let aiResponse = response.data.aiResponse;
        //console.log(aiResponse.startsWith("```json"))
        if (aiResponse.startsWith("```json")) {
            aiResponse = aiResponse.replace("```json", "").replace("```", "");
        }
        //console.log(aiResponse)
        const jsonResponse = JSON.parse(aiResponse.toString())
        setAiData(jsonResponse.content)
        setAiLink(jsonResponse.link)
    }
    return <>
    <div className="flex justify-end">
    <input ref={aiSearchRef as LegacyRef<HTMLInputElement> | undefined} className="w-screen ml-72 h-12 border-dashed border-2 border-white rounded-md bg-gray-100" placeholder="Search using AI"/>
    <Button varinat="primary" text="Search" onClick={search}/>
    </div>
    {aiData && aiData != 'undefined' ? <div className="text-white min-h-12 content-center ml-72">{aiData}</div>: <></>}
    {aiLink && aiLink != 'undefined'? <div className="text-white min-h-12 content-center  ml-72">
        Links:<br />
        <a target="_blank" href={aiLink} className="text-purple-300">{aiLink}</a>
    </div>: <></>}
    </>
}