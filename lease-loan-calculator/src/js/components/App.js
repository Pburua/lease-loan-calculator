import React from 'react';
import BtnTab from './BtnTab';
import Form from "./Form";
import InfoCard from "./InfoCard";

class App extends React.Component {
  constructor(props) {
    super(props);

    let formData = this.loadFormData();

    this.state = {
      firstTabOpened: this.loadFirstTabOpened(),
      formData: formData,
      calcResults: {
        monthlyPaymentLoan: 0,
        monthlyPaymentLease: 0,
        taxes: [],
      },
      validationErrorStack: [],
    };

    document.addEventListener('keydown', this.handleKeyboard);

    window.addEventListener('beforeunload', this.onPageLeave);
  }

  // session storage

  loadFirstTabOpened() {
    let firstTabOpened = sessionStorage.getItem('firstTabOpened');
    if (firstTabOpened) {
      return JSON.parse(firstTabOpened);
    }
    return false;
  }

  loadFormData() {
    let formData = sessionStorage.getItem('formData');
    if (formData) {
      return JSON.parse(formData);
    }
    return {
      downPayment: 0,
      tradeIn: 0,
      apr: 0,
      postCode: 0,
      terms: 24,
      leaseTerms: 36,
      creditScore: 750,
      mileages: 12000,
    };
  }

  onPageLeave = () => {
    sessionStorage.setItem('firstTabOpened', JSON.stringify(this.state.firstTabOpened));
    sessionStorage.setItem('formData', JSON.stringify(this.state.formData));
  };

  // keyboard actions

  handleKeyboard = (e) => {
    if (e.code === 'Tab') {
      e.preventDefault();
      this.keyBoardSwitchTab(e);
    } else if (e.code === 'Enter') {
      e.preventDefault();
      this.calculate();
    }
  };

  keyBoardSwitchTab = () => {
    this.setTab(!this.state.firstTabOpened);
  };

  // error handling

  showError = (str) => {
    for (let i = 0; i < this.state.validationErrorStack.length; i += 1) {
      if (str === this.state.validationErrorStack[i])
        return false;
    }
    let validationErrorStack = this.state.validationErrorStack.slice();
    validationErrorStack.push(str);
    this.setState({
      validationErrorStack: validationErrorStack,
    });
  };

  hideErrors = (callback) => {
    this.setState({
      validationErrorStack: [],
    }, callback);
  };

  // calculations

  isValueValid = () => {
    let data = this.state.formData;
    let msrp = 100;
    let valid = true;
    if (data.downPayment > (msrp / 4)) {
      this.showError('Down Payment can’t be greater than ¼ of MSRP');
      valid = false;
    }
    if (data.tradeIn > (msrp / 4)) {
      this.showError('Trade-in can’t be greater than ¼ of MSRP');
      valid = false;
    }
    return valid;
  };

  calculate = () => {
    this.hideErrors(
      () => {
        if (this.isValueValid()) {
          this.hideErrors();
          this.calcResultsFunc()
            .then((calcResults) => {
              this.setState(calcResults);
            });
        }
      }
    );
  };

  calcResultsFunc = () => {
    return new Promise(
      (resolve) => {
        let data = this.state.formData;
        let msrp = 100;
        let creditScoreValue = 0;

        if (data.creditScore >= 750) creditScoreValue = 0.95;
        else if (data.creditScore >= 700 && data.creditScore < 750) creditScoreValue = 1;
        else if (data.creditScore >= 640 && data.creditScore < 700) creditScoreValue = 1.05;
        else if (data.creditScore < 640) creditScoreValue = 1.2;

        let monthlyPaymentLoan = (msrp - data.tradeIn - data.downPayment) / data.terms * creditScoreValue * data.apr;
        let monthlyPaymentLease = (msrp - data.tradeIn - data.downPayment) * data.mileages / 10000 / data.leaseTerms * creditScoreValue;
        let taxes = data.postCode.split('').map(num => num * 11);

        resolve({
          calcResults: {
            monthlyPaymentLoan: monthlyPaymentLoan.toFixed(2),
            monthlyPaymentLease: monthlyPaymentLease.toFixed(2),
            taxes: taxes,
          }
        });
      }
    );
  };

  // tabs switching

  setTab = (isFirstOpening) => {
    this.setState({
      firstTabOpened: isFirstOpening,
    });
  };

  // callback func for children usage

  updateAppData = (formData) => {
    this.setState(formData,
      () => {
        this.calculate();
      });
  };

  // rendering

  renderTabSwitcher() {
    return (
      <div className="tab-switcher">
        <BtnTab handlerFunc={this.setTab}
                isFirstOpening={true}
                value={'Loan'}
                isCurrent={this.state.firstTabOpened}
        />

        <BtnTab handlerFunc={this.setTab}
                isFirstOpening={false}
                value={'Lease'}
                isCurrent={this.state.firstTabOpened}
        />
      </div>
    );
  }

  renderErrMessages() {
    let validationErrors = [];
    for (let i = 0; i < this.state.validationErrorStack.length; i += 1) {
      validationErrors.push(
        <span key={this.state.validationErrorStack[i]}>{this.state.validationErrorStack[i]}</span>
      );
    }

    return (
      <div className={'err-messages'}>
        {validationErrors}
      </div>);
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="column">
            {this.renderTabSwitcher()}
            <Form
              formData={this.state.formData}
              firstTabOpened={this.state.firstTabOpened}
              onValueChange={this.updateAppData} />
            {this.renderErrMessages()}
          </div>
          <div className="column">
            <InfoCard
              firstTabOpened={this.state.firstTabOpened}
              calcResults={this.state.calcResults} />
          </div>
        </div>
      </>
    )
  }
}

export default App;
