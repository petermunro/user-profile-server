'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _userProfiles = require('./user-profiles.json');

var _userProfiles2 = _interopRequireDefault(_userProfiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */

var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function (globalId) {
  var _fromGlobalId = fromGlobalId(globalId);

  var type = _fromGlobalId.type;
  var id = _fromGlobalId.id;

  if (type === 'User') {
    return getUser(id);
  } else if (type === 'Widget') {
    return getWidget(id);
  } else {
    return null;
  }
}, function (obj) {
  if (obj instanceof User) {
    return userType;
  } else if (obj instanceof Widget) {
    return widgetType;
  } else {
    return null;
  }
});

var nodeInterface = _nodeDefinitions.nodeInterface;
var nodeField = _nodeDefinitions.nodeField;


var LocationType = new _graphql.GraphQLObjectType({
  name: 'Location',
  description: 'A location',
  fields: function fields() {
    return {
      city: {
        type: _graphql.GraphQLString,
        description: 'The user\'s city'
      },
      country: {
        type: _graphql.GraphQLString,
        description: 'The user\'s country'
      }
    };
  }
});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var UserProfileType = new _graphql.GraphQLObjectType({
  name: 'UserProfile',
  description: 'A user profile',
  fields: function fields() {
    return {
      name: {
        type: _graphql.GraphQLString,
        description: 'The name of this user'
      },
      location: {
        type: LocationType,
        description: 'The user\'s location'
      }
    };
  }
});

var schema = new _graphql.GraphQLSchema({
  query: new _graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      node: nodeField,
      userProfiles: {
        type: new _graphql.GraphQLList(UserProfileType),
        resolve: function resolve() {
          return _userProfiles2.default;
        }
      }
    }
  })
});

exports.default = schema;
//# sourceMappingURL=schema.js.map