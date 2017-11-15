const config = require('config').get('cli-app');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const cardname = config.get('cardname');
const businessNetwork = new BusinessNetworkConnection();
let businessNetworkDefinition;

businessNetwork.connect(cardname)
    .then((result) => {
        businessNetworkDefinition = result;
        console.log('Connected: BusinessNetworkDefinition : ' + result.getIdentifier());

        // return businessNetwork.query('selectAllCommodity');

        let factory = businessNetworkDefinition.getFactory();
        let owner = factory.newRelationship('com.yiqishanyuan.demo', 'User', '1');
        
        return businessNetwork.query('selectCommodityByOwner', { owner: owner.toURI() });
    })
    .then((asset) => {
        console.log(asset);
    })
    .catch((err) => {
        console.log(err);
    })