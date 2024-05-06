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

//Overdraft feature

myAccount.configureOverdraftAmount(250); // Will log a message saying overdraft facility wasn't enabled yet
myAccount.overdraftFacilityToggler(); // Will turn on overdraft facility and log message

myAccount.configureOverdraftAmount(500);
myAccount.withdrawFunds(500);
myAccount.overdraftFacilityToggler(); // Overdraft turned off
myAccount.addFunds(1000);
myAccount.withdrawFunds(1000); // Transaction won't be successful because overdraft facility is not on anymore

myAccount.withdrawFunds(500);
myAccount.overdraftFacilityToggler(); // Overdraft turned on
myAccount.configureOverdraftAmount('1000'); // Invalid amount

console.log(myAccount.getOverdraftAllowedAmount()); //Overdraft amount is reset when turned off
myAccount.configureOverdraftAmount(1000);

myAccount.withdrawFunds(1000);
StatementPrinter.printStatements(myAccount.getStatements());
