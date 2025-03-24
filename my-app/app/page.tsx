import Image from "next/image";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";


export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos()
        setVideos(data)
      } catch (error) {
        console.error("Error fetching videos", error)
      }
    }

    fetchVideos()
  }, [])
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
}
