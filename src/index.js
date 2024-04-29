import Account from './Account.js';
import StatementPrinter from './StatementPrinter.js';

// Created a new account
const myAccount = new Account();

// Adding some funds to my account
myAccount.addFunds(1000);
myAccount.addFunds(350);

//removing some fund from my account
myAccount.withdrawFunds(100);
myAccount.withdrawFunds(500);

// doing some more transactions
myAccount.addFunds(1000);
myAccount.withdrawFunds(-2000); // It should fail as it is and invalid transaction
myAccount.withdrawFunds(750);
myAccount.withdrawFunds(2000); // It should fail because of insufficient balance
myAccount.withdrawFunds(1000);

// Printing statements
StatementPrinter.printStatements(myAccount.getStatements());
