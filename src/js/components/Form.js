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

  render() {
    if (this.props.firstTabOpened) {
      return (
        <div className={'tab'}>
          <TextInput idName={'downPayment'}
                     pageName={'Down Payment'}
                     defValue={this.state.downPayment}/> <TextInput idName={'tradeIn'}
                                                                    pageName={'Trade-In'}
                                                                    defValue={this.state.tradeIn}/> <TextInput
          idName={'apr'}
          pageName={'APR'}
          defValue={this.state.apr}/> <TextInput idName={'postCode'}
                                                 pageName={'Post Code'}
                                                 defValue={this.state.postCode}/> <ButtonRowInput idName={'terms'}
                                                                                                  pageName={'Terms'}
                                                                                                  defValue={this.state.terms}
                                                                                                  values={[ 12, 24, 36, 48, 72, 84 ]}/>
          <ButtonRowInput idName={'creditScore'}
                          pageName={'Credit Score'}
                          defValue={this.state.creditScore}
                          values={[ 600, 650, 700, 750, 800, 850, 900 ]}/>
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