import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Gallery.module.css";
const Gallery = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState();
  useEffect(() => {
    gallery();
  }, []);

  console.log(file);
  const { groupId } = useParams();
  console.log(groupId);
  const send = async (e) => {
    console.log(file);
    const data = new FormData();
    console.log(file);
    // data.append('name', fileName)
    data.append("file", file);

    const response = await fetch("http://localhost:6969/upload", {
      method: "POST",
      body: data,
    });
    const res = await response.json();
    console.log(res);
    if (res.message == "success") {
      imageUploader(res.CID);
    }
    if (res.message == "error") {
      alert(res.message);
    }
  };

  const imageUploader = async (cid) => {
    const response = await fetch(
      "http://localhost:6969/api/addimagetogallery",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupId: groupId,
          imageContent: cid,
        }),
      }
    );
    const res = await response.json();
    console.log(res);
    if (res.status == "ok") {
      alert(res.message);
      window.location.reload();
    }
    if (res.status == "error") {
      alert(res.message);
    }
  };
  const gallery = async () => {
    const response = await fetch("http://localhost:6969/api/gallery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: groupId,
      }),
    });
    const res = await response.json();
    console.log(res.message);
    if (res.status == "ok") {
      console.log(res.message);
      setImages(res.message);
    }
    if (res.status == "error") {
      alert(res.message);
    }
  };

  return (
    <div
      style={{
        marginTop: "-20px",
        height: "100vh",
      }}>
        <h1 style={{color:"white"}}> FIND THE PHOTOS HERE </h1>
      <h1 style={{color:"MidNightBlue", fontSize:"30px", fontFamily:"serif"}}>Gallery</h1>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <Button onClick={send} style={{color:"Black", fontFamily:"serif", fontSize:"15px", border:"1px solid", borderRadius:"10px"}}>Upload Image</Button>
      {/* <h4>Click on Image to View Full Resolution</h4> */}
      <div className={styles.gallerydiv}>
        {images &&
          images.map((item) => {
            return item.map((i) => {
              {
                console.log(`https://ipfs.io/ipfs/${i.imageContent}`);
              }
              return (
                <div>
                  <img
                    onClick={(e) => {
                      window.open(`https://ipfs.io/ipfs/${i.imageContent}`);
                    }}
                    src={`https://ipfs.io/ipfs/${i.imageContent}`}
                  />
                </div>
              );
            });
          })}
      </div>
    </div>
  );
};

export default Gallery;