Feature: Book shop application where wholesale customer wants to buy books

   As a wholesale customer, I should be able to order 50 Harry Potter fiction books at a
rate of $35.80 each so that I can sell them to my customers.

Background: The user is on Book shop page
Given I open a book shop site
When I select the fiction book




Scenario: Book Shop where wholesale customer buying books and Validating if order was placed successfully.
And I select The harry pooter book from given dropdown and enter the price and units
And I submit the application
Then I should be able to see the records added in the Transaction Table


Scenario:Validate Required fields are working correctly with Valid data
When I select The harry pooter book from given dropdown and enter valid price and units
Then form should get submitted successfully


Scenario:Validate Required fields are working correctly with data in Decimal point 
And When I select The harry pooter book from given dropdown and enter Invalid price and units
Then I should see the error message


Scenario: Validate Required fields are working correctly when submit the form without any data
When I am not entering any data and sumbitting the form
Then I should get error message for both fields


Scenario: Validating Transaction documents have been updated properly.
And I select The harry pooter book from given dropdown and enter the price and units
And I submit the application
Then I verify each fields of the Transaction documents


Scenario:Validating The total amount has been correctly applied.
And I select The harry pooter book from given dropdown and enter the price and units
And I submit the application
Then I should be able to the correct Amount displayed in Amount section

