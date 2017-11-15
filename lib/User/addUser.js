const config = require('config').get('cli-app');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const cardname = config.get('cardname'); // admin@shanyuan-network
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
        let factory = businessNetworkDefinition.getFactory();

        let user = factory.newResource('com.yiqishanyuan.demo','User','1')
        user.userName = '甲';
        user.phoneNumber = '13512345678';

        return participantRegistry.add(user);
    })
    .then(() => {
        console.log('ok');
    })
    .catch((err) => {
        console.log(err);
    })