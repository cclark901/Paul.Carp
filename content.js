const webhookURL = "https://hook.us2.make.com/hmd2lm3c4nt3u349nx9ns3ruuf7cg2e1"; 

function addLogButton() {
  if (document.getElementById("gpt-log-btn")) return;

  const button = document.createElement("button");
  button.innerText = "📥 Log to Coaching Sheet";
  button.id = "gpt-log-btn";
  button.style = `
    position: fixed;
    top: 100px;
    right: 30px;
    padding: 12px 16px;
    background-color: #10a37f;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    z-index: 9999;
    cursor: pointer;
  `;

  button.onclick = async () => {
    const advisorName = prompt("Advisor name (e.g. David McAdams):");
    const firm = prompt("Firm (McAdams Group or Wood Financial):");
    const topic = prompt("Training topic:");

    const transcriptElements = document.querySelectorAll('[data-message-author-role]');
    const transcript = Array.from(transcriptElements)
      .map(el => el.innerText)
      .join('\n\n');

    const summary = transcript.split('\n').slice(0, 10).join(' '); // crude summary

    const payload = {
      advisor_name: advisorName,
      firm,
      topic,
      summary,
      transcript
    };

    await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    alert("✅ Conversation sent to Make.com log.");
  };

  document.body.appendChild(button);
}

window.addEventListener("load", () => {
  setTimeout(addLogButton, 2000);
});
