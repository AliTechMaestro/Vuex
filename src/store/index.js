import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
      products: [
        {
          id: 'p1',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Books_HD_%288314929977%29.jpg/640px-Books_HD_%288314929977%29.jpg',
          title: 'Book Collection',
          description:
            'A collection of must-read books. All-time classics included!',
          price: 99.99,
        },
        {
          id: 'p2',
          image:
            'https://plus.unsplash.com/premium_photo-1669047983409-5879cfb7831a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          title: 'Mountain Tent',
          description: 'A tent for the ambitious outdoor tourist.',
          price: 129.99,
        },
        {
          id: 'p3',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/640px-Good_Food_Display_-_NCI_Visuals_Online.jpg',
          title: 'Food Box',
          description:
            'May be partially expired when it arrives but at least it is cheap!',
          price: 6.99,
        },
      ],
      cart: { items: [], total: 0, qty: 0 },
    };
  },
  mutations: {
    addProductToCart(state, productData) {
      console.log('inside addProductToCart Mutation');
      console.log({ productData });
      const productInCartIndex = state.cart.items.findIndex(
        (ci) => ci.productId === productData.id
      );

      if (productInCartIndex >= 0) {
        state.cart.items[productInCartIndex].qty++;
      } else {
        const newItem = {
          productId: productData.id,
          title: productData.title,
          image: productData.image,
          price: productData.price,
          qty: 1,
        };
        state.cart.items.push(newItem);
      }
      state.cart.qty++;
      state.cart.total += productData.price;
      console.log({ cart: state.cart });
    },
    removeProductFromCart(state, prodId) {
      const productInCartIndex = state.cart.items.findIndex(
        (cartItem) => cartItem.productId === prodId
      );
      const prodData = state.cart.items[productInCartIndex];
      state.cart.items.splice(productInCartIndex, 1);
      state.cart.qty -= prodData.qty;
      state.cart.total -= prodData.price * prodData.qty;
    },
    setAuth(state, payload) {
      console.log('inside setAuth');
      state.isLoggedIn = payload;
      console.log(state.isLoggedIn);
    },
  },
  actions: {
    addProduct(context, payload) {
      context.commit('addProductToCart', payload);
    },
    removeProduct(context, payload) {
      context.commit('removeProductFromCart', payload);
    },
    login(context) {
      context.commit('setAuth', true);
    },
    logout(context) {
      context.commit('setAuth', false);
    },
  },

  getters: {
    products(state) {
      return state.products;
    },

    cart(state) {
      return state.cart;
    },

    isAuth(state) {
      return state.isLoggedIn;
    },
  },
});

export default store;
