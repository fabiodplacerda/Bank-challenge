export default class Account {
  #balance;

  constructor(balance = 0) {
    this.#balance = balance;
  }

  getBalance = () => this.#balance;

  addFunds = amt => {
    if (typeof amt === 'number') this.#balance += amt;
  };

  withdrawFunds = amt => {
    if (typeof amt === 'number' && amt <= this.#balance) this.#balance -= amt;
  };
}
