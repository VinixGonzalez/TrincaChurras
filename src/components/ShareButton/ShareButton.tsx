"use client";

import React from "react";
import { BsFacebook } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";

interface ShareButtonProps {
  url: string;
  title: string;
  platform: "facebook" | "whatsapp";
}

const ShareButton: React.FC<ShareButtonProps> = ({ url, title, platform }) => {
  const platformUrlMap = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`,
    whatsapp: `https://api.whatsapp.com/send?text=${title} - ${url}`,
  };

  const handleShare = () => {
    const shareUrl = platformUrlMap[platform];
    window.open(shareUrl, "_blank");
  };

  return (
    <button
      onClick={handleShare}
      title={`Compartilhar no ${
        platform.charAt(0).toUpperCase() + platform.slice(1)
      }`}
    >
      {platform === "facebook" && <BsFacebook color="blue" size={24} />}
      {platform === "whatsapp" && <IoLogoWhatsapp color="green" size={28} />}
    </button>
  );
};

export default ShareButton;
