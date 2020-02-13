import React from 'react';

class BtnTab extends React.Component {
  handlerFunc = () => {
    this.props.handlerFunc(this.props.isFirstOpening);
  };

  render() {
    let classNames = "btn-tab";

    if (this.props.isCurrent === this.props.isFirstOpening) classNames += ' current';

    return (
      <div className={classNames} onClick={this.handlerFunc}>
        {this.props.value}
      </div>
    )
  }
}

export default BtnTab;