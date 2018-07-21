import Cart from '../cart/cart'

export default {

    Query: {
      user(obj,args,ctx){
console.log(ctx.user);

          return ctx.user || {} ;
      },

    },
    User: {

      email: (user) =>  user.emails[0].address ,
      information: (user) => user.information,
        cart : (user) => currentCart  =  (user._id)? Cart.find({userId:user._id}).fetch() : [],
        totalPrice : (user) => { let currentCart =(user._id)? Cart.find({userId:user._id}).fetch():[];
         return   currentCart.reduce(function(sum,cart) {
            return sum + cart.price* cart.number
        },0)}
    }

}
