window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();
recognition.interimResults = false;
let listening = false;

let text = document.getElementById('InputField');
let send_arrow = document.getElementById('textArrow');
let text_area =  document.getElementById('textArea');
let input;

send_arrow.style.opacity = 0.5;
send_arrow.onclick = 'null';
send_arrow.style.cursor = 'default';

recognition.addEventListener("result", (e) => {
    const voice_input = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");
    if (e.results[0].isFinal) 
    {
        if(text.value!="")
        {
            text.value += " ";
            text.value += voice_input;
        }
        else
        {
            text.value += voice_input;
        }
        active(text);
    } 
    else 
    {
        if(text.value!="")
        {
            text.value += " ";
            text.value += voice_input;
        }
        else
        {
            text.value += voice_input;
        }
        active(text);
    }
});

recognition.addEventListener("end", () => {
    console.log("DevBot stopped listening.");
    listening = false;
  });
  
  document.getElementById("voiceArrow").addEventListener("click", () => {
    if (!listening) 
    {
        console.log("DevBot is listening.");
        // text.value += voice_input;
        recognition.start();
        listening = true;
    } 
    else 
    {
        console.log("DevBot is already listening.");
    }
  });

function check(event) 
{
    if(event.key == "Enter") 
    {
        event.preventDefault();
        send();
    }   
}

function active(msg)
{
    if(msg.value.trim() != "")
    {
        send_arrow.style.opacity = 1;
        send_arrow.style.cursor = 'pointer';
        send_arrow.addEventListener("click",send);
    }
    else
    {
        send_arrow.style.opacity = 0.5;
        send_arrow.onclick = 'null';
        send_arrow.style.cursor = 'default';
    } 
}

function send()
{
    if(text.value.length>0)
    {
        createEl('user');
        text.value = "";
        active(text);
        text_area.scrollTop = text_area.scrollHeight;

        fetch("/receive-data", {
        method: "POST",
        body: JSON.stringify(text.value),
        headers: {
            "Content-Type": "application/json"
        },
        })
        .then(response => response.text())
        .then(data => {
            createEl('bot');
            text_area.scrollTop = text_area.scrollHeight;   
        })
        .catch(error => console.error(error));
    }    
}

function createEl(inp)
{
    if(inp === 'user')
    {
        var div1 = document.createElement('div');
        div1.classList.add('IntervieweeDiv','offset-2','col-10');

        var div2 = document.createElement('div');
        div2.className += 'IntervieweeIcon';

        var i1 = document.createElement('i');
        i1.classList.add('bi','bi-person');
        div2.appendChild(i1);

        var div3 = document.createElement('div');
        div3.classList.add('IntervieweeChat','col-11');

        var p1 = document.createElement('p');
        p1.className += 'fs-6';
        p1.innerText = text.value;
        div3.appendChild(p1);

        div1.appendChild(div3);
        div1.appendChild(div2);
        text_area.appendChild(div1);  
    }
    else if(inp === 'bot')
    {
        var div1 = document.createElement('div');
        div1.classList.add('InterviewBotDiv','col-10');

        var div2 = document.createElement('div');
        div2.className += 'InterviewBotIcon';

        var i1 = document.createElement('i');
        i1.classList.add('bi','bi-robot');
        div2.appendChild(i1);

        var div3 = document.createElement('div');
        div3.classList.add('InterviewBotChat','col-11');

        var p1 = document.createElement('p');
        p1.className += 'fs-6';
        p1.innerText = text.value;
        div3.appendChild(p1);

        div1.appendChild(div2);
        div1.appendChild(div3);
        text_area.appendChild(div1);        
    }
}