export const initialState = {
  basket: [
    // {
    //   id: "12321341",
    //   title: "Laptop Acessories: Case Cover",
    //   price: 11.96,
    //   rating: 5,
    //   image:
    //     "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/July/amazonbasics_520x520._SY304_CB442725065_.jpg",
    // },
  ],
  user: null,
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user, // if set the user to its state when user logs in
      };
    case "ADD_TO_BASKET":
      //Logic for add item to basket
      return { ...state, basket: [...state.basket, action.item] };

    case "REMOVE_FROM_BASKET":
      // Logic for Removing item from basket

      // we cloned the basket
      let newBasket = [...state.basket];

      // we check to see if product exists
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      if (index >= 0) {
        //item exists in basket, remove it...
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as it is not available`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;
  }
};

export default reducer;
