import Account from '../../src/Account.js';

describe('Account Class tests: ', () => {
  describe('Account initialization tests', () => {
    it('should create a new instance of The Account class', () => {
      // Arrange
      // Act
      const testAccount = new Account();
      // Assert
      expect(testAccount).toBeInstanceOf(Account);
    });
    it('should have a balance property that is initialized with 0', () => {
      // Arrange
      const expected = 0;
      // Act
      const testAccount = new Account();
      // Assert
      expect(testAccount.getBalance()).toBe(expected);
    });
  });
  describe('Account balance mutation tests: ', () => {
    let testAccount;

    beforeEach(() => {
      testAccount = new Account();
    });

    afterEach(() => {
      testAccount = null;
    });

    it('should add 100 to the balance when addFunds is called', () => {
      // Arrange
      const expected = 100;
      // Act
      testAccount.addFunds(expected);
      // Assert
      expect(testAccount.getBalance()).toBe(expected);
    });
    it('should not be possible to add a non-numerical argument passed into addFunds to the balance', () => {
      // Arrange
      const arg = '100';
      const expected = 0;
      // Act
      testAccount.addFunds(arg);
      // Assert
      expect(testAccount.getBalance()).toBe(expected);
    });
  });
});
