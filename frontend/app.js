let chatHistory = [];

async function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (!message) return;

    // 添加用户消息
    addMessage('user', message);
    input.value = '';

    try {
        // 调用后端API
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        addMessage('bot', data.reply);
    } catch (error) {
        console.error('Error:', error);
        addMessage('bot', '⚠️ 服务暂时不可用，请稍后再试');
    }
}

function addMessage(role, content) {
    const container = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;
    messageDiv.textContent = content;
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}
