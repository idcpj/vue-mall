import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        nickName:"",
        cartCount:0,
    },
    mutations:{
        updateName(state,nickName){
            state.nickName = nickName
        },
        updateCartCount(state,count){
            state.cartCount += count;
        }
    }
})
