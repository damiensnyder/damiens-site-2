import React from "react";
import FeedbackForm from "../components/FeedbackForm";
import LinkHeader from "../components/LinkHeader";
import NormalHead from "../components/NormalHead";
import general from "../styles/general.module.css";

export default function CommentPage() {
  return (
    <div className={general.pageContainer}>
      <NormalHead title={"Send me a comment"} />
      <div className={general.postContainer}>
        <LinkHeader path={["other"]} />
        <FeedbackForm fromPage={"comment-page"} />
      </div>
    </div>
  );
}