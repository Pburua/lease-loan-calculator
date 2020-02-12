import React from 'react';
import BtnTab from './BtnTab';
import Form from "./Form";
import InfoCard from "./InfoCard";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstTabOpened: this.loadFirstTabOpened(),
      formData: {
        downPayment: 0,
        tradeIn: 0,
        apr: 0,
        postCode: 0,
        terms: 24,
        creditScore: 750,
      },
      calcResults: {
        monthlyPaymentLoan: 0,
        taxes: [],
      }
    };

    document.addEventListener('keydown', this.handleKeyboard);

    window.addEventListener('beforeunload', this.onPageLeave);
  }

  loadFirstTabOpened() {
    let firstTabOpened = sessionStorage.getItem('firstTabOpened');
    if (firstTabOpened) {
      return JSON.parse(firstTabOpened);
    }
    return true;
  }

  onPageLeave = () => {
    sessionStorage.setItem('firstTabOpened', JSON.stringify(this.state.firstTabOpened));
  };

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

  calculate = () => {
    this.calcResultsFunc()
      .then((calcResults) => {
        this.setState(calcResults);
      });
  };

  calcResultsFunc = () => {
    return new Promise(
      (resolve) => {
        let data = this.state.formData;
        let msrp = 40;
        let creditScoreValue = 0;

        if (data.creditScore >= 750) creditScoreValue = 0.95;
        else if (data.creditScore >= 700 && data.creditScore < 750) creditScoreValue = 1;
        else if (data.creditScore >= 640 && data.creditScore < 700) creditScoreValue = 1.05;
        else if (data.creditScore < 640) creditScoreValue = 1.2;

        let monthlyPaymentLoan = (msrp - data.tradeIn - data.downPayment) * data.terms * creditScoreValue * data.apr / 100;
        let taxes = data.postCode.split('').map(num => num * 11);

        resolve({
          calcResults: {
            monthlyPaymentLoan: monthlyPaymentLoan.toFixed(2),
            taxes: taxes,
          }
        });
      }
    );
  };

  setTab = (isFirstOpening) => {
    this.setState({
      firstTabOpened: isFirstOpening,
    });
  };

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
                value={'second tab'}
                isCurrent={this.state.firstTabOpened}
        />
      </div>
    );
  }

  updateAppData = (formData) => {
    this.setState(formData,
      () => {
        this.calculate();
      });
  };

  render() {
    return (
      <>
        <div className="row">
          <div className="column">
            {this.renderTabSwitcher()}
            <Form
              firstTabOpened={this.state.firstTabOpened}
              onValueChange={this.updateAppData} />
          </div>
          <div className="column">
            <InfoCard
              calcResults={this.state.calcResults}/>
          </div>
        </div>
      </>
    )
  }
}

export default App;
