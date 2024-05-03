export default class Account {
  #balance;
  #statements = [];
  #overdraftFacility = false;
  #overdraftAllowedAmount = 0;

  constructor(balance = 0) {
    this.#balance = balance;
  }

  getBalance = () => this.#balance;

  addFunds = amt => {
    if (typeof amt !== 'number') {
      this.#userActionFeedback('invalid amount, please try again');
      return;
    }
    this.#balance += amt;
    this.#userActionFeedback(
      `£${amt.toFixed(2)} has been added to your account`
    );
    this.#addStatement(amt, 'debit');
  };

  withdrawFunds = amt => {
    if (this.#overdraftFacility) {
      this.#withdrawFundsOverdraft(amt);
    } else {
      const validAmount = this.#checkWithdrawValidAmount(amt);
      if (!validAmount && (typeof amt !== 'number' || amt < 0)) {
        this.#userActionFeedback(`Invalid amount to withdraw`);
      } else if (!validAmount) {
        this.#userActionFeedback(`Insufficient Funds`);
      }
    }
  };

  #withdrawFundsOverdraft = amt => {
    const result = this.#balance - amt;
    if (result >= this.#overdraftAllowedAmount) {
      this.#balance = result;
      this.#userActionFeedback(
        `£${amt.toFixed(2)} has been withdrawn from your account`
      );
      this.#addStatement(amt, 'credit');
    } else {
      this.#userActionFeedback(`Insufficient Funds`);
    }
  };

  #checkWithdrawValidAmount = amt => {
    if (typeof amt === 'number' && amt <= this.#balance && amt > 0) {
      this.#balance -= amt;
      this.#userActionFeedback(
        `£${amt.toFixed(2)} has been withdrawn from your account`
      );
      this.#addStatement(amt, 'credit');
      return true;
    } else {
      return false;
    }
  };

  #addStatement = (amount, type) => {
    const date = new Date().toLocaleDateString('en-GB');
    const statement = { date: date, type, amount, balance: this.#balance };
    this.#statements.push(statement);
  };

  getStatements = () => this.#statements;

  #userActionFeedback = message => {
    console.log(message);
  };

  overdraftFacilityToggler = () => {
    this.#overdraftFacility = !this.#overdraftFacility;
    if (this.#overdraftFacility) {
      this.#userActionFeedback('Overdraft facility was turned on!');
    } else {
      this.#userActionFeedback('Overdraft facility was turned off!');
    }
  };

  hasOverdraftFacility = () => {
    return this.#overdraftFacility;
  };

  configureOverdraftAmount = amt => {
    if (this.#overdraftFacility) {
      this.#overdraftAllowedAmount = -Math.abs(amt);
    } else {
      this.#userActionFeedback(
        'Overdraft facility was not enable in this account!'
      );
    }
  };

  getOverdraftAllowedAmount = () => {
    return this.#overdraftAllowedAmount;
  };
}
