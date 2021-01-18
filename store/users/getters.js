export default {
    get(state){
        const users = localStorage.getItem("users")
        let data
        if(state.info.userId){
            // vuex
            data = state.info
        }else{
            // localStorage
            data = JSON.parse(users)
        }
        return data
    }
}