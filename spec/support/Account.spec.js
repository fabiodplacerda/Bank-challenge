import Account from "../../src/Account.js";

describe("Account Class tests: ", () => {
  describe("Account initialization tests", () => {
    it("should create a new instance of The Account class", () => {
      // Arrange
      // Act
      const testAccount = new Account();
      // Assert
      expect(testAccount).toBeInstanceOf(Account);
    });
    it("should have a balance property that is initialized with 0", () => {
      // Arrange
      const expected = 0;
      // Act
      const testAccount = new Account();
      // Assert
      expect(testAccount.getBalance()).toBe(expected);
    });
  });
});
