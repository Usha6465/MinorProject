import React, { useState } from "react";
import "./Modal.css";
import { Button } from "@mui/material";

export default function FundraisingModal(props) {
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState([]);
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  const pay = async () => {
    fetch("http://localhost:6969/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items,
        eventId: props.fundRaisingEventId,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };
  console.log(items);

  return (
    <>
      <button
        style={{
          "background-color": "#4CAF50",
          border: "none",
          padding: "10px 20px",
          "box-shadow": "0 3px 10px rgb(0 0 0 / 0.3)",
        }}
        onClick={toggleModal}>
        {props.buttonName}
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              "line-height": 1.4,
              background: "#f1f1f1",
              paddingTop: "40px",
              paddingLeft: "60px",
              paddingRight: "60px",
              "border-radius": "3px",
              "max-width": "700px",
              "min-width": "500px",
              "min-height": "150px",
              "max-height": "500px",
            }}>
            <h1>{props.title}</h1>
            <br />
            {/* <p>
            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            ipsam atque a dolores quisquam quisquam adipisci possimus
            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
            accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
            deleniti rem!
          </p> */}
            <p>{props.modalDescription}</p>

            <h2>Please select fund Solts</h2>
            <br />
            <p>Click Multiple time to select the same slot </p>
            <br />
            <br />
            <div
              style={{
                height: "200px",
                display: "flex",
                flexDirection: "column",
              }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <Button
                  style={{
                    width: "110px",
                  }}
                  onClick={(e) => {
                    setItems([...items, { id: 1, quantity: 1 }]);
                  }}
                  variant="contained">
                  1000 &#8377;
                </Button>
                <Button
                  style={{
                    width: "110px",
                  }}
                  variant="contained"
                  onClickCapture={(e) => {
                    setItems([...items, { id: 2, quantity: 1 }]);
                  }}>
                  5000 &#8377;
                </Button>
                <Button
                  style={{
                    width: "110px",
                  }}
                  variant="contained"
                  onClickCapture={(e) => {
                    setItems([...items, { id: 3, quantity: 1 }]);
                  }}>
                  7500 &#8377;
                </Button>
                <Button
                  style={{
                    width: "110px",
                  }}
                  variant="contained"
                  onClickCapture={(e) => {
                    setItems([...items, { id: 4, quantity: 1 }]);
                  }}>
                  10000 &#8377;
                </Button>
              </div>
              <div
                style={{
                  marginTop: "40px",
                }}>
                <Button
                  style={{
                    width: "200px",
                  }}
                  variant="contained"
                  onClick={pay}>
                  Pay
                </Button>
              </div>
            </div>

            <button className="close-modal" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
