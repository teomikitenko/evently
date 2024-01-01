"use client";
import Image from "next/image";

const Event = ({ image }: { image: { publicUrl: string } }) => {
  console.log(image.publicUrl)
  return(
    <div className="flex gap-3">
      <Image className="grow" src={image.publicUrl} width={300} height={400} alt="img" />
      <div className="grow">Some Title</div>
    </div>
    
  ) 
};

export default Event;
