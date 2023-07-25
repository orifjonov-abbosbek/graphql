import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLString,
} from 'graphql';
import { userObjectType } from '../../queries/users/users.js';
import Context from '../../types/context.js';

interface IChangeUser {
  id: string;
  dto: {
    name: string;
    balance: number;
  };
}

const changeUserObjectType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  }),
});

const chUser = {
  changeUser: {
    type: userObjectType as GraphQLObjectType,
    args: {
      id: { type: GraphQLString },
      dto: { type: changeUserObjectType },
    },
    resolve: async (_source: any, args: IChangeUser, context: Context) => {
      return await context.prisma.user.update({
        where: {
          id: args.id,
        },
        data: args.dto,
      });
    },
  },
};

export { chUser, changeUserObjectType };
