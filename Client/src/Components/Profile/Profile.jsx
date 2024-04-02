import { useState, useEffect } from "react";
import Button from "../Button/Button";
import FormikForm from "./FormikForm";
import OffcanvasExample from "../Nav/OffcanvasExample";
import Footer from "../Footer/Footer";
const Profile = () => {
  const [fields, updateFields] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:6969/api/profile", {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      const body = await result.json();
      console.log(body);
      updateFields({
        firstName: body.data.firstName,
        lastName: body.data.lastName,
        userName: body.data.userName,
        email: body.data.email,
      });
    };
    fetchData();
  }, []);
  console.log(fields);

  const profiledata = async () => {
    console.log({
      firstName: fields.firstName,
      lastName: fields.lastName,
      userName: fields.userName,
      email: fields.email,
    });
    const response = await fetch("http://localhost:6969/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: fields.firstName,
        lastName: fields.lastName,
        userName: fields.userName,
        email: fields.email,
        token: localStorage.getItem("token"),
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div
      style={{
        height: "100vh",
        marginTop: "-20px",
      }}>
      <OffcanvasExample />
      <FormikForm fields={fields} updateFields={updateFields} />
      <Button onClick={profiledata}>Save Changes</Button>
      <br />
     <Footer />
    </div>
  );
};

export default Profile;
