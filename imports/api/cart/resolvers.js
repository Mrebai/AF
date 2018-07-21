import Cart from './cart'

export default {
    Mutation:{
        addCart(obj,args,ctx){
            if(ctx.userId){
                const cartId = Cart.insert({
                    userId: ctx.userId,
                    itemId: args.itemId,
                    name:  args.name,
                    img:   args.img,
                    color: args.color,
                    number: args.number,
                    size: args.size,
                    price:args.price
                });
                return Cart.findOne(cartId);
            }
            throw new Error("Action unauthorized")
        },

        deleteCart(obj,{_id},ctx){
            if(ctx.userId) {
                const cart = Cart.remove(_id);
                return Cart.findOne((cart))
            }
            throw new Error("Action unauthorized")
        },

    },


}