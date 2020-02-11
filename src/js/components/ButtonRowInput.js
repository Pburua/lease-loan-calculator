import React from 'react';
import ButtonInput from './ButtonInput';

class ButtonRowInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defValue,
    }
  }

  updateValue = (btnValue) => {
    this.setState( {
      value: btnValue,
    });
  };

  render() {
    let buttons = [];
    for (let i = 0; i < this.props.values.length; i += 1) {
      let btnClass = '';
      if (this.props.values[i] === this.state.value)
        btnClass = 'selected';
      buttons.push(
        <ButtonInput
          btnClass={btnClass}
          key={this.props.idName + '' + this.props.values[i]}
          updateValueFunc={this.updateValue}
          btnValue={this.props.values[i]}
        />
      );
    }

    return (
      <div className={'btn-row-input'}>
        <div>{this.props.pageName}</div>
        <div id={this.props.idName}>
          {buttons}
        </div>
      </div>
    );
  }
}

export default ButtonRowInput;