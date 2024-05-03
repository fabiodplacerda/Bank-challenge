import chalkWrapper from '../utils/chalkWrapper.js';

export default class StatementPrinter {
  constructor() {
    if (new.target === StatementPrinter) {
      throw new Error('Cannot create instance of abstract class');
    }
  }

  static printStatements = statements => {
    if (!statements.length) {
      console.log('No Statements available');
      return;
    }
    console.log(StatementPrinter.headers());
    statements.reverse().forEach(statement => {
      console.log(StatementPrinter.#preparedStatementOutput(statement));
    });
    statements.reverse();
  };

  static headers = () => {
    return 'date       ||    credit    ||     debit    || balance';
  };

  static #preparedStatementOutput = statement => {
    const credit =
      statement.type === 'credit'
        ? chalkWrapper.green(statement.amount.toFixed(2).padStart(9))
        : ' '.padStart(9);

    const debit =
      statement.type === 'debit'
        ? chalkWrapper.red(statement.amount.toFixed(2).padStart(9))
        : ' '.padStart(9);

    const balance =
      statement.balance <= 0
        ? chalkWrapper.red(statement.balance.toFixed(2))
        : chalkWrapper.green(statement.balance.toFixed(2));
    return `${statement.date} ||  ${credit}   ||  ${debit}   || ${balance}`;
  };
}
