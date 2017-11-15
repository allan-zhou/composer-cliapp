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
        let factory = businessNetworkDefinition.getFactory();

        let user2 = factory.newResource('com.yiqishanyuan.demo', 'User', '2')
        user2.userName = '乙';
        user2.age = 20;
        user2.phoneNumber = '13612345678';

        let user3 = factory.newResource('com.yiqishanyuan.demo', 'User', '3')
        user3.userName = '丙';
        user3.age = 30;
        user3.phoneNumber = '13712345678';

        return participantRegistry.addAll([user2, user3]);
    })
    .then(() => {
        console.log('ok');
    })
    .catch((err) => {
        console.log(err);
    })