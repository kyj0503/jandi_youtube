import {
  MdOutlinePlaylistPlay,
  MdAccessTime,
  MdBookmarkBorder,
  MdOutlineFileDownload,
  MdOutlineShare,
} from "react-icons/md";
import { IoShuffle } from "react-icons/io5";
import { HiOutlineArrowDownTray } from "react-icons/hi2";
import { FiFlag } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";

export const videoDropdownOptions = [
  {
    icon: <MdOutlinePlaylistPlay size={24} />,
    text: "현재 재생목록에 추가",
  },
  {
    icon: <MdAccessTime size={24} />,
    text: "나중에 볼 동영상에 저장",
  },
  {
    icon: <MdBookmarkBorder size={24} />,
    text: "재생목록에 저장",
  },
  {
    icon: <MdOutlineFileDownload size={24} />,
    text: "오프라인 저장",
  },
  {
    icon: <MdOutlineShare size={24} />,
    text: "공유",
  },
];

export const channelDropdownOptions = [
  {
    icon: <IoShuffle size={22} />,
    text: "셔플",
  },
  {
    icon: <HiOutlineArrowDownTray size={24} />,
    text: "오프라인 저장",
  },
  {
    icon: <FiFlag size={22} />,
    text: "재생목록 신고",
  },
  {
    icon: <MdOutlineRemoveRedEye size={24} />,
    text: "사용할 수 없는 동영상 표시",
  },
];
