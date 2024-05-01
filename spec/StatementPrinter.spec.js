import StatementPrinter from '../src/StatementPrinter.js';
import chalkWrapper from '../src/chalkWrapper.js';

describe('StatementPrint Tests: ', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = spyOn(console, 'log');
  });

  afterEach(() => {
    consoleSpy.calls.reset();
  });

  it('should not allow an instance of the class to be created', () => {
    expect(() => new StatementPrinter()).toThrowError(
      'Cannot create instance of abstract class'
    );
  });

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

describe('StatementPrinter additional features: ', () => {
  // This test was created with the help of AI
  it('should call chalkWrapper.green when the statement type is credit', () => {
    // Arrange
    const greenSpy = spyOn(chalkWrapper, 'green');
    const testStatement = [
      { date: '11/11/2024', type: 'credit', amount: 1000, balance: 1000 },
    ];
    // Act
    StatementPrinter.printStatements(testStatement);
    // Assert
    expect(greenSpy).toHaveBeenCalled();
  });

  it('should call chalkWrapper.green with the amount when the statement type is credit', () => {
    // Arrange
    const greenSpy = spyOn(chalkWrapper, 'green');
    const testAmount = 1000;
    const testStatement = [
      { date: '11/11/2024', type: 'credit', amount: testAmount, balance: 1000 },
    ];
    // Act
    StatementPrinter.printStatements(testStatement);
    // Assert
    expect(greenSpy).toHaveBeenCalledWith(testAmount.toFixed(2).padStart(9));
  });

  it('should call chalkWrapper.red when the statement type is debit', () => {
    // Arrange
    const greenSpy = spyOn(chalkWrapper, 'red');
    const testStatement = [
      { date: '11/11/2024', type: 'debit', amount: 250, balance: 0 },
    ];
    // Act
    StatementPrinter.printStatements(testStatement);
    // Assert
    expect(greenSpy).toHaveBeenCalled();
  });

  it('should call chalkWrapper.red with the amount when the statement type is debit', () => {
    // Arrange
    const greenSpy = spyOn(chalkWrapper, 'red');
    const testAmount = 250;
    const testStatement = [
      { date: '11/11/2024', type: 'debit', amount: testAmount, balance: 250 },
    ];
    // Act
    StatementPrinter.printStatements(testStatement);
    // Assert
    expect(greenSpy).toHaveBeenCalledWith(testAmount.toFixed(2).padStart(9));
  });

  it('should call chalkWrapper.red once when statement type is debit and balance greater than 0', () => {
    // Arrange
    const greenSpy = spyOn(chalkWrapper, 'red');
    const expected = 1;
    const testStatement = [
      { date: '11/11/2024', type: 'debit', amount: 1000, balance: 1000 },
    ];
    // Act
    StatementPrinter.printStatements(testStatement);
    // Assert
    expect(greenSpy).toHaveBeenCalledTimes(expected);
  });
});
