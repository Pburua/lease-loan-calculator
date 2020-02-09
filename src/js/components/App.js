import React from 'react';
import BtnTab from './BtnTab';

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
                value={'first tab'}
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
            first tab
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
