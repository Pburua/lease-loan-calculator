import React from 'react';

class ButtonRowInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defValue,
    }
  }

  render() {
    let buttons = [];
    for (let i = 0; i < this.props.values.length; i += 1) {
      let btnClass = '';
      if (this.props.values[i] === this.props.defValue)
        btnClass = 'selected';
      buttons.push(
        <button className={btnClass}
                key={this.props.idName + '' + this.props.values[i]}>{this.props.values[i]}
        </button>
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