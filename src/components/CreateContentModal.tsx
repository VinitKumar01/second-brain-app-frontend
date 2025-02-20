import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { motion, AnimatePresence } from "motion/react";

interface PropsType {
    open: boolean;
    onClose: ()=> void
}

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModal({open, onClose}:PropsType) {
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.Youtube);
    const [isLoading, setIsLoading] = useState(false);

    async function addContent() {
        setIsLoading(true);
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`,{
            title,
            link,
            type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        setIsLoading(false);
        onClose();
    }

    return(<AnimatePresence>
    {open && <div className="w-screen h-screen bg-slate-500 fixed top-0 lef-0 bg-opacity-60 flex justify-center" onClick={onClose}>
        <motion.div 
            className="flex flex-col justify-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}>
            <span className="bg-white p-4 rounded">
                <div className="flex justify-end">
                    <CrossIcon onClick={onClose}/>
                </div>
                <div>
                    <Input placeholder="Title" reference={titleRef}/>
                    <Input placeholder="Link" reference={linkRef}/>
                </div>
                <div>
                    <h1>Type</h1>
                    <div className="flex gap-1 p-4">
                        <Button varinat={type == ContentType.Youtube? "primary": "secondary"} text="Youtube" onClick={()=> {
                            setType(ContentType.Youtube);
                        }}/>
                        <Button varinat={type == ContentType.Twitter? "primary": "secondary"} text="Twitter" onClick={()=> {
                            setType(ContentType.Twitter);
                        }}/>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button varinat="primary" loading={isLoading} text="Submit" onClick={addContent}/>
                </div>
            </span>
        </motion.div>
    </div>}
    </AnimatePresence>)
}