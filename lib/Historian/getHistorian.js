const fs = require('fs');
const path = require('path');
const config = require('config').get('cli-app');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const cardname = config.get('cardname');
const businessNetwork = new BusinessNetworkConnection();
let businessNetworkDefinition;
let historianId;

businessNetwork.connect(cardname)
    .then((result) => {
        businessNetworkDefinition = result;
        console.log('Connected: BusinessNetworkDefinition : ' + result.getIdentifier());
        return businessNetwork.getHistorian();
    })
    .then((historian) => {
        return historian.getAll();
    })
    .then((result) => {
        console.log(result.length);
        // console.log(result);
    
        let file = path.join(__dirname,'../../log','historian.json');
        fs.writeFile(file, result);
    })
    .then(() => {
        console.log('ok');
    })
    .catch((err) => {
        console.log(err);
    })