import React, {ReactNode} from "react";
import {DirectComment} from "../pages/api/direct-comments";
import styles from "../styles/feedback.module.scss";

export interface FeedbackFormProps {
  fromPage: string;
}

interface FeedbackFormState {
  expanded: boolean,
  text: string,
  sender: string,
  sharable: boolean
}

export default class FeedbackForm extends React.Component {
  state: FeedbackFormState
  props: FeedbackFormProps

  constructor(props: FeedbackFormProps) {
    super(props);

    this.state = {
      expanded: props.fromPage == "comment-page",
      text: "",
      sender: "",
      sharable: false
    }
  }

  expand(): void {
    this.setState({
      expanded: true
    });
  }

  updateText(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    if (e.target.value.length <= 5000) {
      this.setState({
        text: e.target.value
      });
    }
  }

  updateSender(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.value.length <= 100) {
      this.setState({
        sender: e.target.value
      });
    }
  }

  updateSharable(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      canBeShared: e.target.checked
    });
  }

  submit(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    const comment: DirectComment = {
      from: this.props.fromPage,
      text: this.state.text,
      sender: this.state.sender,
      sharable: this.state.sharable
    };
    fetch("/api/direct-comments", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({comment})
    });
    this.setState({
      expanded: false,
      text: "",
      sender: "",
      sharable: false
    });
  }

  cancel(): void {
    this.setState({
      expanded: false
    });
  }

  render(): ReactNode {
    if (!this.state.expanded) {
      return (
        <button onClick={this.expand.bind(this)}
                className={styles.actionButton}>
          send a comment
        </button>
      );
    }

    return (
      <form className={styles.feedbackContainer}>
        <h2 className={styles.feedbackHeading}>Send a comment</h2>
        <label className={styles.inputLabel}>Comment:</label>
        <textarea className={styles.commentArea}
                  placeholder={"Write your message here"}
                  value={this.state.text}
                  onChange={this.updateText.bind(this)} />
        <label className={styles.inputLabel}
               htmlFor={"sender"}>
          (Optional) Add contact info if you want me to respond, or a name to
          identify yourself.
        </label>
        <input className={styles.identifierArea}
               type={"text"}
               name={"sender"}
               autoComplete={"on"}
               placeholder={"Add identifier here"}
               value={this.state.sender}
               onChange={this.updateSender.bind(this)} />
        <div className={styles.sameLine}>
          <label className={styles.inputLabel}
                htmlFor={"can-be-shared"}>
            Do I have permission to share this comment?
          </label>
          <input type={"checkbox"}
                name={"can-be-shared"}
                checked={this.state.sharable}
                onChange={this.updateSharable.bind(this)} />
        </div>
        <div className={styles.sameLine}>
          <input className={styles.actionButton}
                type={"submit"}
                value={"send"}
                onSubmit={this.submit.bind(this)} />
          <button className={styles.actionButton}
                onClick={this.cancel.bind(this)}>
            cancel
          </button>
        </div>
      </form>
    );
  }
}