import React from 'react';

class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mockData: {
        mspr: 0,
        vehicleName: '',
        dealerName: '',
        dealerPhone: '',
        dealerRating: '',
      }
    }
  }

  async componentDidMount() {
    let response = await fetch('./src/js/mock-data.json');
    let mockData = await response.json();
    this.setState(mockData);
  }

  render() {
    return (
      <div className={'info-card'}>
        <div>MSPR: {this.state.mspr}</div>
        <div>Vehicle name: {this.state.vehicleName}</div>
        <div>Dealer name: {this.state.dealerName}</div>
        <div>Dealer phone: {this.state.dealerPhone}</div>
        <div>Dealer rating: {this.state.dealerRating}</div>
      </div>
    );
  }
}

export default InfoCard;