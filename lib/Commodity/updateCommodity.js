const config = require('config').get('cli-app');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const cardname = config.get('cardname');
const businessNetwork = new BusinessNetworkConnection();
let businessNetworkDefinition;
let assetRegistry;

businessNetwork.connect(cardname)
    .then((result) => {
        businessNetworkDefinition = result;
        console.log('Connected: BusinessNetworkDefinition : ' + result.getIdentifier());
        
        return businessNetwork.getAssetRegistry('com.yiqishanyuan.demo.Commodity');
    })
    .then((result) => {
        assetRegistry = result;
        return result.get('1')
    })
    .then((commodity) => {
        commodity.price = 5999; 
        return assetRegistry.update(commodity);
    })
    .then(() => {
        console.log('ok');
    })
    .catch((err) => {
        console.log(err);
    })