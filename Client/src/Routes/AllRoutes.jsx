import { HorizontalRule } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Event from "../Components/Event/Event";
import LayoutPage from "../Components/Main Page/LayoutPage";
import Home from "../Pages/HomePage";
import HorizontalLinearStepper from "../CreateYourGroup/HorizontalLinearStepper";
import Navbar2 from "../Components/Navbar/Navbar2";
import Description from "../Components/Description/Description";
import Group from "../Pages/Group";
import SavedEvents from "../Pages/SavedEvents";
import FormikForm from "../Components/Profile/FormikForm";
import Profile from "../Components/Profile/Profile";
import Members from "../Components/Members/Members";
import X from "../Components/CreateEvents/HorizontalLinearStepper";
import AllGroups from "../Pages/AllGroups";
import GroupInformation from "../Components/GroupInformation/GroupInformation";
import SpecificEvent from "../Components/Event/SpecificEvent";
import Blogs from "../Components/Blogs/Blogs";
import CreateBlog from "../Components/Blogs/CreateBlog";
import DetailedBlogInformation from "../Components/Blogs/DetailedBlogInformation";
// import Attending from "../Components/Attending/Attending";
import Discussion from "../Components/Discussion/Discussion";
import Gallery from "../Components/Gallery/Gallery";
import Fundraising from "../Components/Fundraising/Fundraising";
import CreateFundraising from "../Components/Fundraising/CreateFundraising";
import CreateDiscussion from "../Components/Discussion/CreateDiscussion";
export default function AllRoutes() {
  return (
    <Switch>
      <Route exact path="/">
        <LayoutPage />
      </Route>

      <Route exact path="/creategroup">
        <HorizontalLinearStepper />
      </Route>
      <Route exact path="/events">
        <div>
          <Navbar2 />
          <Event />
        </div>
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/eventinformation/:groupid/:eventid">
        <SpecificEvent />
      </Route>
      <Route exact path="/events/:id">
        <Description />
      </Route>
      <Route exact path="/yourgroups">
        <Group />
      </Route>
      <Route exact path="/gallery/:groupId">
        <Gallery />
      </Route>
      <Route exact path="/fund-raising">
        <Fundraising />
      </Route>
      <Route exact path="/creatediscussion/:groupId">
        <CreateDiscussion />
      </Route>
      <Route exaact path="/discussion/:groupId">
        <Discussion />
      </Route>
      <Route exact path="/yourevents">
        <SavedEvents />
      </Route>
      <Route exact path="/joingroup/:id">
        <GroupInformation />
      </Route>
      <Route exact path="/viewblog/:groupid/:blogid">
        <DetailedBlogInformation />
      </Route>
      <Route exact path="/blogs/:id">
        <Blogs />
      </Route>
      <Route exact path="/create-fundraising">
        <CreateFundraising />
      </Route>
      {/* <Route exact path="/upcomingEvents">
        <Attending />
      </Route> */}
      <Route path="/yourgroups/:id">
        <Event />
      </Route>
      {/* <Route path="/:id/members">
        <Members />
      </Route> */}
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/allgroups">
        <AllGroups />
      </Route>
      <Route exact path="/createblog/:id">
        <CreateBlog />
      </Route>
      <Route exact path="/createevent/:id">
        <X />
      </Route>
      <Route exact path="*">
        <h1>404 Not Found</h1>
      </Route>
    </Switch>
  );
}
