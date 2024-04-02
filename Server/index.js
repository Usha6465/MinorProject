const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const { create, globSource } = require("ipfs-http-client");
var crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const eventsJson = require("./events.json");
const User = require("./models/user.module");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const Group = require("./models/groups.module");
const { group, Console } = require("console");
const Fundraising = require("./models/fundraising.model");

// parse application/json
app.use(bodyParser.json());

const multer = require("multer");


const projectId = "2J3UJJPnUFppJRJcOk1eaNjd2ZM";
const projectSecret = "447c2a87bbca7b91f5a1e25e470cac19";

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./files");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const upload = multer({ storage: fileStorageEngine });
app.post("/api/signup", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.create({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    const cryptoHash = crypto.randomBytes(20).toString("hex");
    const fundraising = await Fundraising.create({
      fundraising: {
        hash: cryptoHash,
      },
    });
    res.json({ status: "ok", message: "User created successfully" });
  } catch (err) {
    console.log("Error", err);
    res.json({ status: "error", message: err });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).lean();
    if (!user) {
      return res.json({ status: "error", error: "Invalid email/password" });
    }
    if (user.password === req.body.password) {
      const token = jwt.sign(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userName: user.userName,
        },
        "SheeshBro-77@!"
      );
      return res.json({ status: "ok", token: token });
    } else {
      res.json({ status: "error", error: "Invalid email/password" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Invalid email/password" });
  }
});

app.post("/api/allevents", async (req, res) => {
  try {
    const events = await Group.find({
      "group.groupInformation.groupId": req.body.groupId,
    });
    const eventsData = events.map((item) => {
      return {
        eventDetails: item.group.groupInformation.groupEvents.map((i) => {
          return {
            img_url: i.eventUrl,
            event_name: i.eventName,
            event_mode: i.eventMode,
            date: i.eventDate,
            event_place: i.eventLocation,
            id: i.eventId,
            attendees: 1,
          };
        }),
      };
    });
    res.json({ status: "ok", data: eventsData });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Something Went Wrong" });
  }
});
app.post("/api/specificevent", async (req, res) => {
  const groupId = Number(req.body.groupId);
  const eventId = Number(req.body.eventId);
  try {
    const events = await Group.find({
      "group.groupInformation.groupEvents.eventId": {
        $eq: eventId,
      },
    });
    const eventsData = events.map((item) => {
      return {
        eventDetails: item.group.groupInformation.groupEvents.filter((i) => {
          if (i.eventId === eventId) {
            return {
              img_url: i.eventUrl,
              event_name: i.eventName,
              event_mode: i.eventMode,
              date: i.eventDate,
              event_place: i.eventLocation,
              id: i.eventId,
              attendees: 1,
              eventMembers: i.eventMembers,
              eventPublicDetails: i.eventPublicDetails,
              eventWorkshopDetails: i.eventWorkshopDetails,
            };
          }
        }),
      };
    });
    console.log(eventsData);
    res.json({ status: "ok", data: eventsData });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Something Went Wrong" });
  }
});
app.post("/api/getgroupmembers", async (req, res) => {
  console.log("Get Group Members API Data", req.body.groupId);
  try {
    const getGroupMembersDetails = await Group.find({
      "group.groupInformation.groupId": req.body.groupId,
    });

    const data = getGroupMembersDetails.map((item) => {
      return item.group.groupInformation.groupMembers;
    });
    console.log("Get Group Members API Data", data);
    res.json({
      status: "ok",
      message: "Group Members fetched successfully",
      data: data,
    });
  } catch (err) {
    res.json({ status: "error", message: err });
  }
});

// app.post("/api/creategroup", async (req, res) => {
//   const token = req.body.token;
//   console.log("Create Group API Token -", token);
//   try {
//     const decoded = jwt.verify(token, "doWellInPresentation!");
//     const decodedEmail = decoded.email;
//     console.log("Create Group API Decoded Email", decodedEmail);
//     console.log("Create Group API Data", req.body.name, req.body.location);
//     const user = await User.updateOne(
//       { email: decodedEmail },
//       {
//         $push: {
//           groups: { gName: req.body.name, gLocation: req.body.location },
//         },
//       }
//     );

//     res.json({ status: "ok", message: "Group created successfully" });
//   } catch (err) {
//     console.log();
//     res.json({ status: "error", message: err });
//   }
// });

app.get("/api/yourgroups", async (req, res) => {
  const token = req.headers["x-access-token"];
  console.log(token);
  try {
    const decoded = jwt.verify(token, "SheeshBro-77@!");
    const decodedEmail = decoded.email;
    console.log(decodedEmail);
    const user = await User.findOne({ email: decodedEmail });

    const groups = await Group.find({
      "group.groupInformation.groupMembers": decodedEmail,
      "group.groupId": user.groups.groupId,
    });
    console.log(user.groups);
    res.json({
      status: "ok",
      message: "Groups fetched successfully",
      data: user.groups,
    });
  } catch (err) {
    res.json({ status: "error", message: err });
  }
});

app.get("/api/profile", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "SheeshBro-77@!");
    const decodedEmail = decoded.email;
    const user = await User.findOne({ email: decodedEmail });
    res.json({
      status: "ok",
      message: "Profile fetched successfully",
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    res.json({ status: "error", message: error });
    console.log("Error", error);
  }
});
app.post("/api/profile", async (req, res) => {
  try {
    const token = req.body.token;
    const decoded = jwt.verify(token, "SheeshBro-77@!");
    const decodedEmail = decoded.email;
    const user = await User.findOneAndUpdate(
      {
        email: decodedEmail,
      },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          userName: req.body.userName,
          email: req.body.email,
        },
      }
    );
    console.log({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
    });
    console.log("dsakifjh");
    res.json({ status: "ok", message: "Profile updated successfully" });
  } catch (err) {
    res.json({ status: "error", message: err });
  }
});
app.post("/api/creategroup", async (req, res) => {
  const groupId = crypto.randomBytes(25).toString("hex");
  const token = req.body.token;
  console.log(token);
  const decoded = jwt.verify(token, "SheeshBro-77@!");
  const decodedEmail = decoded.email;
  const decodedFirstName = decoded.firstName;
  const decodedLastName = decoded.lastName;
  const decodedUserName = decoded.userName;
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedDate = dd + "/" + mm + "/" + yyyy;

  try {
    const createGroup = await Group.create({
      group: {
        email: decodedEmail,
        groupInformation: {
          email: decodedEmail,
          groupCreater: decodedEmail,
          groupName: req.body.groupName,
          groupLocation: req.body.groupLocation,
          groupDescription: req.body.groupDescription,
          groupPin: req.body.groupPin,
          groupId: groupId,
          groupDate: formattedDate,
          groupMembers: {
            memberEmail: decodedEmail,
            memberFirstName: decodedFirstName,
            memberLastName: decodedLastName,
            memberUserName: decodedUserName,
          },
        },
      },
    });

    const addGroupToUsers = await User.findOneAndUpdate(
      {
        email: decodedEmail,
      },
      {
        $push: {
          groups: {
            groupId: groupId,
            groupCreater: decodedEmail,
            groupName: req.body.groupName,
            groupLocation: req.body.groupLocation,
            groupDescription: req.body.groupDescription,
          },
        },
      }
    );
    res.json({ status: "ok", message: "Group created successfully" });
  } catch (error) {
    console.log("Error", error);
    res.json({ status: "error", message: "Group Cannot Be Created" });
  }
});

