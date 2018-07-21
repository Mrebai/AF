import { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";
import merge from 'lodash/merge'

import UserSchema from '../../api/users/User.graphql';
import UserResolvers from '../../api/users/resolvers';
import clothesSchema from '../../api/clothes/Clothes.graphql';
import clothesResolvers from '../../api/clothes/resolvers';
import reviewSchema from '../../api/reviews/Reviews.graphql';
import reviewResolvers from '../../api/reviews/resolvers';
import cartSchema from '../../api/cart/cart.graphql';
import cartResolvers from '../../api/cart/resolvers';
import likeSchema from '../../api/likes/Likes.graphql';
import likeResolvers from '../../api/likes/resolvers';
//hihihiiivvsqfcfsssdsssfffhhdsszssssssssssss
// hiiiicdxcsdcscvcxndssjysgsgfsfssssdssss ffsssdsssssss


const typeDefs = [UserSchema,clothesSchema,reviewSchema,cartSchema,likeSchema];



const resolvers = merge(UserResolvers,clothesResolvers,reviewResolvers,cartResolvers,likeResolvers);

Meteor.users.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc) {
        return true;
    }
});
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

createApolloServer({ schema });
