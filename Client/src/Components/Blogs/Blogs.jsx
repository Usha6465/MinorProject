import React, { useState } from "react";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import OffcanvasExample from "../Nav/OffcanvasExample";
import Footer from "../Footer/Footer";
import image from "../../assets/blog.png";
import { height } from "@mui/system";
import images from "../../assets/blogger.png";
const Blogs = () => {
  const history = useHistory();
  const { id } = useParams();
  const [blogs, setBlogs] = useState();

  const fetchAllBlogs = async () => {
    const response = await fetch("http://localhost:6969/api/allblogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: id,
      }),
    });
    const responseData = await response.json();
    if (responseData.status == "ok") {
      setBlogs(responseData.message);
    } else {
      alert("Couldn't fetch Blogs");
    }
  };
  console.log(blogs);
  return (
    <div
      style={{
        height: "100vh",
        "margin-top": "-20px",
      }}>
      <OffcanvasExample />
      <img
        style={{
          width: "200px",
          height: "200px",
          marginTop: "40px",
        }}
        src={image}
      />
      <h1
        style={{
          "text-align": "center",
          "font-size": "40px",
        }}>
        Blogs
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          "align-items": "center",
          "justify-content": "center",
          "padding-bottom": "50px",
        }}>
        <Button
          style={{
            margin: "10px",
          }}
          variant="contained"
          onClick={() => {
            history.push(`/createblog/${id}`);
          }}>
          Create Blog
        </Button>
        <Button
          style={{
            margin: "10px",
          }}
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            fetchAllBlogs();
          }}>
          View All Blogs
        </Button>
      </div>

      {blogs && (
        <div
          styles={{
            display: "flex",
            flexDirection: "column",
            "align-items": "center",
            "justify-content": "center",
          }}>
          {blogs.map((i) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  "align-items": "center",
                  "justify-content": "center",
                  "flex-wrap": "wrap",
                }}>
                {i.map((j) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "0.2rem",
                        width: "800px",
                        margin: "0.4rem",
                        "box-shadow": "0 3px 10px rgb(0 0 0 / 0.3)",
                        "align-items": "center",
                        "justify-content": "space-around",
                        borderRadius: "10PX",
                      }}>
                      <img
                        style={{
                          width: "70px",
                          height: "70px",
                        }}
                        src={images}
                      />
                      <h2>{j.blogTitle}</h2>
                      <p>Author:{j.blogAuthor}</p>
                      <p>Date: {j.blogDate}</p>
                      <Button
                        variant="contained"
                        onClick={() => {
                          history.push(`/viewblog/${id}/${j.blogId}`);
                        }}>
                        View Blog
                      </Button>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
      <br />
      <Footer />
    </div>
  );
};

export default Blogs;
