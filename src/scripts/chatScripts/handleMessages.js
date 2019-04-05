// this component will create the handlders that will be used for the messages
import chatApi from "./chatApiManager";

// this is a factory functions that will create the objs that will create the messages and
// and the friendships respectively to be posted in the db
const createNewMsg = (userId, msg) => {
   return {
    userId: userId,
    message: msg
   }
}

const createNewFriend = (userId, friendId) => {
    return {
     currentUserId: userId,
     userId: friendId
    }
 }


const chatHandlers = {
    handlerChatSendButton: () => {
        // this is a function that will handle the save button, it will call the factory function above
        // called createNewMsg and return a newMsg then the handler will pass that to the chatApi post fetch call
        let userId = Number(sessionStorage.getItem("userID"));
        console.log(userId)
        console.log("button pressed")
        console.log(document.querySelector("#user-message").value);
        const userMessage = document.querySelector("#user-message").value;

        let newMsg = createNewMsg(userId, userMessage) //calling the factory function
        chatApi.postCreateMessage(newMsg)
    },
    handlerChatAddFriend: () => {
        // this function will handle the event of adding a friend to the db
        let userId = Number(sessionStorage.getItem("userID"));
        const friendId = Number(event.target.parentNode.id.split("--")[1]);
        console.log("add friend button")
        console.log("friend's id is", friendId)
        console.log("the current user ",userId)

        let newFriend = createNewFriend(userId, friendId); //calling the factory function
        chatApi.postCreateFriendship(newFriend)
    }
}

export default chatHandlers