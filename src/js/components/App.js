import React from 'react';
import BtnTab from './BtnTab';
import TextInput from './TextInput';
import ButtonRowInput from './ButtonRowInput';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstTabOpened: this.loadFirstTabOpened(),
    };

    document.addEventListener('keydown', this.keyBoardSwitchTab);

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

  keyBoardSwitchTab = (e) => {
    if (e.code === 'Tab') {
      e.preventDefault();
      this.setTab(!this.state.firstTabOpened);
    }
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
    if (this.state.firstTabOpened) {
      return (
        <>
          {this.renderTabSwitcher()}
          <div className={'tab'}>
            <TextInput idName={'downPayment'} pageName={'Down Payment'} defValue={0}/>
            <TextInput idName={'tradeIn'} pageName={'Trade-In'} defValue={0}/>
            <TextInput idName={'apr'} pageName={'APR'} defValue={0}/>
            <TextInput idName={'postCode'} pageName={'Post Code'} defValue={'cur-post-code'}/>
            <ButtonRowInput idName={'terms'} pageName={'Terms'} defValue={24} values={[12, 24, 36, 48, 72, 84]}/>
            <ButtonRowInput idName={'creditScore'} pageName={'Credit Score'} defValue={750} values={[600, 650, 700, 750, 800, 850, 900]}/>
          </div>
        </>
      )
    }
    return (
      <>
        {this.renderTabSwitcher()}
        <div className={'tab'}>
          second tab
        </div>
      </>
    )
  }
}

export default App;
