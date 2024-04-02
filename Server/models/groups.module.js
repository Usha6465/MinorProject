const mongoose = require("mongoose");

const Groups = new mongoose.Schema({
  group: {
    email: { type: String, required: true },

    groupInformation: {
      groupId: { type: String, required: true },
      groupCreater: { type: String, required: true },
      groupName: { type: String, required: true },
      groupLocation: { type: String, required: true },
      groupDescription: { type: String, required: true },
      groupPin: { type: String },
      groupDate: { type: String, required: true },

      groupMembers: {
        type: Array,
        memberEmail: { type: String, required: true, unique: true },
        memberFirstName: { type: String, required: true },
        memberLastName: { type: String, required: true },
        memberUserName: { type: String, required: true },
      },

      groupEvents: {
        type: Array,
        eventId: { type: String, required: true },
        eventName: { type: String, required: true },
        eventPublicDetails: { type: String, required: true },
        eventPresentationDetails: { type: String, required: true },
        eventWorkshopDetails: { type: String, required: true },
        eventCategory: { type: String, required: true },
        eventLocation: { type: String, required: true },
        eventDate: { type: String, required: true },
        eventUrl: { type: String, required: true },
        eventMode: { type: String, required: true },

        eventMembers: {
          type: Array,
          memberFirstName: { type: String, required: true },
          memberLastName: { type: String, required: true },
          memberUserName: { type: String, required: true },
          memberEmail: { type: String, required: true },
        },
      },

      groupMembersBlogs: {
        type: Array,
        blogId: { type: String, required: true },
        blogTitle: { type: String, required: true },
        blogContent: { type: String, required: true },
        blogDate: { type: String, required: true },
        blogAuthor: { type: String, required: true },
        blogAuthorEmail: { type: String, required: true },
        blogImageUrl: { type: String, required: true },

        comments: {
          type: Array,
          commentId: { type: String, required: true },
          commentContent: { type: String, required: true },
          commentDate: { type: String, required: true },
          commentBy: { type: String, required: true },
        },
      },
      groupDiscussions: {
        type: Array,
        discussionId: { type: String, required: true },
        discussionTitle: { type: String, required: true },
        discussionDescription: { type: String, required: true },
        discussionCreatedOn: { type: String, required: true },
        discussionCreatedBy: { type: String, required: true },
        comments: {
          type: Array,
          commentId: { type: String, required: true },
          commentContent: { type: String, required: true },
          commentCreatedOn: { type: String, required: true },
          commentCreatedBy: { type: String, required: true },
        },
      },
      groupGallery: {
        type: Array,
        imageId: { type: String, required: true },
        imageContent: { type: String, required: true },
        imagePostedOn: { type: String, required: true },
      },
    },
  },
});
const groups = mongoose.model("Groups", Groups);
module.exports = groups;
