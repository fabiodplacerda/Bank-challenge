export default class Account {
  #balance;
  #statements = [];

  constructor(balance = 0) {
    this.#balance = balance;
  }

  getBalance = () => this.#balance;

  addFunds = amt => {
    if (typeof amt === 'number') {
      this.#balance += amt;
      this.#addStatement(amt, 'debit');
    }
  };

  withdrawFunds = amt => {
    if (typeof amt === 'number' && amt <= this.#balance) {
      this.#balance -= amt;
      this.#addStatement(amt, 'credit');
    }
  };

  #addStatement = (amount, type) => {
    const date = new Date().toLocaleDateString();
    const statement = { date: date, type, amount, balance: this.#balance };
    this.#statements.push(statement);
  };

  getStatements = () => this.#statements;
}
