const config = require('config').get('cli-app');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const cardname = config.get('cardname');
const businessNetwork = new BusinessNetworkConnection();
let businessNetworkDefinition;

businessNetwork.connect(cardname)
    .then((result) => {
        businessNetworkDefinition = result;
        console.log('Connected: BusinessNetworkDefinition : ' + result.getIdentifier());
        return businessNetwork.getAssetRegistry('org.hyperledger.composer.system.HistorianRecord');
    })
    .then((result) => {
        return result.get('1d174b137781ce7ead3cda76b46ac60dea86b1265a839918353ffa4d4023f354');
    })
    .then((result) => {
        console.log(typeof result);
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    })