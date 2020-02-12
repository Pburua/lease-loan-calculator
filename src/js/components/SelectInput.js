import React from 'react';

class SelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.defValue,
    }
  }

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
    this.props.updateState({
      [this.props.idName]: parseInt(event.target.value),
    });
  };

  render() {
    let options = [];
    for (let i = 0; i < this.props.values.length; i += 1) {
      options.push(
        <option value={this.props.values[i]} key={this.props.values[i]}>{this.props.values[i]}</option>
      );
    }

    return (
      <div className={'select-input'}>
        <label htmlFor={this.props.idName}>{this.props.pageName}</label>
        <select id={'lease-' + this.props.idName} defaultValue={this.state.inputValue} onChange={this.handleChange}>
          {options}
        </select>
      </div>
    );
  }
}

export default SelectInput;