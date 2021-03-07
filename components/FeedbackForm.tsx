import React, {ReactNode} from 'react';
import styles from "../styles/feedback.module.scss";

export interface FeedbackFormProps {
  fromPage: string;
}

interface FeedbackFormState {
  expanded: boolean,
  messageText: string,
  identifier: string,
  canBePublished: boolean
}

export default class FeedbackForm extends React.Component {
  state: FeedbackFormState
  props: FeedbackFormProps

  constructor(props: FeedbackFormProps) {
    super(props);

    this.state = {
      expanded: false,
      messageText: "",
      identifier: "",
      canBePublished: false
    }
  }

  expand(): void {
    this.setState({
      expanded: true
    });
  }

  updateMessageText(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    if (e.target.value.length <= 5000) {
      this.setState({
        messageText: e.target.value
      });
    }
  }

  updateIdentifier(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.value.length <= 100) {
      this.setState({
        identifier: e.target.value
      });
    }
  }

  updateCanBePublished(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      canBePublished: e.target.checked
    });
  }

  submit(): void {
    const comment = {
      text: this.state.messageText,
      identifier: this.state.identifier,
      publishable: this.state.canBePublished
    };
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
                  value={this.state.messageText}
                  onChange={this.updateMessageText.bind(this)} />
        <label className={styles.inputLabel}
               htmlFor={"identifier"}>
          (Optional) Add contact info if you want me to respond, or a name to
          identify yourself.
        </label>
        <input className={styles.identifierArea}
               type={"text"}
               name={"identifier"}
               autoComplete={"on"}
               placeholder={"Add identifier here"}
               value={this.state.identifier}
               onChange={this.updateIdentifier.bind(this)} />
        <div className={styles.sameLine}>
          <label className={styles.inputLabel}
                htmlFor={"can-be-published"}>
            Do I have permission to share this comment?
          </label>
          <input type={"checkbox"}
                name={"can-be-published"}
                checked={this.state.canBePublished}
                onChange={this.updateCanBePublished.bind(this)} />
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