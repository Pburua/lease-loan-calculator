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
    let response = await fetch('./data/mock-data.json');
    let mockData = await response.json();
    this.setState(mockData);
  }

  render() {
    let monthlyPayment = this.props.firstTabOpened ?
      this.props.calcResults.monthlyPaymentLoan: this.props.calcResults.monthlyPaymentLease;

    return (
      <div className={'info-card'}>
        <div>MSPR: {this.state.mspr}</div>
        <div>Monthly Payment: {monthlyPayment}</div>
        <div>Taxes: {this.props.calcResults.taxes.join(', ')}</div>
        <div>Vehicle name: {this.state.vehicleName}</div>
        <div>Dealer name: {this.state.dealerName}</div>
        <div>Dealer phone: {this.state.dealerPhone}</div>
        <div>Dealer rating: {this.state.dealerRating}</div>
      </div>
    );
  }
}

export default InfoCard;