import React from "react";

export default function GoogleMap() {
  return (
    <div className="relative z-10 max-w-6xl mx-auto bg-white p-8 shadow-lg rounded-3xl mt-4 mb-5 h-[600px]">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5262749123435!2d106.77741397480592!3d10.847518989305623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175270d071c834b%3A0x4047b831a8e5a9ba!2zNzcgxJAuIFTDom4gTOG6rXAgMiwgSGnhu4dwIFBow7osIFRo4bunIMSQ4bupYywgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1725956502272!5m2!1svi!2s" 
        className="absolute top-0 left-0 w-full h-full rounded-3xl" 
        frameBorder="0" 
        allowFullScreen 
        loading="lazy"
        title="Google Map Location"
      ></iframe>
    </div>
  );
}
