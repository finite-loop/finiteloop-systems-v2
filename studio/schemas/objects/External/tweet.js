import React from "react";
// import getYouTubeId from "get-youtube-id";
// import YouTube from "react-youtube";
import { Tweet } from "react-twitter-widgets";

const Preview = ({ value }) => {
  const { url } = value;
  const list = url.split("/");

  const id = list.pop();

  return <Tweet tweetId={id} />;
};

export default {
  name: "tweet",
  type: "object",
  title: "Add Twitter Tweet",
  fields: [
    {
      name: "url",
      type: "url",
      title: "Twittwe Tweet URL"
    }
  ],
  preview: {
    select: {
      url: "url"
    },
    component: Preview
  }
};
