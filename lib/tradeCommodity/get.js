const config = require('config').get('cli-app');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const cardname = config.get('cardname');
const businessNetwork = new BusinessNetworkConnection();
let businessNetworkDefinition;

businessNetwork.connect(cardname)
    .then((result) => {
        businessNetworkDefinition = result;
        console.log('Connected: BusinessNetworkDefinition : ' + result.getIdentifier());
        return businessNetwork.getTransactionRegistry('com.yiqishanyuan.demo.tradeCommodity');
    })
    .then((txRegistry) => {
        return txRegistry.get('dc70a5f18ede582817f20de708362e2918781ecc0618578de146645ab637ad7b');
    })
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    })