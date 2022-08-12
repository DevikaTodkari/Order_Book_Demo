Feature: As a Book_Lover I should be able to order the book and apply the discount

    As a book lover, I should be able to order a drama called “The Rainbow” for no more
than $125.00 I also want to use my 10% discount voucher so that I can send this
book to my mum.

Background: The user is on Book shop page
Given I open a book shop site
When I select the Drama book
And I select The Rainbow book from given dropdown and enter the price and units


Scenario: bool Lover customer buying books and Validating if order was placed successfully.
And I submit the application
Then I should be able to see the records added in the Transaction Table

@focus
Scenario: Validating Transaction documents have been updated properly.
And I submit the application
Then I verify each fields of the Transaction documents


Scenario: Validating The discount has been applied correctly, and the cumulative sum after the discount has been shown.
Then I verify the discount amount with the amount in the transaction table



Scenario:Delete the record and double-check that it was successfully removed.
Then I should not see the Transaction documents