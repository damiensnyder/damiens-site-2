import React, {ReactElement} from 'react';

export interface FeedbackFormProps {
  fromPage?: string
}

interface FeedbackFormState {
  expanded: boolean,
  messageText: string,
  identifier: string,
  canBePublished: boolean
}

export default class FeedbackForm extends React.Component {
  state: FeedbackFormState

  constructor(props: FeedbackFormProps) {
    super(props);

    this.state = {
      expanded: false,
      messageText: "",
      identifier: "",
      canBePublished: true
    }
  }

  expand(): void {
    this.setState({
      expanded: true
    });
  }

  updateMessageText(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.setState({
      messageText: e.target.value
    });
  }

  updateIdentifier(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      identifier: e.target.value
    });
  }

  updateCanBePublished(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      canBePublished: e.target.checked
    });
  }

  submit(): void {
    console.log(this.state);
  }

  render(): ReactElement {
    if (!this.state.expanded) {
      return <button onClick={this.expand}>Send a comment</button>
    }

    return (
      <form>
        <h2>Send a comment</h2>
        <p>Comment:</p>
        <textarea placeholder={"Write your message here..."}
                  onChange={this.updateMessageText}>
          {this.state.messageText}
        </textarea>
        <label htmlFor={"identifier"}>
          Add contact info if you want me to message you in response, or a name
          if you just want to identify yourself, or nothing to remain
          anonymous.
        </label>
        <input type={"text"}
               name={"identifier"}
               autoComplete={"on"}
               placeholder={"Enter identifier here"}
               value={this.state.identifier}
               onChange={this.updateIdentifier} />
        <label htmlFor={"can-be-published"}>
          Do I have permission to share this comment?
        </label>
        <input type={"checkbox"}
               name={"can-be-published"}
               checked={this.state.canBePublished}
               onChange={this.updateCanBePublished} />
        <input type={"submit"}
               value={"Send"}
               onSubmit={this.submit} />
      </form>
    );
  }
}