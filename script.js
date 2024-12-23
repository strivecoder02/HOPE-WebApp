const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

const info = document.querySelector('.information');
const depinfo = document.querySelector('.dep-information');
const detailsinfo = document.querySelector('.details');
const infosymp = document.querySelector('.symptoms');
const infodiagno = document.querySelector('.diagnosis');

// ***************************************

const helpLink = document.getElementById('helpLink');
const popupBox = document.getElementById('popupBox');

// Show the popup when the help link is clicked
helpLink.addEventListener('click', function() {
    popupBox.style.display = 'block';
});

// Function to close the popup
function closePopup() {
    popupBox.style.display = 'none';
}

// *********************************

// 

let userMessage;
const API_KEY = "Paste API key over here for the chatbot to work";  //<-----API_KEY INSERTION



const chatInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) =>{
    //create a chat <li> element with passed message and class name
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ?`<p></p>` : `<span class="material-symbols-outlined">🤖</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}]
        })
    }
    //send POST request to API, get response
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
        // console.log(data);
    }).catch((error) => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
        // console.log(error);
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage)return;
    chatInput.value = "";
    // chatInput.style.height = `${inputInitHeight}px`;

//appends the user's message to the chatbox
    //
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        //display thinking message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming")
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    //If enter key is pressed without shift key and the window
    //width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800){
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

// _______________code for registration and login page________________

// registerLink.addEventListener('click', () => document.wrapper.classList.add("active"))



registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () =>{
    wrapper.classList.remove('active-popup');
});

infosymp.addEventListener('click', () => {
    information.classList.add('active')
}) ;

infodiagno.addEventListener('click', () => {
    information.classList.remove('active')
});

// infosymp.addEventListener('click', () => {
//     information.classList.remove('active')
// });

infodiagno.addEventListener('click', () => {
    information.classList.add('active')
});


