import React, { useState, useEffect, useCallback } from "react";
import styles from "./ChannelShortsSection.module.css";
import YoutubeService from "../../../apis/youtube";
import { formatISO } from "../../../utils/date";
import { formatHitCount } from "../../../utils/hit";
import { formatDuration } from "../../../utils/time";
import {formatTotalTime} from "../../../utils/totalTime";
import { useNavigate } from "react-router-dom";


const ChannelShortsSection = ({channelId}) => {
  console.log(channelId);
  const [videos, setVideos] = useState([]);
    const [activeTab, setActiveTab] = useState("최신순");
    const navigate = useNavigate();
  
    const tabs = ["최신순", "인기순", "이름순"];

    const getOrderValue = (tab) => {
      switch (tab) {
        case "최신순":
          return "date";
        case "인기순":
          return "viewCount";
        case "이름순":
          return "title";
        default:
          return "date";
      }
    }; 

  const fetchChannelVideos = async (channelId, order) =>{
    try{
      const response = await YoutubeService.fetchSearch({
        part: "snippet",
        type: "video",
        channelId: channelId,
        regionCode: "KR",
        order: order,
        maxResults: 20,
      });
      const videoIds = response.data.items.map((item) => item.id.videoId);

      const videoDetailsResponse = await YoutubeService.fetchVideos({
        part: "contentDetails,snippet,statistics",
        id: videoIds.join(","),
      });
      const filteredVideos = videoDetailsResponse.data.items.filter((video) => {
        const totalSeconds = formatTotalTime(video.contentDetails.duration);

        return totalSeconds <= 60;
      });

      console.log(filteredVideos);
      setVideos(filteredVideos);
      
    }catch(error){
      console.log("error: "+ error);
    }
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  
  useEffect(()=> {
    const order = getOrderValue(activeTab);
    fetchChannelVideos(channelId, order);
  },[activeTab, channelId]);

   const handleClick = useCallback((id) => {
      navigate(`/shorts/${id}`);
    }, [navigate]);

  return (
    <div>
      <div className={styles.video_header}>
             {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`${styles.header_button} ${activeTab === tab ? styles.active_header_button : ""}`}
                    onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </button>
              ))}
      </div>
          <ul className={styles.video_list}>
            {videos.map((video) => (
              <li className={styles.video_item} key={video.id} onClick={() => handleClick(video.id)}>
                <div>
                <img
                  className={styles.video_thumbnail}
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.localized.title}
                />
                </div>
                <div className={styles.video_description}>
                  <p className={styles.video_title}>{video.snippet.localized.title}</p>
                  <p className={styles.video_sub}>{formatHitCount(video.statistics.viewCount)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
  );
};

export default ChannelShortsSection;
