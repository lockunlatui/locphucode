"use client";

import OurLoveStory from "@/components/OurLoveStory";
import Event from "@/components/Event";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("@/components/Slider"), { ssr: false });

export default function GetMarriedClient() {
  return (
    <div className="w-full">
      <Slider />
      <OurLoveStory />
      {/* <Category /> */}
      <Event />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3905.9701384604627!2d108.78889405058429!3d11.767153543300765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3171206c1eee06bd%3A0x6a909eb0aad3011c!2zMTIzIMSQLiBMw6ogRHXhuqluLCBUVC4gVMOibiBTxqFuLCBOaW5oIFPGoW4sIE5pbmggVGh14bqtbSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1657716295218!5m2!1sen!2s"
        width="100%"
        height="450"
        loading="lazy"
        style={{
          border: 0,
        }}
      ></iframe>
    </div>
  );
}
