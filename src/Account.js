export default class Account {
  #balance = 0;

  getBalance = () => this.#balance;

  addFunds = amt => {
    if (typeof amt === 'number') this.#balance += amt;
  };
}
