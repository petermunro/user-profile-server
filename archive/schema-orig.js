'use strict';

import {
  graphql,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLInterfaceType,
  GraphQLNonNull
} from 'graphql';

import userProfiles from './user-profiles.json';

var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'Game') {
      return getGame(id);
    } else if (type === 'HidingSpot') {
      return getHidingSpot(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Game) {
      return gameType;
    } else if (obj instanceof HidingSpot)  {
      return hidingSpotType;
    } else {
      return null;
    }
  }
);

const Node = new GraphQLInterfaceType({
  name: 'Node',
  description: 'The Node interface',
  fields: () => ({
    name: { GraphQLString },
    id: {
      type: GraphQLNonNull(GraphQLString),
      description: 'This node\'s id'
    }
  }),
  resolve: () => { },
  resolveType:
});

const UserProfileNodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  description: 'The UserProfile Node interface',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLString),
      description: 'This UserProfile node\'s id'
    }
  }),
  resolve: () => { }
});

const LocationType = new GraphQLObjectType({
  name: 'Location',
  description: 'A location',
  fields: () => ({
    city: {
      type: GraphQLString,
      description: 'The user\'s city'
    },
    country: {
      type: GraphQLString,
      description: 'The user\'s country'
    }
  })
});

const UserProfileType = new GraphQLObjectType({
  name: 'UserProfile',
  description: 'A user profile',
  fields: () => ({
      id: {
        type: GraphQLString,
        description: 'The id of this UserProfile'
      },
      name: {
        type: GraphQLString,
        description: 'The name of this user'
      },
      location: {
        type: LocationType,
        description: 'The user\'s location'
      }
  })
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      userProfiles: {
        type: new GraphQLList(UserProfileType),
        resolve: () => userProfiles
      },
      interfaces: [ Node ],
      isTypeOf: (value) => value instanceof Node
      /*
            name: {
              type: UserProfileNodeInterface
            }
      */
    },
    interfaces: [ Node ]
  })
});


export default schema;