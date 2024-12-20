/**
 * All my data to this website is stored in this file.
 * I have a data object that contains two arrays: cards and users.
 *The cards array contains all the cards that are being auctioned
 *The users array contains all the users that have registered to the website.
 */
export const data = {
    cards: [{
        cardID: 1,
        cardName: "Alakazam",
        cardImg: "https://den-cards.pokellector.com/119/Alakazam.BS.1.png",
        actionStartingDate: new Date("2024-06-03T00:00:00"),
        auctionEndDate: new Date("2024-08-03T00:00:00"),
        auctionStartingBid: 150.00,
        cardType: "Pokemon",
        energyType: "Psychic",
        cardRate: 7.5,
        bids: [{
            bidID: 1, userID: 3, bidAmount: 200.00, bidDate: new Date("2024-06-06")
        }, {
            bidID: 2, userID: 4, bidAmount: 250.00, bidDate: new Date("2024-06-07")
        },]
    }, {
        cardID: 2,
        cardName: "Blastoise",
        cardImg: "https://den-cards.pokellector.com/119/Blastoise.BS.2.png",
        actionStartingDate: new Date("2024-06-03T00:00:00"),
        auctionEndDate: new Date("2024-08-03T00:00:00"),
        auctionStartingBid: 5000.00,
        cardType: "Pokemon",
        energyType: "Water",
        cardRate: 8.5,
        bids: [{
            bidID: 1, userID: 3, bidAmount: 5200.00, bidDate: new Date("2024-06-06")
        }, {
            bidID: 2, userID: 4, bidAmount: 5250.00, bidDate: new Date("2024-06-07")
        }, {
            bidID: 3, userID: 6, bidAmount: 5275.00, bidDate: new Date("2024-07-07")
        },]
    }, {
        cardID: 3,
        cardName: "Chansey",
        cardImg: "https://den-cards.pokellector.com/119/Chansey.BS.3.png",
        actionStartingDate: new Date("2024-10-07T14:12:55"),
        auctionEndDate: new Date("2024-10-07T14:13:30"),
        auctionStartingBid: 120.00,
        cardType: "Pokemon",
        energyType: "Normal",
        cardRate: 7.5,
        bids: [{
            bidID: 1, userID: 3, bidAmount: 150.00, bidDate: new Date("2024-06-06")
        }, {
            bidID: 2, userID: 4, bidAmount: 160.00, bidDate: new Date("2024-06-07")
        }, {
            bidID: 3, userID: 6, bidAmount: 175.00, bidDate: new Date("2024-07-07")
        },]
    }, {
        cardID: 4,
        cardName: "Charizard",
        cardImg: "https://den-cards.pokellector.com/119/Charizard.BS.4.png",
        actionStartingDate: new Date("2024-10-04T00:00:00"),
        auctionEndDate: new Date("2024-10-08T14:18:30"),
        auctionStartingBid: 10000.00,
        cardType: "Pokemon",
        energyType: "Fire",
        cardRate: 7.0,
        bids: [{
            bidID: 4, userID: 4, bidAmount: 10300.00, bidDate: new Date("2024-10-04")
        }, {
            bidID: 5, userID: 5, bidAmount: 10450.00, bidDate: new Date("2024-10-04")
        }, {
            bidID: 6, userID: 3, bidAmount: 10575.00, bidDate: new Date("2024-10-06")
        },]
    }, {
        cardID: 6,
        cardName: "Gyarados",
        cardImg: "https://den-cards.pokellector.com/119/Gyarados.BS.6.png",
        actionStartingDate: new Date("2024-11-15T00:00:00"),
        auctionEndDate: new Date("2024-11-25T00:00:00"),
        auctionStartingBid: 800.00,
        cardType: "Pokemon",
        energyType: "Water",
        cardRate: 8.0,
        bids: []
    }, {
        cardID: 8,
        cardName: "Machamp",
        cardImg: "https://den-cards.pokellector.com/119/Machamp.BS.8.png",
        actionStartingDate: new Date("2024-11-06T00:00:00"),
        auctionEndDate: new Date("2024-11-16T00:00:00"),
        auctionStartingBid: 3000.00,
        cardType: "Pokemon",
        energyType: "Fighting",
        cardRate: 8.0,
        bids: []
    }, {
        cardID: 10,
        cardName: "Mewtwo",
        cardImg: "https://den-cards.pokellector.com/119/Mewtwo.BS.10.png",
        actionStartingDate: new Date("2024-10-05T00:00:00"),
        auctionEndDate: new Date("2024-10-17T11:41:30"),
        auctionStartingBid: 7500.00,
        cardType: "Pokemon",
        energyType: "Psychic",
        cardRate: 9.0,
        bids: [{
            bidID: 7, userID: 3, bidAmount: 7550.00, bidDate: new Date("2024-10-06")
        }, {
            bidID: 8, userID: 4, bidAmount: 7650.00, bidDate: new Date("2024-10-06")
        }, {
            bidID: 9, userID: 3, bidAmount: 8550.00, bidDate: new Date("2024-10-07")
        }, {
            bidID: 10, userID: 4, bidAmount: 10000.00, bidDate: new Date("2024-10-07")
        }, {
            bidID: 11, userID: 3, bidAmount: 22275.00, bidDate: new Date("2024-10-10")
        },]
    }, {
        cardID: 12,
        cardName: "Ninetales",
        cardImg: "https://den-cards.pokellector.com/119/Ninetales.BS.12.png",
        actionStartingDate: new Date("2024-11-07T00:00:00"),
        auctionEndDate: new Date("2024-11-17T00:00:00"),
        auctionStartingBid: 950.00,
        cardType: "Pokemon",
        energyType: "Fire",
        cardRate: 8.0,
        bids: []
    }, {
        cardID: 14,
        cardName: "Raichu",
        cardImg: "https://den-cards.pokellector.com/119/Raichu.BS.14.png",
        actionStartingDate: new Date("2024-11-13T00:00:00"),
        auctionEndDate: new Date("2024-11-23T00:00:00"),
        auctionStartingBid: 300.00,
        cardType: "Pokemon",
        energyType: "Electric",
        cardRate: 0.5,
        bids: []
    }, {
        cardID: 15,
        cardName: "Venusaur",
        cardImg: "https://den-cards.pokellector.com/119/Venusaur.BS.15.png",
        actionStartingDate: new Date("2024-11-15T00:00:00"),
        auctionEndDate: new Date("2024-11-25T00:00:00"),
        auctionStartingBid: 8000.00,
        cardType: "Pokemon",
        energyType: "Grass",
        cardRate: 9.5,
        bids: []
    }, {
        cardID: 16,
        cardName: "Zapdos",
        cardImg: "https://den-cards.pokellector.com/119/Zapdos.BS.16.png",
        actionStartingDate: new Date("2024-10-07T00:00:00"),
        auctionEndDate: new Date("2024-10-08T00:00:00"),
        auctionStartingBid: 1200.00,
        cardType: "Pokemon",
        energyType: "Electric",
        cardRate: 9.0,
        bids: [{
            bidID: 12, userID: 3, bidAmount: 1300.00, bidDate: new Date("2024-10-09")
        }, {
            bidID: 13, userID: 5, bidAmount: 1450.00, bidDate: new Date("2024-10-09")
        }, {
            bidID: 14, userID: 4, bidAmount: 1575.00, bidDate: new Date("2024-10-10")
        },]
    }, {
        cardID: 18,
        cardName: "Dragonair",
        cardImg: "https://den-cards.pokellector.com/119/Dragonair.BS.18.png",
        actionStartingDate: new Date("2024-11-12T00:00:00"),
        auctionEndDate: new Date("2024-11-22T00:00:00"),
        auctionStartingBid: 800.00,
        cardType: "Pokemon",
        energyType: "Normal",
        cardRate: 8.5,
        bids: []
    }, {
        cardID: 20,
        cardName: "Electabuzz",
        cardImg: "https://den-cards.pokellector.com/119/Electabuzz.BS.20.png",
        actionStartingDate: new Date("2024-11-18T00:00:00"),
        auctionEndDate: new Date("2024-11-28T00:00:00"),
        auctionStartingBid: 600.00,
        cardType: "Pokemon",
        energyType: "Electric",
        cardRate: 7.5,
        bids: []
    }, {
        cardID: 23,
        cardName: "Arcanine",
        cardImg: "https://den-cards.pokellector.com/119/Arcanine.BS.23.png",
        actionStartingDate: new Date("2024-11-13T00:00:00"),
        auctionEndDate: new Date("2024-11-23T00:00:00"),
        auctionStartingBid: 350.00,
        cardType: "Pokemon",
        energyType: "Fire",
        cardRate: 8.5,
        bids: []
    }, {
        cardID: 25,
        cardName: "Dewgong",
        cardImg: "https://den-cards.pokellector.com/119/Dewgong.BS.25.png",
        actionStartingDate: new Date("2024-11-06T00:00:00"),
        auctionEndDate: new Date("2024-11-16T00:00:00"),
        auctionStartingBid: 200.00,
        cardType: "Pokemon",
        energyType: "Water",
        cardRate: 6.5,
        bids: []
    }, {
        cardID: 26,
        cardName: "Dratini",
        cardImg: "https://den-cards.pokellector.com/119/Dratini.BS.26.png",
        actionStartingDate: new Date("2024-11-08T00:00:00"),
        auctionEndDate: new Date("2024-11-18T00:00:00"),
        auctionStartingBid: 150.00,
        cardType: "Pokemon",
        energyType: "Normal",
        cardRate: 6.0,
        bids: []
    }, {
        cardID: 28,
        cardName: "Growlithe",
        cardImg: "https://den-cards.pokellector.com/119/Growlithe.BS.28.png",
        actionStartingDate: new Date("2024-11-12T00:00:00"),
        auctionEndDate: new Date("2024-11-22T00:00:00"),
        auctionStartingBid: 600.00,
        cardType: "Pokemon",
        energyType: "Fire",
        cardRate: 7.5,
        bids: []
    }, {
        cardID: 29,
        cardName: "Haunter",
        cardImg: "https://den-cards.pokellector.com/119/Haunter.BS.29.png",
        actionStartingDate: new Date("2024-11-14T00:00:00"),
        auctionEndDate: new Date("2024-11-24T00:00:00"),
        auctionStartingBid: 350.00,
        cardType: "Pokemon",
        energyType: "Psychic",
        cardRate: 8.5,
        bids: []
    }, {
        cardID: 35,
        cardName: "Magikarp",
        cardImg: "https://den-cards.pokellector.com/119/Magikarp.BS.35.png",
        actionStartingDate: new Date("2024-10-01T00:00:00"),
        auctionEndDate: new Date("2024-11-21T00:00:00"),
        auctionStartingBid: 50.00,
        cardType: "Pokemon",
        energyType: "Water",
        cardRate: 6.5,
        bids: [{
            bidID: 15, userID: 4, bidAmount: 55.00, bidDate: new Date("2024-10-01")
        }, {
            bidID: 16, userID: 5, bidAmount: 60.00, bidDate: new Date("2024-10-01")
        }, {
            bidID: 17, userID: 3, bidAmount: 320.00, bidDate: new Date("2024-10-02")
        },]
    }, {
        cardID: 36,
        cardName: "Magmar",
        cardImg: "https://den-cards.pokellector.com/119/Magmar.BS.36.png",
        actionStartingDate: new Date("2024-10-07T23:49:30"),
        auctionEndDate: new Date("2024-10-07T23:49:40"),
        auctionStartingBid: 300.00,
        cardType: "Pokemon",
        energyType: "Fire",
        cardRate: 7.5,
        bids: [{
            bidID: 1, userID: 3, bidAmount: 310.00, bidDate: new Date("2024-06-06")
        }, {
            bidID: 2, userID: 4, bidAmount: 350.00, bidDate: new Date("2024-06-07")
        },]
    }, {
        cardID: 46,
        cardName: "Charmander",
        cardImg: "https://den-cards.pokellector.com/119/Charmander.BS.46.png",
        actionStartingDate: new Date("2024-11-05T00:00:00"),
        auctionEndDate: new Date("2024-11-15T00:00:00"),
        auctionStartingBid: 500.00,
        cardType: "Pokemon",
        energyType: "Fire",
        cardRate: 9.0,
        bids: []
    }, {
        cardID: 50,
        cardName: "Gastly",
        cardImg: "https://den-cards.pokellector.com/119/Gastly.BS.50.png",
        actionStartingDate: new Date("2024-11-14T00:00:00"),
        auctionEndDate: new Date("2024-11-24T00:00:00"),
        auctionStartingBid: 500.00,
        cardType: "Pokemon",
        energyType: "Psychic",
        cardRate: 8.5,
        bids: []
    }, {
        cardID: 58,
        cardName: "Pikachu",
        cardImg: "https://den-cards.pokellector.com/119/Pikachu.BS.58.png",
        actionStartingDate: new Date("2024-10-06T00:00:00"),
        auctionEndDate: new Date("2024-10-25T00:00:00"),
        auctionStartingBid: 1000.00,
        cardType: "Pokemon",
        energyType: "Electric",
        cardRate: 10.0,
        bids: [{
            bidID: 18, userID: 4, bidAmount: 1300.00, bidDate: new Date("2024-10-06")
        }, {
            bidID: 19, userID: 5, bidAmount: 1450.00, bidDate: new Date("2024-10-06")
        }, {
            bidID: 20, userID: 3, bidAmount: 1575.00, bidDate: new Date("2024-10-06")
        }, {
            bidID: 21, userID: 4, bidAmount: 1600.00, bidDate: new Date("2024-10-07")
        }, {
            bidID: 22, userID: 5, bidAmount: 1850.00, bidDate: new Date("2024-10-08")
        }, {
            bidID: 23, userID: 3, bidAmount: 2000.00, bidDate: new Date("2024-10-08")
        },]
    }, {
        cardID: 87,
        cardName: "Kingler",
        cardImg: "https://www.pokemonkaart.nl/wp-content/uploads/Fossil_Kingler.jpg",
        actionStartingDate: new Date("2024-12-07T13:03:00"),
        auctionEndDate: new Date("2024-12-022T13:03:15"),
        auctionStartingBid: 1000000000000,
        cardType: "Pokemon",
        energyType: "Water",
        cardRate: 10,
        bids: []
    }, {
        cardID: 88,
        cardName: "Trainer Gerralt",
        cardImg: "https://den-cards.pokellector.com/119/Professor-Oak.BS.88.png",
        actionStartingDate: new Date("2024-11-07T13:03:00"),
        auctionEndDate: new Date("2024-12-07T13:03:15"),
        auctionStartingBid: 1000000000000,
        cardType: "Trainer",
        energyType: "No Energy",
        cardRate: 10,
        bids: []
    }, {
        cardID: 96,
        cardName: "Normal Energy",
        cardImg: "https://den-cards.pokellector.com/119/Double-Colorless-Energy.BS.96.png",
        actionStartingDate: new Date("2024-10-04T00:00:00"),
        auctionEndDate: new Date("2024-10-04T00:00:00"),
        auctionStartingBid: 75.00,
        cardType: "Energy",
        energyType: "Normal",
        cardRate: 6.0,
        bids: [{
            bidID: 24, userID: 4, bidAmount: 100.00, bidDate: new Date("2024-10-05")
        }, {
            bidID: 25, userID: 5, bidAmount: 101.00, bidDate: new Date("2024-10-06")
        }, {
            bidID: 26, userID: 6, bidAmount: 102.00, bidDate: new Date("2024-10-10")
        },]
    }, {
        cardID: 97,
        cardName: "Fighting Energy",
        cardImg: "https://den-cards.pokellector.com/119/Fighting-Energy.BS.97.png",
        actionStartingDate: new Date("2024-11-27T00:00:00"),
        auctionEndDate: new Date("2024-11-07T00:00:00"),
        auctionStartingBid: 75.00,
        cardType: "Energy",
        energyType: "Fighting",
        cardRate: 7.0,
        bids: []
    }, {
        cardID: 98,
        cardName: "Fire Energy",
        cardImg: "https://den-cards.pokellector.com/119/Fire-Energy.BS.98.png",
        actionStartingDate: new Date("2024-10-29T00:00:00"),
        auctionEndDate: new Date("2024-11-09T00:00:00"),
        auctionStartingBid: 75.00,
        cardType: "Energy",
        energyType: "Fire",
        cardRate: 7.5,
        bids: []
    }, {
        cardID: 99,
        cardName: "Grass Energy",
        cardImg: "https://den-cards.pokellector.com/119/Grass-Energy.BS.99.png",
        actionStartingDate: new Date("2024-11-01T00:00:00"),
        auctionEndDate: new Date("2024-11-11T00:00:00"),
        auctionStartingBid: 75.00,
        cardType: "Energy",
        energyType: "Grass",
        cardRate: 6.5,
        bids: []
    }, {
        cardID: 100,
        cardName: "Lightning Energy",
        cardImg: "https://den-cards.pokellector.com/119/Lightning-Energy.BS.100.png",
        actionStartingDate: new Date("2024-11-03T00:00:00"),
        auctionEndDate: new Date("2024-11-13T00:00:00"),
        auctionStartingBid: 75.00,
        cardType: "Energy",
        energyType: "Electric",
        cardRate: 7.0,
        bids: []
    }, {
        cardID: 101,
        cardName: "Psychic Energy",
        cardImg: "https://den-cards.pokellector.com/119/Psychic-Energy.BS.101.png",
        actionStartingDate: new Date("2024-11-05T00:00:00"),
        auctionEndDate: new Date("2024-11-15T00:00:00"),
        auctionStartingBid: 75.00,
        cardType: "Energy",
        energyType: "Psychic",
        cardRate: 6.0,
        bids: []
    }, {
        cardID: 102,
        cardName: "Water Energy",
        cardImg: "https://den-cards.pokellector.com/119/Water-Energy.BS.102.png",
        actionStartingDate: new Date("2024-10-07T13:03:00"),
        auctionEndDate: new Date("2025-10-07T13:03:15"),
        auctionStartingBid: 75.00,
        cardType: "Energy",
        energyType: "Water",
        cardRate: 7.5,
        bids: [{
            bidID: 27, userID: 6, bidAmount: 102.00, bidDate: new Date("2024-10-10")
        },]
    }],

    users: [{
        userID: 1, isAdmin: true, userPass: "$2a$10$UNubya/7SbOC3xkGW/LiYOvh1h9Ac7bc/MMgUxYDN4Z6JcszHIvAC", //Pipipupu69
        userEmail: "KisaAlisa@gmail.com"
    }, {
        userID: 2, isAdmin: true, userPass: "$2a$10$8CsJGh9d43KYGV7FipXDTOQMpieMzwH6p.EjGHtpGUlu2DL0uD3qO", //Gt123
        userEmail: "gt@gmail.com"
    }, {
        userID: 3, isAdmin: false, userPass: "$2a$10$NXfbjhhouscrAKwNDSbgf.K9FWyKLQWcba6RYu6DJnGDmiJjOyngm", // Rt14
        userEmail: "rt14@gmail.com"
    }, {
        userID: 4, isAdmin: false, userPass: "$2a$10$msMlORDzIt22RW1TICP6aeMDI8No.NiuT1454s1vfFfyN5Fpmw0Yy", //Rt10
        userEmail: "rt10@gmail.com"
    }, {
        userID: 5, isAdmin: false, userPass: "$2a$10$TpgB6oD14psKN/Gk421.Ru0vy1MZOQkjjF3WRfRgNYy9J4Icns4ku",  //Rt6
        userEmail: "rt6@gmail.com"
    }, {
        userID: 6, isAdmin: false, userPass: "$2a$10$gtntej7QymxcqGAhkFALIemi9W7r/qKWL965gabT7fT7JGgKwtTm2", //Rt2
        userEmail: "rt2@gmail.com"
    }, {
        userID: 7, isAdmin: true, userPass: "$2a$10$btc3Cxd.UPE/hw2/QLWIHO.tETpQGBaYZkkCMTPbFZ/TFsQkUlfUu", //Rt123
        userEmail: "rt@gmail.com"
    }]
}

/**
 * Function to add months to the auctionEndDate of each card
 * I created this to test my auctions not to change the date every time I needed to test
 */
function addMonthsToAuctionEndDate(months) {
    data.cards.forEach(card => {
        const newEndDate = new Date(card.auctionEndDate);
        newEndDate.setMonth(newEndDate.getMonth() + months);
        card.auctionEndDate = newEndDate;
    });
}

addMonthsToAuctionEndDate(0);