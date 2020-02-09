import React from 'react';
import BtnTab from './BtnTab';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstTabOpened: true,
    };

    document.addEventListener('keydown', this.keyBoardSwitchTab);
  }

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
