import { Card } from "../components/Card"
import { Button } from "../components/Button"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { CreateContentModal } from "../components/CreateContentModal"
import { useEffect, useState } from "react"
import { SideBar } from "../components/SideBar"
import { useContent } from "../hooks/useContent"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useParams } from "react-router-dom"
import { AiSearch } from "../components/AiSearch"

type Params = {
  hash: string;
};

 export function Dashboard() {
  const {hash} = useParams<Params>();
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh, sharedContent} = useContent();

  useEffect(()=> {
    if (hash) {
      sharedContent(hash);
      const interval = setInterval(sharedContent, 10000, [hash]);
        return ()=> {
            clearInterval(interval)
        }
    } else {
      refresh();
      const interval = setInterval(refresh, 10000);
        return ()=> {
            clearInterval(interval)
        }
    }

  }, [modalOpen])

  return (<>
  <SideBar/>
  <CreateContentModal open={modalOpen} onClose={()=> {
    setModalOpen(false);
  }}/>
  <AiSearch/>
  <div className="p-4 ml-72 min-h-screen bg-gray-100">
    <div className="flex justify-end gap-2">
      <Button varinat="primary" text="Add content" startIcon={<PlusIcon/>} onClick={()=> {
      setModalOpen(true);
      }}></Button>
      <Button varinat="secondary" text="Share Brain" startIcon={<ShareIcon/>} onClick={async ()=> {
        const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
          share: true
        },{
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        })
        const shareUrl = `http://localhost:5173/dashboard/${response.data.hash}`;
        navigator.clipboard.writeText(shareUrl);
      }}></Button>
    </div>
    <div className="flex gap-4 flex-wrap">
      {contents.map(({title, type, link, _id}, index)=> {
        return <Card key={index} title={title} link={link} type={type} _id={_id}/>
      })}
    </div>
  </div>
  </>
)
}