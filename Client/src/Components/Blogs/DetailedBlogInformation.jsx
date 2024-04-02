import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import OffcanvasExample from "../Nav/OffcanvasExample";
import image from "../../assets/blogs-and-article.png";
import Footer from "../Footer/Footer";

const DetailedBlogInformation = () => {
  useEffect(() => {
    fetchSpecificBlogs();
  });
  const history = useHistory();
  const [blogs, setBlogs] = useState();
  const [comments, setComments] = useState();
  const [liveComments, setLiveComments] = useState();
  const { groupid, blogid } = useParams();
  console.log(groupid, blogid);

  const fetchSpecificBlogs = async () => {
    const response = await fetch("http://localhost:6969/api/getspecificblog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: groupid,
        blogId: blogid,
      }),
    });
    const responseData = await response.json();
    if (responseData.status == "ok") {
      setBlogs(responseData.message);
    } else {
      alert("Couldn't fetch Blogs");
    }
  };

  const fetchComments = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:6969/api/getcomments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: groupid,
        blogId: blogid,
      }),
    });
    const responseData = await response.json();
    if (responseData.status == "ok") {
      console.log(responseData.message);
      setComments(responseData.message);
    } else {
      alert("Couldn't fetch Blogs");
    }
  };

  const addComment = async (e) => {
    console.log("s.kfdjnh");
    e.preventDefault();
    const response = await fetch("http://localhost:6969/api/addcomment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: groupid,
        blogId: blogid,
        comment: liveComments,
        commentId: Math.floor(Math.random() * 1000000000),
        token: localStorage.getItem("token"),
      }),
    });
    const responseData = await response.json();
    if (responseData.status == "ok") {
      alert("Comment added");
      history.go(0);
      console.log(responseData.message);
      setComments(responseData.message);
    } else {
      alert("Comment couldn't be added");
    }
  };
  return (
    <div
      style={{
        marginTop: "-20px",
      }}>
      <OffcanvasExample />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <img
          style={{
            width: "550px",
            height: "300px",
            marginTop: "50px",
          }}
          src={image}
        />
      </div>

      <div
        style={{
          "text-align": "center",
          "font-size": "4rem",
          "font-weight": "bold",
        }}>
        Blog Information
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          "align-items": "center",
          "justify-content": "center",
          "padding-bottom": "50px",
        }}></div>
      <div>
        {blogs &&
          blogs.map((blog) => {
            return (
              <div>
                {blog.map((x) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                        paddingLeft: "50px",
                        paddingRight: "50px",
                      }}>
                      <h1>Blog Title:{x.blogTitle}</h1>
                      <p
                        style={{
                          "font-size": "2rem",
                        }}>
                        {x.blogContent}
                      </p>
                      
                      <h2>Blog Author:{x.blogAuthor}</h2>
                      <h2>Blog Author Email:{x.blogAuthorEmail}</h2>
                      <h5>Blog Id: {x.blogId}</h5>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
      <Button variant="contained" onClick={fetchComments}>
        View Comments
      </Button>
      {comments && (
        <div>
          <h1>Comments</h1>
          {comments.map((a) => {
            return (
              <div>
                {a.map((b) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}>
                      {b.map((c) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-around",
                              alignItems: "center",
                              width: "800px",
                              margin: "0.4rem",
                              "border-radius": "10px",
                              "background-color": "lightgrey",
                              "box-shadow": "0 3px 10px rgb(0 0 0 / 0.2)",
                            }}>
                            <h4>{c.commentBy}</h4>
                            <p
                              style={{
                                "padding-left": "30px",
                                "padding-right": "30px",
                              }}>
                              {c.commentDate}
                            </p>
                            <div>
                              <h3>{c.comment}</h3>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
      <div>
        <TextField
          style={{
            width: "400px",
            marginTop: "10px",
          }}
          placeholder="Add Comment"
          onChange={(e) => {
            setLiveComments(e.target.value);
          }}></TextField>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "10px",
          }}>
          <Button variant="contained" onClick={addComment}>
            Add Comment
          </Button>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default DetailedBlogInformation;
