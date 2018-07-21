import Review from './reviews'



export default {
    Mutation:{
        setReview(obj,{prodId,review,rate},ctx){

           const ReviewId = Review.insert({
               content:review,
               rate,
               userEmail:ctx.user.emails[0].address,
               userID:ctx.user._id,
               prodId,
               date:  Date.now()
           });
            return Review.findOne(ReviewId);
        }
    }


}