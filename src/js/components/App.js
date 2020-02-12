import React from 'react';
import BtnTab from './BtnTab';
import TextInput from './TextInput';
import ButtonRowInput from './ButtonRowInput';
import Form from "./Form";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstTabOpened: this.loadFirstTabOpened(),
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
      this.keyBoardSwitchTab(e);
    } else if (e.code === 'Enter') {
      this.calculate(e);
    }
  };

  calculate = (e) => {

  };

  keyBoardSwitchTab = (e) => {
    e.preventDefault();
    this.setTab(!this.state.firstTabOpened);
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

  render() {
    return (
      <>
        {this.renderTabSwitcher()}
        <Form firstTabOpened={this.state.firstTabOpened}/>
      </>
    )
  }
}

export default App;
