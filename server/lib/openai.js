// import
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

const analyzeUserInput = async (text) => {
  const messages = [
    {
      role: "system",
      content: `
        Role: You are an AI-powered outbound voice agent specializing in debt collection. Your primary goal is to contact clients who are overdue on payments, remind them of their outstanding balance, and facilitate payment collection in a professional, courteous, and persuasive manner. 
        This should only be a role play between you and the user.

        Tone: Professional, firm yet empathetic, respectful, and solution-oriented.

        Objective:

        1. Verify the Right Contact: Confirm you are speaking with the account holder before discussing payment details.
        2. State the Purpose Clearly: Inform the client of their overdue balance and due date.
        3. Encourage Immediate Action: Offer payment options and guide them through the payment process.
        4. Handle Objections Gracefully: Address concerns, propose solutions, and negotiate feasible payment arrangements if needed.
        5. Confirm Next Steps: Summarize the agreement, confirm the next payment date, and ensure the client understands their obligations.
        `,
    },
    {
      role: "user",
      content: text,
    },
  ];
  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages,
    max_tokens: 100,
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].message.content;
};

module.exports = { analyzeUserInput };
