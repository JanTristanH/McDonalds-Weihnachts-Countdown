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
        "19.02.": "Heute: Big Mac für nur 1€.",
        "20.02.": "Heute: Doppelpack für nur 6,99€*.",
        "21.02.": "Heute: 6er Chicken McNuggets für nur 1€. ",
        "22.02.": "Heute: 2x McMenü Small für nur 7,99€* oder gratis McDonald’s Socken. Oder du nimmst einfach beides! ",
        "23.02.": "Heute: 20er Chicken McNuggets für nur 4€.",
        "24.02.": "Heute: Doppelpack für nur 6,99€*.",
        "25.02.": "Heute: Chicken Sparpack für nur 6,99€.",
        "26.02.": "Heute: Filet-o-Fish für nur 1€.",
        "27.02.": "Heute: McMenü Small für nur 3,99€*. ",
        "28.02.": "Heute exklusiv: McBacon für nur 2,49€.",
        "29.02.": "Heute: Big Rösti McMenü Small für nur 4,99€.",
        "01.03.": "Heute: 20er Chicken McNuggets für nur 4€.",
        "02.03.": "Heute: McFlurry für nur 1€.",
        "03.03.": "Heute exklusiv: McBacon für nur 2,49€.",
        "04.03.": "Heute: 6er Chicken McNuggets für nur 1€.",
        "05.03.": "Heute: 2x McMenü Small für nur 7,99€*",
        "06.03.": "Heute: 5 Chili Cheese Snackers für nur 1,50€.",
        "07.03.": "Heute: 20er Chicken McNuggets für nur 4€ oder McDonald’s Frisbee sichern. Oder du nimmst einfach beides!",
        "08.03.": "Heute: McMenü Small + Happy Meal für nur 7,99€*.",
        "09.03.": "Heute: Big Tasty Bacon McMenü Small für nur 4,99€*.",
        "10.03.": "Heute: McFlurry für nur 1€.",
        "11.03.": "Heute: 11er Chicken McNuggets für nur 2€.",
        "12.03.": "Heute exklusiv: McBacon für nur 2,49€.",
        "13.03.": "Heute: 2x McMenü Small für nur 7,99€",
        "14.03.": "Heute: 20er Chicken McNuggets für nur 4€.",
        "15.03.": "Heute: Doppelpack für nur 6,99€*.",
        "16.03.": "Heute: Chicken Sparpack für nur 6,99€.",
        "17.03.": "Heute: Big Mac für nur 1€.",
        "18.03.": "Heute: McMenü Small für nur 3,99€*.",
        "19.03.": "Heute: Doppel-Chickenburger für nur 2€.",
        "20.03.": "Heute: 11er Chicken McNuggets für nur 2€ oder McDonald’s Sonnenbrille gratis. Oder du nimmst einfach beides!",
        "21.03.": "Heute: 2x McMenü Small für nur 7,99€ ",
        "22.03.": "Heute: McMenü Small + Happy Meal für nur 7,99€.",
        "23.03.": "Heute exklusiv: McBacon für nur 2,49€.",
        "24.03.": "Heute: McFlurry für nur 1€."
    }
    let d = new Date;
    let day = d.getDate();
    let dateString = (day < 10 ? "0" : "") + day + "." + (d.getMonth() + 1) + ".";
    let answer = "";
    if (date.date !== "default") {

        let dateStringParam = date.date.substring(5, 10).split("-").reverse().join(".") + ".";
        console.log("mein Datum", dateStringParam);
        answer = offers[dateStringParam];
        if (!answer){
            answer = "Für dieses Datum gibt es Leider keine Angebote.";
        }
        //don't replace request for today
        if(dateStringParam !== dateString){
            answer = answer.replace("Heute", `Am ${dateStringParam}`);
        }
    } else {
        //default day is tody
        answer = offers[dateString];
        if (!answer){
            answer = "Heute gibt es Leider keine Angebote.";
        }
    }
    conv.close(answer);

});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.region('europe-west1').https.onRequest(app);