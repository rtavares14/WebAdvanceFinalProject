export function isBidValid(newBid, currentBids, currentUserID) {
    if (!newBid || isNaN(newBid) || newBid <= 0) {
        alert("Please enter a valid number for your bid.");
        return false;
    }

    if (currentBids.length === 0) {
        return newBid >= cardDetails.auctionStartingBid;
    }

    const lastBid = currentBids[0]?.bidAmount || 0;
    console.log("Last Bid:", lastBid);

    if (newBid <= lastBid) {
        alert("Your bid must be higher than the current highest bid.");
        return false;
    }

    if (newBid > lastBid * 1.3) {
        alert("Your bid cannot exceed 30% of the current highest bid.");
        return false;
    }

   if (currentBids[0]?.userID === currentUserID) {
        alert("You cannot place consecutive bids. Wait for another user to bid first.");
       return false;
   }

    return true;
}
