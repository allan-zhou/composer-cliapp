const config = require('config').get('cli-app');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const cardname = config.get('cardname');
const businessNetwork = new BusinessNetworkConnection();
let businessNetworkDefinition;

businessNetwork.connect(cardname)
    .then((result) => {
        businessNetworkDefinition = result;
        console.log('Connected: BusinessNetworkDefinition : ' + result.getIdentifier());
        return businessNetwork.getAssetRegistry('com.yiqishanyuan.demo.Commodity');
    })
    .then((assetRegistry) => {
        return assetRegistry.get('1');
    })
    .then((result) => {
        console.log(result);
        
        for (var key in result) {
            var element = result[key];
            console.log('key:' + key + '   value:'+ element);
        }
        console.log(businessNetwork.getCard());
    })
    .catch((err) => {
        console.log(err);
    })