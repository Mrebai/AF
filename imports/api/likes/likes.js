import {Mongo} from 'meteor/mongo'

const Like = new Mongo.Collection('likes');

export default Like;