import {Mongo} from 'meteor/mongo'

const Review = new Mongo.Collection("reviews");

export default Review;