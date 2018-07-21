import Like from './likes'
import Cart from "../cart/cart";

export default {
    Mutation:{
        addlike(obj,{itemId},ctx){
            const find = Like.findOne({$and:[  {itemId:itemId},{userID:ctx.user._id}]});

            if(!find){
                const   likeId= Like.insert({
                    itemId:itemId,
                    userID:ctx.user._id,
                });
                return(Like.findOne(likeId))
            }
            const like = Like.remove(find);
            return Like.findOne((like));


        }

    }
}
