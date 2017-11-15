const config = require('config').get('cli-app');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const cardname = config.get('cardname');
const businessNetwork = new BusinessNetworkConnection();
let businessNetworkDefinition;

businessNetwork.connect(cardname)
    .then((result) => {
        businessNetworkDefinition = result;
        console.log('Connected: BusinessNetworkDefinition : ' + result.getIdentifier());

        let factory = businessNetworkDefinition.getFactory();
        let tx = factory.newTransaction('com.yiqishanyuan.demo', 'tradeCommodity');
        tx.buyer = factory.newRelationship('com.yiqishanyuan.demo', 'User', '2');
        tx.commodity = factory.newRelationship('com.yiqishanyuan.demo', 'Commodity', '1')

        return businessNetwork.submitTransaction(tx);
    })
    .then(() => {
        console.log('ok');
    })
    .catch((err) => {
        console.log(err);
    })