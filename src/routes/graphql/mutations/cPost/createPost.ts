import { GraphQLObjectType, GraphQLInputObjectType, GraphQLString } from 'graphql';
import postObjectType from '../../queries/posts/posts.js';
import Context from '../../types/context.js';

interface ICreatePost {
  dto: {
    title: string;
    content: string;
    authorId: string;
  };
}

const cPostObjectType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => ({
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    authorId: {
      type: GraphQLString,
    },
  }),
});

const cPost = {
  createPost: {
    type: postObjectType as GraphQLObjectType,
    args: {
      dto: {
        type: cPostObjectType,
      },
    },
    resolve: async (_source: any, args: ICreatePost, context: Context) => {
      return await context.prisma.post.create({
        data: args.dto,
      });
    },
  },
};

export { cPost, cPostObjectType };
