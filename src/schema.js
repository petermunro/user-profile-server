'use strict';

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  nodeDefinitions,
} from 'graphql-relay';

import userProfiles from './user-profiles.json';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return getUser(id);
    } else if (type === 'Widget') {
      return getWidget(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return userType;
    } else if (obj instanceof Widget)  {
      return widgetType;
    } else {
      return null;
    }
  }
);


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

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
let UserProfileType = new GraphQLObjectType({
  name: 'UserProfile',
  description: 'A user profile',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'The name of this user'
    },
    location: {
      type: LocationType,
      description: 'The user\'s location'
    }
  }),
});




let xUserProfileType = new GraphQLObjectType({
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
      }
    }
  })
});

export default schema;
