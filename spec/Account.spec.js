import Account from '../src/Account.js';

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
    // let testAccount;

    // beforeEach(() => {
    //   testAccount = new Account();
    // });

    // afterEach(() => {
    //   testAccount = null;
    // });

    it('should add 100 to the balance when addFunds is called', () => {
      // Arrange
      const arg = 100;
      const expected = 100;
      const testAccount = new Account();
      // Act
      testAccount.addFunds(arg);
      // Assert
      expect(testAccount.getBalance()).toBe(expected);
    });

    it('should not be possible to add a non-numerical argument passed into addFunds to the balance', () => {
      // Arrange
      const arg = '100';
      const expected = 0;
      const testAccount = new Account();
      // Act
      testAccount.addFunds(arg);
      // Assert
      expect(testAccount.getBalance()).toBe(expected);
    });

    it('should remove 100 from the balance when withdrawFunds is called', () => {
      // Arrange
      const testAccount = new Account(200);
      const expected = 50;
      // Act
      testAccount.withdrawFunds(150);
      // Assert
      expect(testAccount.getBalance()).toBe(expected);
    });

    it('non-numerical argument passed into withdrawFunds should have no effect on the balance', () => {
      // Arrange
      const arg = '100';
      const expected = 0;
      const testAccount = new Account();
      // Act
      testAccount.withdrawFunds(arg);
      // Assert
      expect(testAccount.getBalance()).toBe(expected);
    });

    it('should no be able to remove funds if the amount requested is more then the current balance', () => {
      // Arrange
      const testAccount = new Account(200);
      const expected = 200;
      const withdrawAmt = 300;
      // Act
      testAccount.withdrawFunds(withdrawAmt);
      // Assert
      expect(testAccount.getBalance()).toBe(expected);
    });

    it('should no be able to remove funds if the amount requested is sames as the current balance', () => {
      // Arrange
      const testAccount = new Account(300);
      const expected = 0;
      const withdrawAmt = 300;
      // Act
      testAccount.withdrawFunds(withdrawAmt);
      // Assert
      expect(testAccount.getBalance()).toBe(expected);
    });
  });
});
