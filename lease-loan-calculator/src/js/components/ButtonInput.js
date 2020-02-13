import React from 'react';

class ButtonInput extends React.Component {

  onBtnClick = () => {
    this.props.updateValueFunc(this.props.btnValue);
  };

  render() {
    return (
      <button
        className={this.props.btnClass}
        onClick={this.onBtnClick}
      >
        {this.props.btnValue}
      </button>
    );
  }
}

export default ButtonInput;