document.addEventListener("DOMContentLoaded", () => {

    const chat = document.getElementById("chat");
    const input = document.getElementById("input");
    const sendBtn = document.getElementById("sendBtn");

    const lightBtn = document.getElementById("lightBtn");
    const darkBtn = document.getElementById("darkBtn");
    const colors = document.querySelectorAll(".color");

    // 🌗 THEME TOGGLE
    lightBtn.onclick = () => {
        document.body.classList.add("light");
        lightBtn.classList.add("active");
        darkBtn.classList.remove("active");
    };

    darkBtn.onclick = () => {
        document.body.classList.remove("light");
        darkBtn.classList.add("active");
        lightBtn.classList.remove("active");
    };

    // 🎨 ACCENT COLOR
    colors.forEach(color => {
        color.onclick = () => {
            document.documentElement.style.setProperty(
                "--accent",
                color.getAttribute("data-color")
            );
        };
    });

    // 💬 CHAT
    const questions = [
    "Write your abstract (or describe your work briefly)",
    "What specific problem are you addressing?",
    "Which domain does this belong to? (e.g., healthcare, finance)",
    "What method/model are you using? (e.g., CNN, Transformer)",
    "What type of data are you working with?",
    "What is your main contribution or novelty?"
];

    let step = 0;
    let answers = {};

    function addMessage(text, type) {
        const msg = document.createElement("div");
        msg.className = "msg " + type;
        msg.innerText = text;
        chat.appendChild(msg);
        chat.scrollTop = chat.scrollHeight;
    }

    // ✅ Start only once
    addMessage(questions[0], "bot");

    // Enter support
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendBtn.click();
    });

    // 🚀 SEND
    sendBtn.onclick = async () => {

        const value = input.value.trim();
        if (!value) return;

        addMessage(value, "user");
        input.value = "";

        const keys = ["abstract", "problem", "domain", "method", "data", "contribution"];
        answers[keys[step]] = value;

        step++;

        if (step < questions.length) {
            addMessage(questions[step], "bot");
            return;
        }

        // Loading
        const loading = document.createElement("div");
        loading.className = "msg bot";
        loading.innerText = "Generating titles ⏳";
        chat.appendChild(loading);

        const structuredInput = `
Abstract: ${answers.abstract}

Problem: ${answers.problem}
Domain: ${answers.domain}
Method: ${answers.method}
Data: ${answers.data}
Contribution: ${answers.contribution}
`;

        try {
            const res = await fetch("http://127.0.0.1:8000/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ abstract: structuredInput })
            });

            const result = await res.json();

            chat.removeChild(loading);

            if (!result.titles || result.titles.length === 0) {
                addMessage("No titles generated ❌", "bot");
                return;
            }

            result.titles.forEach((title, index) => {

                const card = document.createElement("div");
                card.className = "msg bot";

                if (index === 0) {
                    card.style.background = "linear-gradient(135deg, #6366f1, #3b82f6)";
                }

                card.style.display = "flex";
                card.style.justifyContent = "space-between";
                card.style.alignItems = "center";
                card.style.padding = "14px";
                card.style.borderRadius = "12px";

                const textWrapper = document.createElement("div");

                if (index === 0) {
                    const badge = document.createElement("span");
                    badge.innerText = "⭐ Best ";
                    badge.style.fontSize = "12px";
                    textWrapper.appendChild(badge);
                }

                const text = document.createElement("span");
                text.innerText = title;

                textWrapper.appendChild(text);

                const btn = document.createElement("button");
                btn.innerText = "Copy";

                btn.onclick = () => {
                    navigator.clipboard.writeText(title);
                    btn.innerText = "✓";
                    setTimeout(() => btn.innerText = "Copy", 1000);
                };

                card.appendChild(textWrapper);
                card.appendChild(btn);
                chat.appendChild(card);
            });

        } catch (error) {
            console.error(error);
            chat.removeChild(loading);
            addMessage("Error connecting to server ❌", "bot");
        }
    };

});