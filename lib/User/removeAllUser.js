const config = require('config').get('cli-app');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const cardname = config.get('cardname');
const businessNetwork = new BusinessNetworkConnection();
let businessNetworkDefinition;

businessNetwork.connect(cardname)
    .then((result) => {
        businessNetworkDefinition = result;
        console.log('Connected: BusinessNetworkDefinition : ' + result.getIdentifier());
        return result;
    })
    .then((businessNetworkDefinition) => {
        return businessNetwork.getParticipantRegistry('com.yiqishanyuan.demo.User');
    })
    .then((participantRegistry) => {
        return participantRegistry.removeAll(['5','abc']);
    })
    .then(() => {
        console.log('ok');
    })
    .catch((err) => {
        console.log(err);
    })