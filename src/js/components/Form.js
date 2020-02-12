import React from 'react';
import TextInput from "./TextInput";
import ButtonRowInput from "./ButtonRowInput";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      downPayment: 0,
      tradeIn: 0,
      apr: 0,
      postCode: 0,
      terms: 24,
      creditScore: 750,
    }
  }

  updateFormValue = (newState) => {
    this.setState(newState,
      () => {
        this.props.onValueChange({
          formData: this.state,
        });
      });
  };

  async loadIpInfo() {
    const IP_INFO_ACCESS_TOKEN = '09f4aded924de8';

    const response = await fetch('https://ipinfo.io/json?token=' + IP_INFO_ACCESS_TOKEN);
    return await response.json();
  }

  componentDidMount = () => {
    this.loadIpInfo()
      .then((ipData) => {
        this.updateFormValue({
          postCode: ipData.postal,
        });
      });
  };

  render() {
    if (this.props.firstTabOpened) {
      return (
        <div className={'tab'}>
          <TextInput idName={'downPayment'}
                     pageName={'Down Payment'}
                     defValue={this.state.downPayment}
                     updateState={this.updateFormValue} />
          <TextInput idName={'tradeIn'}
                     pageName={'Trade-In'}
                     defValue={this.state.tradeIn}
                     updateState={this.updateFormValue}/>
          <TextInput idName={'apr'}
                     pageName={'APR'}
                     defValue={this.state.apr}
                     updateState={this.updateFormValue}/>
          <TextInput idName={'postCode'}
                     pageName={'Post Code'}
                     defValue={this.state.postCode}
                     updateState={this.updateFormValue} />
          <ButtonRowInput idName={'terms'}
                          pageName={'Terms'}
                          defValue={this.state.terms}
                          values={[ 12, 24, 36, 48, 72, 84 ]}
                          updateState={this.updateFormValue} />
          <ButtonRowInput idName={'creditScore'}
                          pageName={'Credit Score'}
                          defValue={this.state.creditScore}
                          values={[ 600, 650, 700, 750, 800, 850, 900 ]}
                          updateState={this.updateFormValue} />
        </div>
      );
    }
    return (
      <div className={'tab'}>
        second tab
      </div>
    );
  }
}

export default Form;