'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {
    dialogflow
} = require('actions-on-google');
const {
    firestore
} = require('firebase-admin');
// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({
    debug: true
});

// Handle the Dialogflow intent named 'bike available'.
app.intent('TodaysOffer', (conv, date) => {

    let offers = {
        "17.10.": " Heute: Big Mac für nur 1€. ",
        "18.10.": " Heute: Doppelpack für nur 6,99€. Gilt nicht für Big Tasty Bacon, Double Steakhouse Beef sowie The Signature Collection.",
        "19.10.": " Heute: 20er Chicken McNuggets für nur 4€ oder Pommes-Socken gratis. Oder du nimmst einfach beides! ",
        "20.10.": " Heute: McMenü Small und Happy Meal für nur 7,50€. Gilt nicht für McMenü Small mit Big Tasty Bacon, Double Steakhouse Beef sowie The Signature Collection.",
        "21.10.": " Heute: McChicken Classic für nur 1€. ",
        "22.10.": " Heute: McMenü Small für nur 3,99€ oder gratis Lipton Green Ice Tea 0,5l. Oder du nimmst einfach beides! Gilt nicht für McMenü Small mit Big Tasty Bacon, Double Steakhouse Beef sowie The Signature Collection.",
        "23.10.": " Heute: 6er Chicken McNuggets für nur 1€. ",
        "24.10.": " Heute: Cheeseburger für nur 1€. ",
        "25.10.": " Heute: McFlurry für nur 1€. ",
        "26.10.": " Heute: Doppelpack für nur 6,99€. Gilt nicht für Big Tasty Bacon, Double Steakhouse Beef sowie The Signature Collection.",
        "27.10.": " Heute: 20er Chicken McNuggets für nur 4€. ",
        "28.10.": " Heute: Ein McMenü Small für nur 3,99€. Gilt nicht für McMenü Small mit Big Tasty Bacon, Double Steakhouse Beef sowie The Signature Collection.",
        "29.10.": " Heute: Ein McChicken Classic für nur 1€. ",
        "30.10.": " Heute: McFlurry für nur 1€. ",
        "31.10.": " Heute: Doppelpack für nur 6,99€ oder gratis Halloween Fanta Dark Orange 0,5l. Oder du nimmst einfach beides! Gilt nicht Big Tasty Bacon, Double Steakhouse Beef sowie The Signature Collection.",
        "01.11.": " Heute: 20er Chicken McNuggets für nur 4€. ",
        "02.11.": " Heute: Doppelpack für nur 6,99€ oder gratis McDonald’s Bandana. Oder du nimmst einfach beides! Gilt nicht für Big Tasty Bacon, Double Steakhouse Beef sowie The Signature Collection.",
        "03.11.": " Heute: McMenü Small und Happy Meal und ein Chupa Chups Lolli für nur 7,50€. Gilt nicht für McMenü Small mit Big Tasty Bacon, Double Steakhouse Beef sowie The Signature Collection.",
        "04.11.": " Heute: Big Mac für nur 1€. ",
        "05.11.": " Heute: Chickenburger für nur 1€. ",
        "06.11.": " Heute: McFlurry für nur 1€ oder gratis McFlurry Lipstick. Oder du nimmst einfach beides! ",
        "07.11.": " Heute: McMenü Small für nur 3,99€. Gilt nicht für McMenü Small mit Big Tasty Bacon, Double Steakhouse Beef sowie The Signature Collection.",
        "08.11.": " Heute: Filet-o-Fish für nur 1€. ",
        "09.11.": " Heute: 20er Chicken McNuggets für nur 4€. ",
        "10.11.": " Heute: McMenü Small und Happy Meal für nur 7,50€. Gilt nicht für McMenü Small mit Big Tasty Bacon, Double Steakhouse Beef sowie The Signature Collection.",
        "11.11.": " Heute: Doppelpack für nur 6,99€ oder gratis Red Bull 0,25l. Oder du nimmst einfach beides! Gilt nicht für Big Tasty Bacon, Double Steakhouse Beef sowie The Signature Collection.",
        "12.11.": " Heute: 6er Chicken McNuggets für nur 1€. ",
        "13.11.": " Heute: McFlurry für nur 1€. "
    }
    let d = new Date;
    let day = d.getDate();
    let dateString = (day < 10 ? "0" : "") + day + "." + (d.getMonth() + 1) + ".";
    let answer = "";
    if (date.date !== "heute") {

        let dateStringParam = date.date.substring(5, 10).split("-").reverse().join(".") + ".";
        console.log("mein Datum", dateStringParam);
        answer = offers[dateStringParam];
        //don't replace request for today
        if(dateStringParam !== dateString){
            answer = answer.replace("Heute", `Am ${dateStringParam}`);
        }
    } else {
        //default day is tody
        answer = offers[dateString];
    }
    conv.close(answer);

});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.region('europe-west1').https.onRequest(app);