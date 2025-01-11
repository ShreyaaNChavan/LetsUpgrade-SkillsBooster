const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your .env file contains this key
});

const openai = new OpenAIApi(configuration);

exports.getChatResponse = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required." });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // Use the appropriate model
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error in chatbot:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: "Error communicating with OpenAI" });
  }
};
