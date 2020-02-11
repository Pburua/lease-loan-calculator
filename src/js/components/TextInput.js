import React from 'react';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.defValue,
    }
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value })
  }

  async loadIpInfo() {
    const IP_INFO_ACCESS_TOKEN = '09f4aded924de8';

    const response = await fetch('https://ipinfo.io/json?token=' + IP_INFO_ACCESS_TOKEN);
    return await response.json();
  }

  componentDidMount() {
    if (this.props.idName === 'postCode') {
      this.loadIpInfo()
        .then((ipData) => {
          this.setState({
            inputValue: ipData.postal,
          });
        });
    }
  }

  render() {
    return (
      <div className={'text-input'}>
        <label htmlFor={this.props.idName}>{this.props.pageName}</label>
        <input id={this.props.idName} type="text"
               value={this.state.inputValue}
               onChange={this.handleChange.bind(this)}/>
      </div>
    );
  }
}

export default TextInput;