app.post("/api/joingroup", async (req, res) => {
  const token = req.body.token;
  const decoded = jwt.verify(token, "SheeshBro-77@!");
  const decodedEmail = decoded.email;
  const decodedFirstName = decoded.firstName;
  const decodedLastName = decoded.lastName;
  const decodedUserName = decoded.userName;

  try {
    const joinGroup = await Group.findOneAndUpdate(
      {
        "group.groupInformation.groupId": req.body.groupId,
        "group.groupInformation.groupMembers.memberEmail": {
          $ne: decodedEmail,
        },
      },
      {
        $push: {
          "group.groupInformation.groupMembers": {
            memberEmail: decodedEmail,
            memberFirstName: decodedFirstName,
            memberLastName: decodedLastName,
            memberUserName: decodedUserName,
          },
        },
      }
    );
    if (joinGroup) {
      const addGroupToUsers = await User.findOneAndUpdate(
        {
          email: decodedEmail,
        },
        {
          $push: {
            groups: {
              groupId: req.body.groupId,
              groupCreater: decodedEmail,
              groupName: joinGroup.group.groupInformation.groupName,
              groupLocation: joinGroup.group.groupInformation.groupLocation,
              groupDescription:
                joinGroup.group.groupInformation.groupDescription,
            },
          },
        }
      );
      res.json({ status: "ok", message: "Group joined successfully" });
    }
    if (joinGroup == null) {
      res.json({ status: "error", message: "Already Joined Group" });
    }
  } catch (error) {
    console.log("Error", error);
    res.json({ status: "error", message: "Group Cannot Be Joined" });
  }
});
app.post("/api/createevent", async (req, res) => {
  const token = req.body.token;
  const decoded = jwt.verify(token, "SheeshBro-77@!");
  const decodedEmail = decoded.email;
  const decodedFirstName = decoded.firstName;
  const decodedLastName = decoded.lastName;
  const decodedUserName = decoded.userName;

  try {
    const createevent = await Group.findOneAndUpdate(
      {
        "group.groupInformation.groupId": req.body.groupId,
      },
      {
        $push: {
          "group.groupInformation.groupEvents": {
            eventId: req.body.eventId,
            eventName: req.body.eventName,
            eventPublicDetails: req.body.eventPublicDetails,
            eventPresentationDetails: req.body.eventPresentationDetails,
            eventWorkshopDetails: req.body.eventWorkshopDetails,
            eventCategory: req.body.eventCategory,
            eventLocation: req.body.eventLocation,
            eventDate: req.body.eventDate,
            eventUrl: req.body.eventUrl,
            eventMode: req.body.eventMode,
            // $push: {
            //   "group.groupInformation.groupEvents.$[].eventMembers": {
            //     memberEmail: decodedEmail,
            //     memberFirstName: decodedFirstName,
            //     memberLastName: decodedLastName,
            //     memberUserName: decodedUserName,
            //   },
            // },
          },
        },
      }
      //  {
      //     upsert: true, // Create a new document if not found
      //     new: true, // Return the modified document
      //   }
    );

    const addMember = await Group.findOneAndUpdate(
      {
        "group.groupInformation.groupId": req.body.groupId,
        "group.groupInformation.groupEvents.eventId": req.body.eventId,
      },
      {
        $push: {
          "group.groupInformation.groupEvents.$.eventMembers": {
            memberEmail: decodedEmail,
            memberFirstName: decodedFirstName,
            memberLastName: decodedLastName,
            memberUserName: decodedUserName,
          },
        },
      }
    );

    if (createevent) {
      const addEventsToUsers = await User.findOneAndUpdate(
        {
          email: decodedEmail,
        },
        {
          $push: {
            events: {
              eventId: req.body.eventId,
              eventName: req.body.eventName,
              eventPublicDetails: req.body.eventPublicDetails,
              eventPresentationDetails: req.body.eventPresentationDetails,
              eventWorkshopDetails: req.body.eventWorkshopDetails,
              eventCategory: req.body.eventCategory,
              eventLocation: req.body.eventLocation,
              eventDate: req.body.eventDate,
              eventUrl: req.body.eventUrl,
              eventMode: req.body.eventMode,
            },
          },
        }
      );
      console.log(addEventsToUsers);
    }


    res.json({ status: "ok", message: "Event Created Successfully" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

// app.post("/api/joinevent", async (req, res) => {
//   const token = req.body.token;
//   const decoded = jwt.verify(token, "SheeshBro-77@!");
//   const decodedEmail = decoded.email;
//   const decodedFirstName = decoded.firstName;
//   const decodedLastName = decoded.lastName;
//   const decodedUserName = decoded.userName;
//   const groupId = Number(req.body.groupId);
//   const eventId = Number(req.body.eventId);
//   console.log(decodedEmail);

//   try {
//     const joinEvent = await Group.findOneAndUpdate(
//       {
//         "group.groupInformation.groupId": groupId,
//         "group.groupInformation.groupEvents.eventId": eventId,
//         "group.groupInformation.groupEvents.eventMembers.memberEmail": {
//           $ne: decodedEmail,
//         },
//       },
//       {
//         $push: {
//           "group.groupInformation.groupEvents.eventMembers": {
//             memberEmail: decodedEmail,
//             memberFirstName: decodedFirstName,
//             memberLastName: decodedLastName,
//             memberUserName: decodedUserName,
//           },
//         },
//       }
//     );
//     // if (joinEvent) {
//     //   const addEventToUsers = await User.findOneAndUpdate(
//     //     {
//     //       email: decodedEmail,
//     //     },
//     //     {
//     //       $push: {
//     //         events: {
//     //           eventId: eventId,
//     //           eventName: joinEvent.group.groupInformation.groupEvents.eventName,
//     //           eventPublicDetails:
//     //             joinEvent.group.groupInformation.groupEvents.eventPublicDetails,
//     //           eventPresentationDetails:
//     //             joinEvent.group.groupInformation.groupEvents
//     //               .eventPresentationDetails,
//     //           eventWorkshopDetails:
//     //             joinEvent.group.groupInformation.groupEvents
//     //               .eventWorkshopDetails,
//     //           eventCategory:
//     //             joinEvent.group.groupInformation.groupEvents.eventCategory,
//     //           eventLocation:
//     //             joinEvent.group.groupInformation.groupEvents.eventLocation,
//     //           eventDate: joinEvent.group.groupInformation.groupEvents.eventDate,
//     //           eventUrl: joinEvent.group.groupInformation.groupEvents.eventUrl,
//     //           eventMode: joinEvent.group.groupInformation.groupEvents.eventMode,
//     //         },
//     //       },
//     //     }
//     //   );
//     //   res.json({ status: "ok", message: "Attending Event" });
//     // }
//     if (joinEvent == null) {
//       res.json({ status: "error", message: "Already Attending Event" });
//     }
//     console.log("fhfg", joinEvent);
//   } catch (error) {
//     console.log("Error", error);
//     res.json({ status: "error", message: "Group Cannot Be Joined" });
//   }
// });

app.post("/api/checkabusive", async (req, res) => {
  var badWords = ["shit", "Holyshit", "holyshit", "nonsense", "idiot", "stupid", "Stupid"];
  const blogContent = req.body.blogContent;
  const trimmedBlogContent = blogContent.trim();
  const dataA = trimmedBlogContent.replace(/^\s+|\s+$/g, " ");

  const finalData = dataA.replace(/\n/g, " ");
  const lowerdCaseBlogContent = finalData.toLowerCase();

  const x = lowerdCaseBlogContent.replace(/\s{2,}/g, " ").trim();
  const splittedBlogContent = x.split(" ");

  console.log(splittedBlogContent);

  const intersection = badWords.filter((element) =>
    splittedBlogContent.includes(element)
  );

  console.log("csdcsd", intersection.length);
  const badWordsCount = Number(intersection.length);
  if (badWordsCount == 0) {
    res.json({
      status: "ok",
      message: "no abusive words found",
    });
  } else {
    res.json({
      status: "error",
      message: "Contains abusive words",
    });
  }
});

app.post("/api/createblog", async (req, res) => {

  var badWords = ["fuck", "fkng", "asshole", "Fuck", "bitch", "Bitch", "BITCH"];
  const token = req.body.token;
  const decoded = jwt.verify(token, "SheeshBro-77@!");
  const decodedEmail = decoded.email;
  const decodedUserName = decoded.userName;

  const blogContent = req.body.blogContent;
  const trimmedBlogContent = blogContent.trim();
  const dataA = trimmedBlogContent.replace(/^\s+|\s+$/g, " ");

  const finalData = dataA.replace(/\n/g, " ");
  const lowerdCaseBlogContent = finalData.toLowerCase();

  const x = lowerdCaseBlogContent.replace(/\s{2,}/g, " ").trim();
  const splittedBlogContent = x.split(" ");

  console.log(splittedBlogContent);

  const intersection = badWords.filter((element) =>
    splittedBlogContent.includes(element)
  );

  console.log("csdcsd", intersection.length);
  const badWordsCount = Number(intersection.length);

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedDate = dd + "/" + mm + "/" + yyyy;

  if (badWordsCount == 0) {
    console.log("True");
    try {
      const createBlog = await Group.findOneAndUpdate(
        {
          "group.groupInformation.groupId": req.body.groupId,
        },
        {
          $push: {
            "group.groupInformation.groupMembersBlogs": {
              blogId: req.body.blogId,
              blogTitle: req.body.blogTitle,
              blogContent: req.body.blogContent,
              blogDate: formattedDate,
              blogAuthor: decodedUserName,
              blogAuthorEmail: decodedEmail,
              blogImageUrl: req.body.blogImageUrl,
            },
          },
        }
      );
      res.json({ status: 200, message: "Blog Created Successfully" });
    } catch (err) {
      console.log(err);
      console.log("Error", err);
      res.json({ status: 400, message: err });
    }
  } else {
    console.log("False");
    res.json({ status: 400, message: "Blog Contains Bad Words" });
  }
});

app.post("/api/specificgroup", async (req, res) => {
  const token = req.body.token;
  const decoded = jwt.verify(token, "SheeshBro-77@!");
  const decodedEmail = decoded.email;
  console.log(decodedEmail);
  try {
    const specificGroup = await Group.findOne({
      "group.groupInformation.groupId": req.body.groupId,
    });

    const showMembers = specificGroup.group.groupInformation.groupMembers;

    const x = showMembers.filter((member) => {
      if (member.memberEmail === decodedEmail) {
        return true;
      }
    });
    console.log(x.length);
    if (x.length > 0) {
      res.json({ status: "ok", message: specificGroup, memberJoined: true });
    } else {
      res.json({ status: "ok", message: specificGroup, memberJoined: false });
    }
  } catch (err) {
    res.json({
      status: "error",
      message: "Cannot find group",
    });
  }
});

app.post("/api/joinevent", async (req, res) => {
  const token = req.body.token;
  const decoded = jwt.verify(token, "SheeshBro-77@!");
  const decodedEmail = decoded.email;
  const decodedFirstName = decoded.firstName;
  const decodedLastName = decoded.lastName;
  const decodedUserName = decoded.userName;
  try {
    const joinEvent = await Group.findOneAndUpdate(
      {
        "group.groupInformation.groupId": req.body.groupId,
        "group.groupInformation.groupEvents.eventId": req.body.eventId,
      },
      {
        $push: {
          "group.groupInformation.groupEvents.$.eventMembers": {
            memberEmail: decodedEmail,
            memberFirstName: decodedFirstName,
            memberLastName: decodedLastName,
            memberUserName: decodedUserName,
          },
        },
      }
    );

    if (joinEvent) {
      const addEventToUsers = await User.findOneAndUpdate(
        {
          email: req.body.memberEmail,
        },
        {
          //work to do here
          $push: {
            events: {
              eventId: req.body.eventId,
              eventName: req.body.eventName,
              eventPublicDetails: req.body.eventPublicDetails,
              eventPresentationDetails: req.body.eventPresentationDetails,
              eventWorkshopDetails: req.body.eventWorkshopDetails,
              eventCategory: req.body.eventCategory,
              eventLocation: req.body.eventLocation,
              eventDate: req.body.eventDate,
              eventUrl: req.body.eventUrl,
              eventMode: req.body.eventMode,
            },
          },
        }
      );
    }
    res.json({ status: "ok", message: "Event Joined Successfully" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});
app.get("/api/getallgroups", async (req, res) => {
  const token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, "SheeshBro-77@!");
  const decodedEmail = decoded.email;

  console.log("Decoded Email: ", decodedEmail);
  try {
    const getAllGroups = await Group.find({});
    const getAllUserGroups = await User.find({
      email: decodedEmail,
    });

    const groupIds = getAllUserGroups.map((group) => {
      return group.groups.map((group) => {
        return group.groupId;
      });
    });
    const x = getAllGroups.map((group) => {
      return {
        groupInformation: group.group.groupInformation,
      };
    });
    // const y = x.filter((group) => {
    //   console.log(groupIds);
    //   return groupIds.includes(group.groupInformation.groupId);
    // });

    const y = x.filter((x) => {
      return groupIds.map((group) => {
        console.log(group);
        // return !group.includes(x.groupInformation.groupId);
      });
    });

    // console.log(y);
    res.json({ status: "ok", message: getAllGroups });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

app.post("/api/exitevent", async (req, res) => {
  try {
    const exitGroup = await Group.findOneAndUpdate(
      {
        "group.groupInformation.groupId": req.body.groupId,
        "group.groupInformation.groupEvents.eventId": req.body.eventId,
      },
      {
        $pull: {
          "group.groupInformation.groupEvents.$[].eventMembers": {
            memberEmail: req.body.memberEmail,
            memberLastName: req.body.memberLastName,
            memberFirstName: req.body.memberFirstName,
            memberUserName: req.body.memberUserName,
          },
        },
      }
    );
    console.log("Exit Group", exitGroup);
    res.json({ status: "ok", message: "Group Exited Successfully" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

app.post("/api/allblogs", async (req, res) => {
  console.log("mdns");
  try {
    const getGroupBlogs = await Group.find({
      "group.groupInformation.groupId": req.body.groupId,
    });
    const x = getGroupBlogs.map((i) => {
      return i.group.groupInformation.groupMembersBlogs;
    });
    console.log(x);

    res.json({
      status: "ok",
      message: x,
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

app.post("/api/getspecificblog", async (req, res) => {
  const groupId = req.body.groupId;
  const blogId = Number(req.body.blogId);
  try {
    const getSpecificBlog = await Group.find({
      "group.groupInformation.groupId": groupId,
      "group.groupInformation.groupMembersBlogs.blogId": blogId,
    });

    const x = getSpecificBlog.map((i) => {
      return i.group.groupInformation.groupMembersBlogs;
    });

    const y = x.map((i) => {
      return i.filter((i) => {
        return i.blogId == blogId;
      });
    });
    console.log(y);
    res.json({
      status: "ok",
      message: y,
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

app.post("/api/addcomment", async (req, res) => {
  const groupId = req.body.groupId;
  const blogId = Number(req.body.blogId);
  const commentId = Number(req.body.commentId);
  const token = req.body.token;
  const decoded = jwt.verify(token, "SheeshBro-77@!");
  const decodedEmail = decoded.email;
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedDate = dd + "/" + mm + "/" + yyyy;
  try {
    const addComment = await Group.findOneAndUpdate(
      {
        "group.groupInformation.groupId": groupId,
        "group.groupInformation.groupMembersBlogs.blogId": blogId,
      },
      {
        $push: {
          "group.groupInformation.groupMembersBlogs.$.blogComments": {
            commentId: commentId,
            comment: req.body.comment,
            commentBy: decodedEmail,
            commentDate: formattedDate,
          },
        },
      }
    );
    res.json({
      status: "ok",
      message: "Comment Added Successfully",
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

app.post("/api/getcomments", async (req, res) => {
  const groupId = req.body.groupId;
  const blogId = Number(req.body.blogId);
  try {
    const getComments = await Group.find({
      "group.groupInformation.groupId": groupId,
      "group.groupInformation.groupMembersBlogs.blogId": blogId,
    });

    const x = getComments.map((i) => {
      return i.group.groupInformation.groupMembersBlogs;
    });
    const y = x.map((i) => {
      return i.filter((i) => {
        return i.blogId === blogId;
      });
    });
    const z = y.map((i) => {
      return i.map((i) => {
        return i.blogComments;
      });
    });

    res.json({
      status: "ok",
      message: z,
    });
    console.log(y);
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

app.post("/api/exitgroup", async (req, res) => {
  try {
    const exitGroup = await Group.findOneAndUpdate(
      {
        "group.groupInformation.groupId": req.body.groupId,
      },
      {
        $pull: {
          "group.groupInformation.groupMembers": {
            memberEmail: req.body.memberEmail,
            memberLastName: req.body.memberLastName,
            memberFirstName: req.body.memberFirstName,
            memberUserName: req.body.memberUserName,
          },
        },
      }
    );
    console.log("Exit Group", exitGroup);
    res.json({ status: "ok", message: "Group Exited Successfully" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});
// app.post("/upload", upload.single("file"), async (req, res) => {
//   console.log("hello");
//   console.log(req.file);
//   if (req.file == undefined || req.file == null) {
//     res.json({
//       message: "Please upload an image",
//     });
//   } else {
//     const filePath = `./files/${req.file.filename}`;
//     console.log("File path:", filePath);
//     const file = await client.add(globSource(filePath));
//     const CID = file.cid.toString();
//     console.log("success");
//     console.log(CID);
//     res.json({
//       message: "success",
//       CID: CID,
//     });
//   }
// });

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload a file" });
  }

  try {
    // Save file data to MongoDB using GridFS
    const fileId = req.file.filename;
    console.log(req.file)
    res.json({ message: "File uploaded successfully", fileId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/api/addimagetogallery", async (req, res) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedDate = dd + "/" + mm + "/" + yyyy;
  console.log(req.body);
  try {
    const addImageToGallery = await Group.findOneAndUpdate(
      {
        "group.groupInformation.groupId": req.body.groupId,
      },
      {
        $push: {
          "group.groupInformation.groupGallery": {
            imageId: crypto.randomBytes(20).toString("hex"),
            imageContent: req.body.imageContent,
            imagePostedOn: formattedDate,
          },
        },
      }
    );
    res.json({
      status: "ok",
      message: "Image Added Successfully",
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

app.post("/api/gallery", async (req, res) => {
  try {
    const getGallery = await Group.find({
      "group.groupInformation.groupId": req.body.groupId,
    });

    const groupGallery = getGallery.map((i) => {
      return i.group.groupInformation.groupGallery;
    });

    console.log(groupGallery);
    res.json({
      status: "ok",
      message: groupGallery,
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

app.post("/api/creatediscussion", async (req, res) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedDate = dd + "/" + mm + "/" + yyyy;

  const decoded = jwt.verify(req.body.token, "SheeshBro-77@!");
  const decodedEmail = decoded.email;

  const discussionId = crypto.randomBytes(20).toString("hex");
  try {
    const createDiscussion = await Group.findOneAndUpdate(
      {
        "group.groupInformation.groupId": req.body.groupId,
      },
      {
        $push: {
          "group.groupInformation.groupDiscussions": {
            discussionId: discussionId,
            discussionTitle: req.body.discussionTitle,
            discussionDescription: req.body.discussionDescription,
            discussionCreatedBy: decodedEmail,
            discussionCreatedOn: formattedDate,
          },
        },
      }
    );
    res.json({
      status: "ok",
      message: "Discussion Created Successfully",
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

app.post("/api/getalldiscussions", async (req, res) => {
  try {
    const getDiscussions = await Group.find({
      "group.groupInformation.groupId": req.body.groupId,
    });
    const groupDiscussions = getDiscussions.map((i) => {
      return i.group.groupInformation.groupDiscussions;
    });
    res.json({
      status: "ok",
      message: groupDiscussions,
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

app.post("/api/getspecificdiscussion", async (req, res) => {
  try {
    const getSpecificDiscussion = await Group.find({
      "group.groupInformation.groupId": req.body.groupId,
      "group.groupInformation.groupDiscussions.discussionId":
        req.body.discussionId,
    });
    const specificDiscussion = getSpecificDiscussion.map((i) => {
      return i.group.groupInformation.groupDiscussions;
    });

    const y = specificDiscussion.map((i) => {
      return i.filter((j) => {
        return j.discussionId === req.body.discussionId;
      });
    });

    res.json({
      status: "ok",
      message: y,
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

app.post("/api/creatediscussioncomment", async (req, res) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedDate = dd + "/" + mm + "/" + yyyy;

  const decoded = jwt.verify(req.body.token, "SheeshBro-77@!");
  const decodedEmail = decoded.email;

  try {
    const createDiscussionComment = await Group.findOneAndUpdate(
      {
        "group.groupInformation.groupId": req.body.groupId,
        "group.groupInformation.groupDiscussions.discussionId":
          req.body.discussionId,
      },
      {
        $push: {
          "group.groupInformation.groupDiscussions.$.discussionComments": {
            commentId: crypto.randomBytes(20).toString("hex"),
            commentContent: req.body.commentContent,
            commentCreatedBy: decodedEmail,
            commentCreatedOn: formattedDate,
          },
        },
      }
    );
    res.json({
      status: "ok",
      message: "Comment Created Successfully",
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

app.post("/api/getdiscussioncomments", async (req, res) => {
  try {
    const getComments = await Group.find({
      "group.groupInformation.groupId": req.body.groupId,
      "group.groupInformation.groupDiscussions.discussionId":
        req.body.discussionId,
    });
    const discussionComments = getComments.map((i) => {
      return i.group.groupInformation.groupDiscussions;
    });

    const y = discussionComments.map((i) => {
      return i.filter((j) => {
        return j.discussionId === req.body.discussionId;
      });
    });

    const z = y.map((i) => {
      return i.map((j) => {
        return j.discussionComments;
      });
    });

    res.json({
      status: "ok",
      message: z,
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});
const stripe = require("stripe")(
  "sk_test_51IUrAELikeYihbAbavZc3b6mThG9KXN1XayRH5QJV7io0K4OCjusUVwv31oTbBoZ6mLA0nPld1kEH3RLUqscUOwb00HUilbCQP"
);

const storeItems = new Map([
  [1, { priceInCents: 100000, name: "Fund Raising Payment Slot 1" }],
  [2, { priceInCents: 500000, name: "Fund Raising Payment Slot 2" }],
  [3, { priceInCents: 750000, name: "Fund Raising Payment Slot 3" }],
  [4, { priceInCents: 1000000, name: "Fund Raising Payment Slot 4" }],
]);

app.post("/create-checkout-session", async (req, res) => {
  console.log(req.body.eventId);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `http://localhost:6969/success?eventId=${req.body.eventId}&session_id={CHECKOUT_SESSION_ID}`,
      // success_url : `http://localhost:5500/success.html`,
      cancel_url: `http://localhost:6969/cancel`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
app.get("/success", async (req, res) => {
  try {
    console.log(req.query.session_id);
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
    const customer = await stripe.customers.retrieve(session.customer);
    console.log(customer.email);
    const str = session.amount_total;
    var result = str.toString().substring(0, str.toString().length - 2);
    console.log(result);
    const num = Number(result);
    const eventId = req.query.eventId;
    console.log(eventId);
    try {
      const findFunds = await Fundraising.find({
        "fundraising.information.fundRaisingEventId": req.query.eventId,
      });
      console.log(findFunds);

      const x = findFunds.map((x) => {
        return x.fundraising.information.filter((y) => {
          return req.query.eventId == y.fundRaisingEventId;
        });
      });
      const totalFunds = x.map((i) => {
        return i.map((j) => {
          return j.fundRaisingEventFundRaised;
        });
      });
      console.log(totalFunds);
      const fundsDone = Number(totalFunds[0][0]);

      console.log(fundsDone, "sfsdfd");

      const finalForNowFunds = fundsDone + num;
      console.log(finalForNowFunds);
      const updateFunds = await Fundraising.findOneAndUpdate(
        {
          "fundraising.information.fundRaisingEventId": req.query.eventId,
        },
        {
          $set: {
            "fundraising.information.$.fundRaisingEventFundRaised":
              finalForNowFunds,
          },
        }
      );
      res.send(`<html><head><style>body{font-family:Arial,sans-serif;background-color:#f4f4f4;margin:0;padding:0;display:flex;justify-content:center;align-items:center;height:100vh}.container{text-align:center;padding:20px;border-radius:10px;box-shadow:0 2px 4px rgba(0,0,0,.1)}.container h1{color:#000;margin-bottom:20px}.card{background-color:#fff;color:#000;padding:20px;border-radius:10px;margin-bottom:20px;position:relative;overflow:hidden}.card:before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(to bottom,rgba(0,0,0,0.3) 0,rgba(0,0,0,0.1) 100%)}.btn{display:inline-block;padding:10px 20px;color:#000;text-decoration:none;border-radius:5px;transition:background-color .3s ease;border: 2px solid #000;background-color: transparent}.btn:hover{background-color:rgba(0,0,0,0.2)}</style></head><body><div class="container"><div class="card"><h1>Thanks for your Payment, ${customer.name}!</h1></div><a href="http://localhost:3000/fund-raising" class="btn">Go to Fund Raising</a></div></body></html>`);

    } catch (err) {
      console.log(err);
      res.json({ status: "error", message: err });
    }
  } catch (err) {
    console.log(err);
    res.send(
      `<html><body><h1>Something went wrong please try again later</h1><a href="http://localhost:3000/fund-raising">Go to Fund Raising</a></body></html>`
    );
  }
});
app.get("/cancel", async (req, res) => {
  res.send(`<html><body><h1>You cancelled your Payment</h1></body></html>`);
});

app.post("/api/create-fundraising-event", async (req, res) => {
  console.log("hello");
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedDate = dd + "/" + mm + "/" + yyyy;
  try {
    const decoded = jwt.verify(req.body.token, "SheeshBro-77@!");
    const decodedEmail = decoded.email;
    const fundRaisingEventId = crypto.randomBytes(20).toString("hex");

    await Fundraising.findOneAndUpdate(
      {
        "fundraising.hash": "f6d5436692a60a760b2ebad259af23751c7355c0",
      },
      {
        $push: {
          "fundraising.information": {
            fundRaisingEventId: fundRaisingEventId,
            fundRaisingDocument: req.body.fundRaisingDocument,
            fundRaisingEventName: req.body.fundRaisingEventName,
            fundRaisingEventDescription: req.body.fundRaisingEventDescription,
            createdBy: decodedEmail,
            createdAt: formattedDate,
            fundRaisingEventFundGoal: req.body.fundRaisingEventFundGoal,
            fundRaisingEventFundRaised: 0,
          },
        },
      },
      {
        upsert: true, // Create a new document if not found
        new: true, // Return the modified document
      }
    );
    res.json({
      status: "ok",
      message: "Fund Raising Event Created Successfully",
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});

app.post("/api/updatefunds", async (req, res) => {
  try {
    const findFunds = await Fundraising.find({
      "fundraising.information.fundRaisingEventId": req.body.fundRaisingEventId,
    });

    const x = findFunds.map((x) => {
      return x.fundraising.information.filter((y) => {
        return req.body.fundRaisingEventId == y.fundRaisingEventId;
      });
    });
    const totalFunds = x.map((i) => {
      return i.map((j) => {
        return j.fundRaisingEventFundRaised;
      });
    });
    const fundsDone = Number(totalFunds[0][0]);
    const finalForNowFunds = fundsDone + req.body.fundRaisingEventFundRaised;
    console.log(finalForNowFunds);
    const updateFunds = await Fundraising.findOneAndUpdate(
      {
        "fundraising.information.fundRaisingEventId":
          req.body.fundRaisingEventId,
      },
      {
        $set: {
          "fundraising.information.$.fundRaisingEventFundRaised":
            finalForNowFunds,
        },
      }
    );
    res.json({
      status: "ok",
      message: "Funds Updated Successfully",
      data: findFunds,
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err });
  }
});
app.get("/api/getfundraisingevents", async (req, res) => {
  try {
    const getFundRaising = await Fundraising.find({});
    console.log(getFundRaising);

    const data = getFundRaising.map((x) => {
      return x.fundraising.information.map((y) => {
        return y;
      });
    });
    res.json({
      status: "ok",
      message: "Fund Raising Events Fetched Successfully",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: "error",
      message: err,
    });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen("6969", () => {
      console.log("Server Started on Port 6969");
    });
  })
  .catch((error) => {
    console.log(error);
  });
