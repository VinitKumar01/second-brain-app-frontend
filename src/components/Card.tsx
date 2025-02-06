import axios from "axios";
import { DeleteIcon } from "../icons/DeleteIcon";
import { PageIcon } from "../icons/PageIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { BACKEND_URL } from "../config";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
    _id: string;
}

export function Card({title, link, type, _id}:CardProps) {
    link = type == "youtube" ? link.replace("watch", "embed").replace("?v=", "/") : link;
    link = type == "twitter" ? link.replace("x.com", "twitter.com") : link;
    return <div className="bg-white rounded-md shadow-md outline-slate-200 max-w-72 border p-4 min-h-56 h-fit">
        <div className="flex justify-between items-center">
            <div className="flex items-center text-md">
                <div className="text-gray-500 pr-2">
                    <PageIcon/>
                </div>
                {title}
            </div>
            <div className="flex items-center">
                <div className="text-gray-500 pr-2">
                    <a href={link} target="_blank">
                    <ShareIcon/>
                    </a>
                </div>
                <div className="text-gray-500">
                    <DeleteIcon id={_id} onClick={async (e)=> {
                        const id = e.target.id;
                        await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                            data: {
                                contentId: id
                            },
                            headers: {
                                "Authorization": localStorage.getItem("token")
                            }
                        })
                    }}/>
                </div>
            </div>
        </div>
        <div className="pt-4">
        {type == "youtube" && <iframe className="w-full rounded-md" src={link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
        {type == "twitter" && <blockquote className="twitter-tweet">
            <a href={link}></a> 
        </blockquote>}
        </div>
    </div>
}