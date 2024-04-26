import StatementPrinter from '../src/StatementPrinter.js';

describe('StatementPrint Tests: ', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = spyOn(console, 'log');
  });

  afterEach(() => {
    consoleSpy.calls.reset();
  });

  afterEach(() => {});
  it('should ensure that preparedStatementOutput calls console.log once for the headers and then once for each item in the given array', () => {
    // Arrange
    const array = [
      { date: '11/11/2024', type: 'debit', amount: 2000, balance: 1000 },
      { date: '11/11/2024', type: 'credit', amount: 1000, balance: 1000 },
    ];
    const expected = array.length + 1;
    // Act
    StatementPrinter.printStatements(array);
    // Assert
    expect(consoleSpy).toHaveBeenCalledTimes(expected);
  });

  it('should give feedback when there are no statements', () => {
    // Arrange
    const array = [];
    const expected = 'No Statements available';
    // Act
    StatementPrinter.printStatements(array);
    // Assert
    expect(consoleSpy).toHaveBeenCalledOnceWith(expected);
  });
});
