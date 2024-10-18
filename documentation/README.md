# Welcome to My Auction Website!

Here, I will explain some of the features I've implemented, the reasons behind them , the testing order and some Easter eggs I've hidden in the website:

## Some Features I've Implemented

### 1. Random Auctions on the Main Page
- Each time you visit the main page, you'll see 5 random auctions. This encourages users to explore different items.
- To view all available auctions, you will need to log in and go to the cards page.

### 2. Bidding Rules
- Only users who are not admins can place bids.
- To prevent conflicts, users cannot bid on their own auctions. 
- Users cannot bid more than 30% above the highest bid.
- After a user places a bid, they will need to wait for another user to bid before they can bid again.

### 3. Validation for Auctions
- When creating or editing an auction, I've implemented various checks to ensure everything is correct. 
- For example, if an image link for a card is broken, the system will automatically replace it with a default image instead of showing an error.
- Auctions cannot have a start date that is after the end date. 
- Once an auction has ended, it cannot be edited. 
- While an auction is live, you cannot change the starting date or price. 
- Changes can only be made before the auction starts.

## Testing order
- For my tests to work, you will need to run the backend first and then the frontend (but i have a filling that you know that already).
- As you asked I made a test order 
- First run my [Token test](../tests/rest/tests/token.http)
- Then run my [User test](../tests/rest/tests/user.http)
- And for last run my [Cards test](../tests/rest/tests/cards.http)

## Easter Eggs
- I've hidden some Easter eggs in the website.
- 2 of them can be found in my front end pages.
- 1 of them can be found in my back end pages more into the testing section.
- I hope you enjoy finding them!