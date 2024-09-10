//role 1 = adm 0 = normal

const users = [
    {
        userID: 1,
        userRole: 1,
        userName: "KisaLisa",
        userPass: "Pipipupu69",
        userEmail: "kisaLisa@gmail.com"
    },
    {
        userID: 2,
        userRole: 1,
        userName: "Gerralt",
        userPass: "G-T",
        userEmail: "gt@gmail.com"
    },
    {
        userID: 3,
        userRole: 0,
        userName: "RT14",
        userPass: "RT14",
        userEmail: "rt14@gmail.com"
    },
    {
        userID: 4,
        userRole: 0,
        userName: "RT10",
        userPass: "RT10",
        userEmail: "rt10@gmail.com"
    },
    {
        userID: 4,
        userRole: 0,
        userName: "RT6",
        userPass: "RT6",
        userEmail: "rt6@gmail.com"
    },
    {
        userID: 5,
        userRole: 0,
        userName: "RT2",
        userPass: "RT2",
        userEmail: "rt2@gmail.com"
    }
];

const cards  = [
    {
        CardID: 1,
        CardName: "Alakazam",
        CardImg: "https://den-cards.pokellector.com/119/Alakazam.BS.1.png",
        ActionStartingDate: new Date("2024-09-05"),
        AuctionEndDate: new Date("2024-09-15"),
        AuctionStartingBid: 150.00
    },
    {
        CardID: 2,
        CardName: "Blastoise",
        CardImg: "https://den-cards.pokellector.com/119/Blastoise.BS.2.png",
        ActionStartingDate: new Date("2024-09-10"),
        AuctionEndDate: new Date("2024-09-20"),
        AuctionStartingBid: 5000.00
    },
    {
        CardID: 3,
        CardName: "Chansey",
        CardImg: "https://den-cards.pokellector.com/119/Chansey.BS.3.png",
        ActionStartingDate: new Date("2024-09-12"),
        AuctionEndDate: new Date("2024-09-22"),
        AuctionStartingBid: 120.00
    },
    {
        CardID: 4,
        CardName: "Charizard",
        CardImg: "https://den-cards.pokellector.com/119/Charizard.BS.4.png",
        ActionStartingDate: new Date("2024-09-08"),
        AuctionEndDate: new Date("2024-09-18"),
        AuctionStartingBid: 10000.00
    },
    {
        CardID: 6,
        CardName: "Gyarados",
        CardImg: "https://den-cards.pokellector.com/119/Gyarados.BS.6.png",
        ActionStartingDate: new Date("2024-09-15"),
        AuctionEndDate: new Date("2024-09-25"),
        AuctionStartingBid: 800.00
    },
    {
        CardID: 8,
        CardName: "Machamp",
        CardImg: "https://den-cards.pokellector.com/119/Machamp.BS.8.png",
        ActionStartingDate: new Date("2024-09-06"),
        AuctionEndDate: new Date("2024-09-16"),
        AuctionStartingBid: 3000.00
    },
    {
        CardID: 10,
        CardName: "Mewtwo",
        CardImg: "https://den-cards.pokellector.com/119/Mewtwo.BS.10.png",
        ActionStartingDate: new Date("2024-09-11"),
        AuctionEndDate: new Date("2024-09-21"),
        AuctionStartingBid: 7500.00
    },
    {
        CardID: 12,
        CardName: "Ninetales",
        CardImg: "https://den-cards.pokellector.com/119/Ninetales.BS.12.png",
        ActionStartingDate: new Date("2024-09-07"),
        AuctionEndDate: new Date("2024-09-17"),
        AuctionStartingBid: 950.00
    },
    {
        CardID: 14,
        CardName: "Raichu",
        CardImg: "https://den-cards.pokellector.com/119/Raichu.BS.14.png",
        ActionStartingDate: new Date("2024-09-13"),
        AuctionEndDate: new Date("2024-09-23"),
        AuctionStartingBid: 300.00
    },
    {
        CardID: 15,
        CardName: "Venusaur",
        CardImg: "https://den-cards.pokellector.com/119/Venusaur.BS.15.png",
        ActionStartingDate: new Date("2024-09-15"),
        AuctionEndDate: new Date("2024-09-25"),
        AuctionStartingBid: 8000.00
    },
    {
        CardID: 16,
        CardName: "Zapdos",
        CardImg: "https://den-cards.pokellector.com/119/Zapdos.BS.16.png",
        ActionStartingDate: new Date("2024-09-08"),
        AuctionEndDate: new Date("2024-09-18"),
        AuctionStartingBid: 1200.00
    },
    {
        CardID: 18,
        CardName: "Dragonair",
        CardImg: "https://den-cards.pokellector.com/119/Dragonair.BS.18.png",
        ActionStartingDate: new Date("2024-09-12"),
        AuctionEndDate: new Date("2024-09-22"),
        AuctionStartingBid: 800.00
    },
    {
        CardID: 20,
        CardName: "Electabuzz",
        CardImg: "https://den-cards.pokellector.com/119/Electabuzz.BS.20.png",
        ActionStartingDate: new Date("2024-09-18"),
        AuctionEndDate: new Date("2024-09-28"),
        AuctionStartingBid: 600.00
    },
    {
        CardID: 23,
        CardName: "Arcanine",
        CardImg: "https://den-cards.pokellector.com/119/Arcanine.BS.23.png",
        ActionStartingDate: new Date("2024-09-13"),
        AuctionEndDate: new Date("2024-09-23"),
        AuctionStartingBid: 350.00
    },
    {
        CardID: 25,
        CardName: "Dewgong",
        CardImg: "https://den-cards.pokellector.com/119/Dewgong.BS.25.png",
        ActionStartingDate: new Date("2024-09-06"),
        AuctionEndDate: new Date("2024-09-16"),
        AuctionStartingBid: 200.00
    },
    {
        CardID: 26,
        CardName: "Dratini",
        CardImg: "https://den-cards.pokellector.com/119/Dratini.BS.26.png",
        ActionStartingDate: new Date("2024-09-08"),
        AuctionEndDate: new Date("2024-09-18"),
        AuctionStartingBid: 150.00
    },
    {
        CardID: 28,
        CardName: "Growlithe",
        CardImg: "https://den-cards.pokellector.com/119/Growlithe.BS.28.png",
        ActionStartingDate: new Date("2024-09-12"),
        AuctionEndDate: new Date("2024-09-22"),
        AuctionStartingBid: 600.00
    },
    {
        CardID: 29,
        CardName: "Haunter",
        CardImg: "https://den-cards.pokellector.com/119/Haunter.BS.29.png",
        ActionStartingDate: new Date("2024-09-14"),
        AuctionEndDate: new Date("2024-09-24"),
        AuctionStartingBid: 350.00
    },
    {
        CardID: 35,
        CardName: "Magikarp",
        CardImg: "https://den-cards.pokellector.com/119/Magikarp.BS.35.png",
        ActionStartingDate: new Date("2024-09-11"),
        AuctionEndDate: new Date("2024-09-21"),
        AuctionStartingBid: 50.00
    },
    {
        CardID: 36,
        CardName: "Magmar",
        CardImg: "https://den-cards.pokellector.com/119/Magmar.BS.36.png",
        ActionStartingDate: new Date("2024-09-13"),
        AuctionEndDate: new Date("2024-09-23"),
        AuctionStartingBid: 300.00
    },
    {
        CardID: 46,
        CardName: "Charmander",
        CardImg: "https://den-cards.pokellector.com/119/Charmander.BS.46.png",
        ActionStartingDate: new Date("2024-09-05"),
        AuctionEndDate: new Date("2024-09-15"),
        AuctionStartingBid: 500.00
    },
    {
        CardID: 50,
        CardName: "Gastly",
        CardImg: "https://den-cards.pokellector.com/119/Gastly.BS.50.png",
        ActionStartingDate: new Date("2024-09-14"),
        AuctionEndDate: new Date("2024-09-24"),
        AuctionStartingBid: 500.00
    },
    {
        CardID: 58,
        CardName: "Pikachu",
        CardImg: "https://den-cards.pokellector.com/119/Pikachu.BS.58.png",
        ActionStartingDate: new Date("2024-09-15"),
        AuctionEndDate: new Date("2024-09-25"),
        AuctionStartingBid: 1000.00
    },
    {
        CardID: 96,
        CardName: "Double Colorless Energy",
        CardImg: "https://den-cards.pokellector.com/119/Double-Colorless-Energy.BS.96.png",
        ActionStartingDate: new Date("2024-09-25"),
        AuctionEndDate: new Date("2024-10-05"),
        AuctionStartingBid: 75.00
    },
    {
        CardID: 97,
        CardName: "Fighting Energy",
        CardImg: "https://den-cards.pokellector.com/119/Fighting-Energy.BS.97.png",
        ActionStartingDate: new Date("2024-09-27"),
        AuctionEndDate: new Date("2024-10-07"),
        AuctionStartingBid: 75.00
    },
    {
        CardID: 98,
        CardName: "Fire Energy",
        CardImg: "https://den-cards.pokellector.com/119/Fire-Energy.BS.98.png",
        ActionStartingDate: new Date("2024-09-29"),
        AuctionEndDate: new Date("2024-10-09"),
        AuctionStartingBid: 75.00
    },
    {
        CardID: 99,
        CardName: "Grass Energy",
        CardImg: "https://den-cards.pokellector.com/119/Grass-Energy.BS.99.png",
        ActionStartingDate: new Date("2024-10-01"),
        AuctionEndDate: new Date("2024-10-11"),
        AuctionStartingBid: 75.00
    },
    {
        CardID: 100,
        CardName: "Lightning Energy",
        CardImg: "https://den-cards.pokellector.com/119/Lightning-Energy.BS.100.png",
        ActionStartingDate: new Date("2024-10-03"),
        AuctionEndDate: new Date("2024-10-13"),
        AuctionStartingBid: 75.00
    },
    {
        CardID: 101,
        CardName: "Psychic Energy",
        CardImg: "https://den-cards.pokellector.com/119/Psychic-Energy.BS.101.png",
        ActionStartingDate: new Date("2024-10-05"),
        AuctionEndDate: new Date("2024-10-15"),
        AuctionStartingBid: 75.00
    },
    {
        CardID: 102,
        CardName: "Water Energy",
        CardImg: "https://den-cards.pokellector.com/119/Water-Energy.BS.102.png",
        ActionStartingDate: new Date("2024-10-07"),
        AuctionEndDate: new Date("2024-10-17"),
        AuctionStartingBid: 75.00
    }
];