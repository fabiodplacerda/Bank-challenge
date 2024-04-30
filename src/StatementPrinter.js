import chalk from 'chalk';

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
  };

  static headers = () => {
    return 'date       ||    credit    ||     debit    || balance';
  };

  static #preparedStatementOutput = statement => {
    const credit =
      statement.type === 'credit'
        ? chalk.green(statement.amount.toFixed(2).padStart(9))
        : ' '.padStart(9);
    const debit =
      statement.type === 'debit'
        ? chalk.red(statement.amount.toFixed(2).padStart(9))
        : ' '.padStart(9);
    const balance =
      statement.balance <= 0
        ? chalk.red(statement.balance.toFixed(2))
        : chalk.green(statement.balance.toFixed(2));
    return `${statement.date} ||  ${credit}   ||  ${debit}   || ${balance}`;
  };
}
