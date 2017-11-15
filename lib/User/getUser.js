const config = require('config').get('cli-app');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

const cardname = config.get('cardname');
const businessNetwork = new BusinessNetworkConnection();
let businessNetworkDefinition;

businessNetwork.connect(cardname)
    .then((result) => {
        businessNetworkDefinition = result;
        console.log('Connected: BusinessNetworkDefinition : ' + result.getIdentifier());
        return businessNetwork.getParticipantRegistry('com.yiqishanyuan.demo.User');
    })
    .then((participantRegistry) => {
        return participantRegistry.get('1');
    })
    .then((result) => {
        console.log(typeof result);
        console.log(result);
        console.log(result.getFullyQualifiedType());

        var introspector = businessNetworkDefinition.getIntrospector();
        var declaration = introspector.getClassDeclaration(result.getFullyQualifiedType());
        console.log(declaration.getDecorator('role').getArguments()); //[ 'role1', 'role2' ]
    })
    .catch((err) => {
        console.log(err);
    })