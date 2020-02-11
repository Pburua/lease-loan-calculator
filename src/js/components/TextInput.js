import React from 'react';

class TextInput extends React.Component {

  render() {

    return (
      <div className={'text-input'}>
        <label htmlFor={this.props.idName}>{this.props.pageName}</label>
        <input id={this.props.idName} type="text" defaultValue={this.props.defValue}/>
      </div>
    );
  }
}

export default TextInput;