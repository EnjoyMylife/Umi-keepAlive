export default class NumberAddOne extends React.Component {
  state = {
    number: 0
  };

  handleClick = () => {
    this.setState(({ number }) => ({
      number: number + 1
    }));
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          Click the button to increase the number
        </button>
        <div>Number: {this.state.number}</div>
      </div>
    );
  }
}