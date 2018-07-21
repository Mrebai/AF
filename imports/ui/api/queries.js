import gql from 'graphql-tag'

export const userQuery = gql`
    query user{
        user{
            _id
            cart{
                _id
                name
                itemId
                img
                color
                number
                size
                price
            }
            totalPrice
        }
    }
`;



export const clothesQuery = gql`
    query clothes($info:String $id:String){
        clothes(info:$info _id:$id){
            _id
            name
            gender
            tags
            description
            video
            img
            mainImg
            size
            colors
            likesByUser
            likes
            reviews{
                _id   
                content
                userEmail
                userID
                rate
                date
                }
            sold
            productId
            oldPrice
            price
            comingSoon
            newArrival
            availability
            totalRate
        }
    }
`;

