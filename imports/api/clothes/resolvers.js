import Clothes from './clothes'
import Review from '../reviews/reviews'
import Like from '../likes/likes'
import checkParam from '../checkParam'
if (Meteor.isServer) {
    Clothes._ensureIndex(
        {
        name: "text",
        description: "text",
        productId:'text'
    });
}

let userId;
export default {
    Query:{
        clothes(obj,arg,ctx){
            userId=(ctx.user)? ctx.user._id: '';
            if (!arg.info && !arg._id){
                return (
                    Clothes.find().fetch()
                )
            }
            if(!arg._id){
                return (Clothes.find({$text: {$search: arg.info}}).fetch());
            }

            if(arg._id){
                return (Clothes.find({_id:arg._id}).fetch() )
            }

                // Clothes.findOne({_id:arg._id}).fetch());

        }
    },

    cloth:{
        reviews : (cloth) => {
            return(
                Review.find({prodId:cloth._id}).fetch()
            )
        },
        likes : (cloth) => {
            return(
                Like.find({itemId:cloth._id}).fetch().length
            )
        },
        likesByUser : (cloth) => {
          
            const find = Like.findOne({$and:[  {itemId:cloth._id},{userID:userId}]});

            if(find){

                return(true)
            }

            return(false)

        },

        totalRate : (cloth) => {
            const rev =    Review.find({prodId:cloth._id}).fetch();
            if(rev){
                let total = rev.reduce((sum,item) => {
                    return (sum + item.rate)
                },0);

                return(total/rev.length )
            }
            return(0)
        }
    },

    Mutation:{
        addClothes(obj,{ name, gender, tags, description, video,img,mainImg,imgURL, size, colors, reviews, sold, likes, productId, oldPrice, price, comingSoon, newArrival, availability},ctx){

            if(ctx.userId){
                const cloth = Clothes.insert({
                    name : checkParam(name,null),
                    gender : checkParam(gender,null) ,
                    tags : checkParam(tags,null) ,
                    description : checkParam(description,null),
                    video : checkParam(video,null),
                    img : checkParam(img,null) ,
                    mainImg: checkParam(mainImg,null) ,
                    size : checkParam(size,null) ,
                    colors : checkParam(colors,null) ,
                    reviews : checkParam(reviews,null),
                    sold : checkParam(sold,null),
                    likes : checkParam(likes,null),
                    productId : checkParam(productId,null),
                    oldPrice : checkParam(oldPrice,null),
                    price : checkParam(price,null),
                    comingSoon : checkParam(comingSoon,false),
                    newArrival : checkParam(newArrival,false),
                    availability : checkParam(availability,false),
                });

                return Clothes.findOne((cloth))
            }
            throw new Error ( "Action unauthorized")

        },

        updateClothes(obj,{updateId, name, gender, tags, description, video,img,mainImg,imgURL, size, colors, reviews, sold, likes, productId, oldPrice, price, comingSoon, newArrival, availability},ctx){

            if(ctx.userId) {
                const cloth = Clothes.update({_id: updateId}, {
                    $set: {
                        name: checkParam(name, null),
                        gender: checkParam(gender, null),
                        tags: checkParam(tags, null),
                        description: checkParam(description, null),
                        video: checkParam(video, null),
                        img: checkParam(img, null),
                        mainImg: checkParam(mainImg, null),
                        size: checkParam(size, null),
                        colors: checkParam(colors, null),
                        reviews: checkParam(reviews, null),
                        sold: checkParam(sold, null),
                        likes: checkParam(likes, null),
                        productId: checkParam(productId, null),
                        oldPrice: checkParam(oldPrice, null),
                        price: checkParam(price, null),
                        comingSoon: checkParam(comingSoon, false),
                        newArrival: checkParam(newArrival, false),
                        availability: checkParam(availability, false),

                    }
                });

                return Clothes.findOne((cloth))
            }
            throw new Error ( "Action unauthorized")
        },

        deleteClothes(obj,{_id},ctx) {
            if (ctx.userId) {
                const cloth = Clothes.remove(_id);

                return Clothes.findOne((cloth))
            }
            throw new Error ( "Action unauthorized")
        }

    }
}