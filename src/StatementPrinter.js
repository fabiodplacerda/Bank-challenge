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
      console.log(StatementPrinter.preparedStatementOutput(statement));
    });
  };

  static headers = () => {
    return 'date      ||    credit    ||     debit    || balance';
  };

  static preparedStatementOutput = statement => {
    const credit =
      statement.type === 'credit'
        ? statement.amount.toFixed(2).padStart(9)
        : ' '.padStart(9);
    const debit =
      statement.type === 'debit'
        ? statement.amount.toFixed(2).padStart(9)
        : ' '.padStart(9);
    return `${
      statement.date
    } ||  ${credit}   ||  ${debit}   || ${statement.balance.toFixed(2)}`;
  };
}
