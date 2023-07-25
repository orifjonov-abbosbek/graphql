import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import Context from '../../types/context.js';
import profileObjectType from '../../queries/profiles/profiles.js';

interface ICreateProfile {
  dto: {
    isMale: boolean;
    yearOfBirth: number;
    userId: string;
    memberTypeId: string;
  };
}

const createProfileObjectType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    userId: {
      type: GraphQLString,
    },
    memberTypeId: {
      type: GraphQLString,
    },
  }),
});

const createProfile = {
  createProfile: {
    type: profileObjectType as GraphQLObjectType,
    args: {
      dto: {
        type: createProfileObjectType,
      },
    },
    resolve: async (_source: any, args: ICreateProfile, context: Context) => {
      return await context.prisma.profile.create({
        data: args.dto,
      });
    },
  },
};

export { createProfile, createProfileObjectType };
