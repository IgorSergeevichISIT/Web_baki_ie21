import {accessToken, version} from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
        this.commonInfo = `access_token=${accessToken}&v=${version}`
    }

    getUserInfo(userId) {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig&${this.commonInfo}`
    }
    getGroupMembers(groupId) {
        return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig&${this.commonInfo}`
    }
    getConversationMembers(peer_id){
        return `${this.url}/messages.getConversationMembers?peer_id=${peer_id}&fields=photo_400_orig&${this.commonInfo}`
    }
    getConversationMembers2(){
        return `http://127.0.0.1:3000/get-members`
    }
    getConversations(){
        return `https://api.vk.com/method/messages.getConversations?access_token=${accessToken}&count=${count}&v=5.131`
    }
    GetUpdatePeer(){
        return `http://127.0.0.1:3000/update-peer`
    }
    DellUser(id_user){
        return `http://127.0.0.1:3000/delete-user/${id_user}`
    }
}

export const urls = new Urls()