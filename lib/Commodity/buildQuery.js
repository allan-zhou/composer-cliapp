const config = require('config').get('cli-app');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const cardname = config.get('cardname');
const businessNetwork = new BusinessNetworkConnection();
let businessNetworkDefinition;

businessNetwork.connect(cardname)
    .then((result) => {
        businessNetworkDefinition = result;
        console.log('Connected: BusinessNetworkDefinition : ' + result.getIdentifier());

        let queryString = 'SELECT com.yiqishanyuan.demo.Commodity WHERE (price < _$price)';
        let price = 3000;
        let queryString = 'SELECT com.yiqishanyuan.demo.Commodity WHERE (owner == _$owner)';
        let owner = 'resource:com.yiqishanyuan.demo.User#1';
        let queryString = 'SELECT com.yiqishanyuan.demo.Commodity WHERE (commodityCategory == _$commodityCategory)';
        let commodityCategory = 'PHONE';

        // let factory = businessNetworkDefinition.getFactory();
        // let relationship = factory.newRelationship('com.yiqishanyuan.demo', 'User', '1');
        // console.log(relationship.getFullyQualifiedIdentifier()); //com.yiqishanyuan.demo.User#1
        // console.log(relationship.getIdentifier()); //1
        // console.log(relationship.toURI());//resource:com.yiqishanyuan.demo.User#1
        // console.log(relationship.toString());//Relationship {id=com.yiqishanyuan.demo.User#1}
        // console.log(relationship.getType()); // User
        // console.log(relationship.getNamespace()); //com.yiqishanyuan.demo
        // console.log(relationship.getFullyQualifiedType()); //com.yiqishanyuan.demo.User
        // console.log(relationship.instanceOf('com.yiqishanyuan.demo.User'));

        let query = businessNetwork.buildQuery(queryString);
        return businessNetwork.query(query, { commodityCategory: commodityCategory });
    })
    .then((asset) => {
        console.log(asset.length);
        console.log(asset);
    })
    .catch((err) => {
        console.log(err);
    })