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

        let owner = factory.newRelationship('com.yiqishanyuan.demo','User','1');

        let commodity2 = factory.newResource('com.yiqishanyuan.demo','Commodity','2');
        commodity2.commodityName = 'XiaoMi 6';
        commodity2.price = 2499;
        commodity2.owner = owner;
        commodity2.commodityCategory = 'PHONE';

        let commodity3 = factory.newResource('com.yiqishanyuan.demo','Commodity','3');
        commodity3.commodityName = 'Honor 9';
        commodity3.price = 2499;
        commodity3.owner = owner;
        commodity3.commodityCategory = 'PHONE';


        return assetRegistry.addAll([commodity2,commodity3]);
    })
    .then(() => {
        console.log('ok');
    })
    .catch((err) => {
        console.log(err);
    })