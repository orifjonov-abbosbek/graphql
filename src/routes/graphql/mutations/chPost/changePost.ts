import { GraphQLObjectType, GraphQLInputObjectType, GraphQLString } from 'graphql';
import postObjectType from '../../queries/posts/posts.js';
import Context from '../../types/context.js';

interface IChangePost {
  id: string;
  dto: {
    title: string;
    content: string;
  };
}

const changePostObjectType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
  }),
});

const changePost = {
  changePost: {
    type: postObjectType as GraphQLObjectType,
    args: {
      id: { type: GraphQLString },
      dto: { type: changePostObjectType },
    },
    resolve: async (_source: any, args: IChangePost, context: Context) => {
      return await context.prisma.post.update({
        where: {
          id: args.id,
        },
        data: args.dto,
      });
    },
  },
};

export default changePost;
