export async function sendMessage(message: string, language: string = 'en'): Promise<string> {
  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, language }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    if (data.success) {
      return data.answer;
    } else {
      return data.answer || "Sorry, I couldn't process your request right now.";
    }
  } catch (error) {
    console.error("chatservice error:", error);
    throw error;
  }
}
