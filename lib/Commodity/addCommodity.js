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
        let factory = businessNetworkDefinition.getFactory();

        let commodity = factory.newResource('com.yiqishanyuan.demo','Commodity','4');
        let owner = factory.newRelationship('com.yiqishanyuan.demo','User','1');
        commodity.commodityName = '格力空调';
        commodity.price = 3888;
        commodity.owner = owner;
        commodity.commodityCategory = 'AIRCONDITIONER';

        return assetRegistry.add(commodity);
    })
    .then(() => {
        console.log('ok');
    })
    .catch((err) => {
        console.log(err);
    })