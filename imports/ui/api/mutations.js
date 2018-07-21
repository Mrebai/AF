import gql from 'graphql-tag'

// create item mutation
export const AddItem = gql`
    mutation addClothes(
    $name: String!
    $gender: String!
    $tags: [String]
    $description: String!
    $video:String
    $img:[String]
    $mainImg:String
    $size:[String]
    $colors:[String]
    $reviews:String
    $sold: Int
    $likes: Int
    $productId: String!
    $oldPrice: Float
    $price: Float!
    $comingSoon: Boolean
    $newArrival: Boolean
    $availability:Boolean!
    ){
        addClothes(
            name: $name
            gender: $gender
            tags: $tags
            description: $description
            video:$video
            img:$img
            mainImg:$mainImg
            size:$size
            colors:$colors
            reviews:$reviews
            sold: $sold
            likes: $likes
            productId: $productId
            oldPrice: $oldPrice
            price: $price
            comingSoon: $comingSoon
            newArrival: $newArrival
            availability:$availability
        ){
            _id
        }
    }
`;


// update item mutation

export const UpdateItem = gql`
    mutation updateClothes(
    $updateId:String!
    $name: String!
    $gender: String!
    $tags: [String]
    $description: String!
    $video:String
    $img:[String]
    $mainImg:String
    $size:[String]
    $colors:[String]
    $reviews:String
    $sold: Int
    $likes: Int
    $productId: String!
    $oldPrice: Float
    $price: Float!
    $comingSoon: Boolean
    $newArrival: Boolean
    $availability:Boolean!
    ){
        updateClothes(
            updateId:$updateId
            name: $name
            gender: $gender
            tags: $tags
            description: $description
            video:$video
            img:$img
            mainImg:$mainImg
            size:$size
            colors:$colors
            reviews:$reviews
            sold: $sold
            likes: $likes
            productId: $productId
            oldPrice: $oldPrice
            price: $price
            comingSoon: $comingSoon
            newArrival: $newArrival
            availability:$availability
        ){
            _id
        }
    }
`;

// delete mustation
export const DeleteItem = gql`
    mutation deleteClothes($id: String!){
        deleteClothes(_id: $id){
            _id
        }
    }
`;


// delete mustation
export const setReview = gql`
    mutation setReview(
    $prodId: String!
    $review: String!
    $rate  : Int!
    ){
        setReview(
            prodId: $prodId
            review:$review
            rate:$rate
        ){
            _id
        }
    }
`;

// add to cart Mutation

export const addCart = gql`
    mutation addCart(
    $itemId: String!
    $name: String!
    $img: String!
    $color: String!
    $number:Int!
    $size:String!
    $price:Float
    ){
        addCart(
            itemId: $itemId
            name: $name
            img: $img
            color: $color
            number:$number
            size:$size
            price:$price
        ){
            _id
        }
    }
`;

// delete from cart
export const deleteCart = gql`
    mutation deleteCart($id: String!){
        deleteCart(_id: $id){
            _id
        }
    }
`;


//add like
export const addlike = gql`
    mutation addlike(
    $itemId: String
    ){
        addlike(
            itemId: $itemId
        ){
            _id
        }
    }
`;
