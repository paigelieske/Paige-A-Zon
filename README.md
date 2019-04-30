# Paige-a-Zon
## Amazon-like Storefront

Using SQL and node, Paige-a-Zon is a storefront providing a various array of products for purchase.

Upon load the user is greeted with a Welcome and a list of all available inventory with the following detail:

1. Item ID
2. Product Name
3. Department
4. Price
5. Available Stock

After the inventory is shown, the user is asked by Item ID what they are interested in purchasing.  If they answer with a relevant ID number, they will then be prompted to provide a quantity; if they enter Q (or q), the program ends and they are encouraged to come back later.

After a relevent ID and quantity to purchase are entered, the user is notified of their success or failure.  Either the sale went through because the stock was available to fulfill the entire order, or the transaction was cancelled due to insufficient stock and they are encouraged to try again.

If the sale is succesful the inventory is updated to reflect the change in a available stock and the user is asked to make another purchase or Q to quit.

Please review the screenshots for a visual walkthrough of the application.

![Initial](/screenshots/initial.JPG)

![Success](/screenshots/success.JPG)

![Fail](/screenshots/fail.JPG)

![End](/screenshots/end.JPG)
