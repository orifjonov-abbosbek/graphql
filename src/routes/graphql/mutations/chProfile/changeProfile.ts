import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLID, // Use GraphQLID for string-like identifiers
} from 'graphql';
import profileObjectType from '../../queries/profiles/profiles.js';
import Context from '../../types/context.js';

interface IChangeProfile {
  id: string;
  dto: {
    isMale: boolean;
    yearOfBirth: number;
    memberTypeId: string;
  };
}

const changeProfileObjectType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: GraphQLID }, // Use GraphQLID here for string-like identifiers
  }),
});

const chProfile = {
  changeProfile: {
    type: profileObjectType as GraphQLObjectType,
    args: {
      id: { type: GraphQLID },
      dto: { type: changeProfileObjectType },
    },
    resolve: async (_source: any, args: IChangeProfile, context: Context) => {
      return await context.prisma.profile.update({
        where: {
          id: args.id,
        },
        data: args.dto,
      });
    },
  },
};

export { chProfile, changeProfileObjectType };
