const config = require('config').get('cli-app');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const cardname = config.get('cardname');
const businessNetwork = new BusinessNetworkConnection();
let businessNetworkDefinition;

businessNetwork.connect(cardname)
    .then((result) => {
        businessNetworkDefinition = result;
        console.log('Connected: BusinessNetworkDefinition : ' + result.getIdentifier());
        return businessNetwork.getParticipantRegistry('com.yiqishanyuan.demo.User');
    })
    .then((participantRegistry) => {
        return participantRegistry.getAll();
    })
    .then((result) => {
        console.log(result.length);
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    })