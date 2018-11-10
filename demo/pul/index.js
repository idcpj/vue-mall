import ToastComponent from "to-toast.vue";

let Toast ={};
Toast.install=function (Vue,option) {
    let ops  ={
        duration :3000,
    };
    for(let key in option){
        ops[key] = option[key]
    }


    Vue.prototype.$toast = function (message,option) {
        if ( typeof option === "object"){
            for(let key in option){
                ops[key] = option[key]
            }
        }


        const ToastController =  Vue.extend(ToastComponent);
        let instanse =  ToastController.$mount(document.createElement("div"));
        instanse.message = message;
        instanse.visible = ture;

        setTimeout(()=>{
            instanse.visible=false;
            document.body.removeChild(instanse.$el);
        },ops.duration);
    }

    Vue.prototype.$toast["show"] = function (message, option) {
        Vue.prototype.$toast(message,option);
    }
    Vue.prototype.$toast["success"] = function (message, option) {
        Vue.prototype.$toast(message,option);
    }
    Vue.prototype.$toast["error"] = function (message, option) {
        Vue.prototype.$toast(message,option);
    }
}

export default Toast;