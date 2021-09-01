// module.exports = {
//     UserModel: require('./user'),
//     DestinationModel: require('./destination')
// };

const UserModel = require('./user');
const DestinationModel = require('./destination')
const ForumModel = require('./forum')

module.exports = {UserModel, DestinationModel, ForumModel};