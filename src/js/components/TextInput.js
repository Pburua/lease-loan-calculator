import React from 'react';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.defValue,
    }
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
    this.props.updateState({
      [this.props.idName]: event.target.value,
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.idName === 'postCode' && props.defValue !== state.inputValue) {
      return {
        inputValue: props.defValue,
      };
    }
    return null;
  }

  render() {
    return (
      <div className={'text-input'}>
        <label htmlFor={this.props.idName}>{this.props.pageName}</label>
        <input id={this.props.idName} type="text"
               value={this.state.inputValue}
               onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}

export default TextInput;