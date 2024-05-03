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
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = spyOn(console, 'log');
    });

    afterEach(() => {
      consoleSpy.calls.reset();
    });

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

    it('should log a message to the console when funds are added to the account', () => {
      // Arrange
      const amount = 100;
      const expected = `£${amount.toFixed(2)} has been added to your account`;
      const testAccount = new Account();
      // Act
      testAccount.addFunds(amount);
      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(expected);
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

    it('should give the user feedback when trying to add a non-numerical amount', () => {
      // Arrange
      const arg = '100';
      const expected = 'invalid amount, please try again';
      const testAccount = new Account();
      // Act
      testAccount.addFunds(arg);
      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(expected);
    });

    it('should remove 150 from the balance when withdrawFunds is called', () => {
      // Arrange
      const testAccount = new Account(200);
      const expected = 50;
      // Act
      testAccount.withdrawFunds(150);
      // Assert
      expect(testAccount.getBalance()).toBe(expected);
    });

    it('should log a message when removing funds from the account', () => {
      // Arrange
      const testAccount = new Account(200);
      const withdrawAmt = 150;
      const expected = `£${withdrawAmt.toFixed(
        2
      )} has been withdrawn from your account`;
      // Act
      testAccount.withdrawFunds(withdrawAmt);
      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(expected);
    });

    it('should not be possible to withdraw with a negative number', () => {
      // Arrange
      const arg = -100;
      const expected = 200;
      const testAccount = new Account(200);
      // Act
      testAccount.withdrawFunds(arg);
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

    it('should not be able to remove funds if the amount requested is more then the current balance', () => {
      // Arrange
      const testAccount = new Account(200);
      const expected = 200;
      const withdrawAmt = 300;
      // Act
      testAccount.withdrawFunds(withdrawAmt);
      // Assert
      expect(testAccount.getBalance()).toBe(expected);
    });

    it('should be able to remove funds if the amount requested is the same as the current balance', () => {
      // Arrange
      const testAccount = new Account(300);
      const expected = 0;
      const withdrawAmt = 300;
      // Act
      testAccount.withdrawFunds(withdrawAmt);
      // Assert
      expect(testAccount.getBalance()).toBe(expected);
    });

    it('should give the user feedback if withdraw was unsuccessful, reason - the amount to withdraw is greater then the balance', () => {
      // Arrange
      const testAccount = new Account();
      const withdrawAmt = 150;
      const expected = `Insufficient Funds`;
      // Act
      testAccount.withdrawFunds(withdrawAmt);
      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(expected);
    });

    it('should give the user feedback if withdraw was unsuccessful, reason - the amount was not valid', () => {
      // Arrange
      const testAccount = new Account();
      const withdrawAmt = ' ';
      const expected = `Invalid amount to withdraw`;
      // Act
      testAccount.withdrawFunds(withdrawAmt);
      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(expected);
    });
  });

  describe('Account statements record tests: ', () => {
    let date;
    beforeEach(() => {
      date = new Date().toLocaleDateString('en-GB');
    });
    it('should record transactions when adding funds', () => {
      // Arrange
      const expected = [
        { date: date, type: 'debit', amount: 200, balance: 200 },
      ];
      const testAccount = new Account();
      // Act
      testAccount.addFunds(200);
      // Assert
      expect(testAccount.getStatements()).toEqual(expected);
    });

    it('should record transactions when removing funds', () => {
      // Arrange
      const expected = [
        { date: date, type: 'credit', amount: 200, balance: 300 },
      ];
      const testAccount = new Account(500);
      // Act
      testAccount.withdrawFunds(200);
      // Assert
      expect(testAccount.getStatements()).toEqual(expected);
    });

    it('should  be able to record multiple transactions', () => {
      // Arrange
      const expected = [
        { date: date, type: 'debit', amount: 1000, balance: 1000 },
        { date: date, type: 'credit', amount: 300, balance: 700 },
        { date: date, type: 'credit', amount: 300, balance: 400 },
      ];
      const testAccount = new Account();
      // Act
      testAccount.addFunds(1000);
      testAccount.withdrawFunds(300);
      testAccount.withdrawFunds(300);
      // Assert
      expect(testAccount.getStatements()).toEqual(expected);
    });

    it('should not record unsuccessfully transactions', () => {
      // Arrange
      const expected = [
        { date: date, type: 'debit', amount: 500, balance: 500 },
        { date: date, type: 'credit', amount: 300, balance: 200 },
        { date: date, type: 'credit', amount: 100, balance: 100 },
      ];
      const testAccount = new Account();
      // Act
      testAccount.addFunds(500);
      testAccount.withdrawFunds(300);
      testAccount.withdrawFunds(500);
      testAccount.withdrawFunds(100);
      // Assert
      expect(testAccount.getStatements()).toEqual(expected);
    });
  });
});

describe('Account Class additional features tests: ', () => {
  let testAccount;

  beforeEach(() => {
    testAccount = new Account();
  });

  afterEach(() => {
    testAccount = null;
  });

  it('should be able to turn on the overdraft facility', () => {
    // Arrange
    const expected = true;
    // Act
    testAccount.overdraftFacilityToggler();
    // Assert
    expect(testAccount.hasOverdraftFacility()).toBe(expected);
  });

  it('should be able to turn on the overdraft facility', () => {
    // Arrange
    const expected = false;
    // Act
    testAccount.overdraftFacilityToggler();
    testAccount.overdraftFacilityToggler();
    // Assert
    expect(testAccount.hasOverdraftFacility()).toBe(expected);
  });

  it('should be able to receive feedback when turning on the overdraft', () => {
    // Arrange
    const consoleSpy = spyOn(console, 'log');
    const expected = 'Overdraft facility was turned on!';
    // Act
    testAccount.overdraftFacilityToggler();
    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(expected);
  });

  it('should be able to receive feedback when turning on the overdraft', () => {
    // Arrange
    const consoleSpy = spyOn(console, 'log');
    const expected = 'Overdraft facility was turned off!';
    // Act
    testAccount.overdraftFacilityToggler();
    testAccount.overdraftFacilityToggler();

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(expected);
  });

  it('should allow users to configure their overdraft facility', () => {
    // Arrange
    const expected = -250;
    // Act
    testAccount.overdraftFacilityToggler();
    testAccount.configureOverdraftAmount(250);
    // Assert
    expect(testAccount.getOverdraftAllowedAmount()).toBe(expected);
  });

  it('should allow users to configure their overdraft facility only if they have overdraft facility enabled', () => {
    // Arrange
    const expected = 0;
    // Act
    testAccount.configureOverdraftAmount(250);
    // Assert
    expect(testAccount.getOverdraftAllowedAmount()).toBe(expected);
  });

  it('should send a feedback to users when they are trying to configure their overdraft amount but overdraft facility was not enable', () => {
    // Arrange
    const consoleSpy = spyOn(console, 'log');
    const expected = 'Overdraft facility was not enable in this account!';
    // Act
    testAccount.configureOverdraftAmount(250);
    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(expected);
  });
});
