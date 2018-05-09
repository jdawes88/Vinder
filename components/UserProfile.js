// //Data for Restaurant Page

// getRestaurantById = (id) => {
//   return fetch(`https://y2ydaxeo7k.execute-api.eu-west-2.amazonaws.com/dev/restaurants/${id}`)
//     .then(res => res.json())
//     .then(res => ?)
//     .catch(err => console.log('error:' + err))
// }

// getDishByRestaurantId = (id) => {
//   return fetch(`https://y2ydaxeo7k.execute-api.eu-west-2.amazonaws.com/dev/restaurants/dish/${id}`)
//     .then(res => res.json())
//     .then(res => ?)
//     .catch(err => console.log('error:' + err))
// }

// //Data for Dish Page

// getDishByDishId = (id) => {
//   return fetch(`https://y2ydaxeo7k.execute-api.eu-west-2.amazonaws.com/dev/restaurants/dish/${id}`)
//     .then(res => res.json())
//     .then(res => ?)
//     .catch(err => console.log('error:' + err))
// }

// getCommentsByDishId = (id) => {
//   return fetch(`https://y2ydaxeo7k.execute-api.eu-west-2.amazonaws.com/dev/restaurants/dish/comments/${id}`)
//     .then(res => res.json())
//     .then(res => ?)
//     .catch(err => console.log('error:' + err))
// }

// //POST REQUESTS

// //POST A Comment
// postComment = (body, userid) => {
//   axios
//     .post(
//       `https://y2ydaxeo7k.execute-api.eu-west-2.amazonaws.com/dev/comment`,
//       {
//         comment_body: body,
//         user_id: userid
//       }
//     )

//     .catch(error => console.log(error));
// };

// addDish = () => {
//   axios
//     .post(
//       `https://y2ydaxeo7k.execute-api.eu-west-2.amazonaws.com/dev/dish`,
//     {
//       dish_title: this.state.dish_title,
//   dish_description: this.state.dish_description,
//   dish_price: this.state.price
//     }
//   )
// }

// postComment = (body, userid) => {
//   axios
//     .post(
//       `https://y2ydaxeo7k.execute-api.eu-west-2.amazonaws.com/dev/dish`,
//       {
//       name: input.name,
//       price: input.prices,
//       resId = restaurantId,
//       description: input.description,
//       image_url: this.state.img

//       }
//     )

//     .catch(error => console.log(error));
// };
