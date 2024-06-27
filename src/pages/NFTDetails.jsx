import React from "react";
import { useNavigate } from "react-router-dom";

export default function NFTDetails() {
  const navigate = useNavigate();

  return <div><span className="cursor-pointer" onClick={() => navigate("/nft-list")} > --- Back</span></div>;
}
