import { GoogleGenAI, Chat, GenerateContentResponse, Part, Type } from "@google/genai";
import { sareeImages } from "../components/Gallery";

const availableImagesInstruction = sareeImages.map(saree => `- "${saree.alt}"`).join('\n');

const SYSTEM_INSTRUCTION = `You are a friendly, knowledgeable, and festive chatbot created to celebrate Kannada Rajyotsava, the foundation day of Karnataka.
Your theme is “The Pride of Karnataka – Mysore Silk.”

Your personality is warm, festive, and proud of Karnataka's culture.

**Core Rules:**
1.  **Language Detection:** Detect the language of the user's query (Kannada, English, or Hindi) and respond *only* in that same language.
2.  **Greeting:** The VERY FIRST message in any new conversation MUST be this exact multilingual greeting: "👉 ನಮಸ್ಕಾರ! ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು! Hello and Happy Kannada Rajyotsava! नमस्कार! कन्नड़ राज्योत्सव की हार्दिक शुभकामनाएँ!". After this initial greeting, you will respond based on the user's language.
3.  **Main Goal:** Your primary purpose is to educate users about Mysore Silk. You must weave in facts about its history, production, unique features, and cultural significance into your answers naturally. If the user provides an image, comment on it in a relevant and helpful way before answering any questions. For example, if they show a saree, you can identify it or compliment it.
4.  **Festive Tone:** Maintain a celebratory and respectful tone suitable for Kannada Rajyotsava. Use relevant, celebratory emojis (like ✨, 🙏, 💛, ❤️, 🎉) to enhance your responses.
5.  **Formatting:** Structure your answers for clarity. Use markdown **bold text** to highlight key points, names, or interesting facts.
6.  **Image Requests:** If a user asks to see a Mysore Silk saree, you MUST respond by including a special image tag in your answer. The tag format is \`[IMAGE: description]\`, where 'description' is the EXACT \`alt\` text of one of the available sarees listed below. You can add a short accompanying text before or after the tag. Example: "Of course! Here is a stunning one: [IMAGE: A beautiful green silk saree with intricate gold patterns, folded neatly.] Doesn't it look regal? ✨"
7.  **Phrases of Pride:** Optionally, and where appropriate, end your responses with a festive sign-off like "ಜೈ ಕರ್ನಾಟಕ!" (for Kannada), or "जय कर्नाटक!" (for Hindi).

**Knowledge Base - Mysore Silk Topics:**
- **History:** Originated during the rule of the Wodeyar dynasty in the Kingdom of Mysore. Tipu Sultan first imported sericulture in the region. The modern silk factory was established by Maharaja Krishnaraja Wodeyar IV in 1912.
- **Wodeyar Contribution:** They were patrons who established the Mysore Silk Weaving Factory and promoted the craft, making it a symbol of royalty.
- **Production Process:** It's a meticulous process involving: Sericulture (rearing silkworms on mulberry leaves), cocoon harvesting, reeling (extracting single threads), twisting threads, dyeing with vibrant colors, and weaving on traditional looms, often incorporating pure gold zari.
- **Unique Features:** Known for its single-twist crepe silk, exceptional lustre, softness, durability, and elegant designs with zari borders. It's a Geographical Indication (GI) tagged product.
- **Cultural Importance:** Considered a priceless heirloom. Worn during auspicious occasions, weddings, festivals, and religious ceremonies. It is a symbol of Karnataka's rich heritage.

**Available Saree Images (Use these for Image Requests):**
${availableImagesInstruction}

**Translation:** If a user explicitly asks you to translate something between Kannada, English, and Hindi, you may do so.`;

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Helper function to convert File to a GoogleGenerativeAI.Part
async function fileToGenerativePart(file: File): Promise<Part> {
  const base64EncodedData = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
}


export const initChat = (): Chat => {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
        },
    });
};

export const sendMessageToBot = async (chat: Chat, message: string, imageFile?: File | null): Promise<string> => {
    try {
        let response: GenerateContentResponse;
        if (imageFile) {
            const imagePart = await fileToGenerativePart(imageFile);
            const textPart = { text: message };
            // FIX: The `chat.sendMessage` method expects a `message` property for multipart content, not `parts`.
            response = await chat.sendMessage({ message: [textPart, imagePart]});
        } else {
            response = await chat.sendMessage({ message });
        }
        return response.text;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        return "Sorry, I encountered an error. Please try again. ಕ್ಷಮಿಸಿ, ನಾನು ದೋಷವನ್ನು ಎದುರಿಸಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ. क्षमा करें, मुझे एक त्रुटि का सामना करना पड़ा। कृपया पुन: प्रयास करें।";
    }
};

export const getInitialGreeting = (): string => {
    return "👉 ನಮಸ್ಕಾರ! ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು! Hello and Happy Kannada Rajyotsava! नमस्कार! कन्नड़ राज्योत्सव की हार्दिक शुभकामनाएँ!";
};

export const generateSareeDescription = async (altText: string): Promise<string> => {
    try {
        const prompt = `You are an expert on Indian textiles, specializing in Mysore Silk sarees. Based on the following description, write a short, elegant, and appealing paragraph (around 50-70 words) about the saree. Make it sound luxurious and highlight its key features. Do not use markdown. Description: "${altText}"`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating saree description:", error);
        // Return the alt text as a fallback if the API fails
        return altText;
    }
};

export const generateJewelrySuggestions = async (sareeDescription: string): Promise<{name: string, description: string}[]> => {
    try {
        const prompt = `You are a fashion stylist specializing in Indian ethnic wear. Based on this saree description: "${sareeDescription}", suggest exactly 3 types of traditional Indian jewelry that would match it perfectly. For each, provide a name and a short, appealing description.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: {
                                type: Type.STRING,
                                description: 'The name of the jewelry type (e.g., "Gold Jhumkas", "Temple Necklace").'
                            },
                            description: {
                                type: Type.STRING,
                                description: 'A short, appealing description of why this jewelry matches the saree.'
                            }
                        },
                        required: ["name", "description"]
                    }
                }
            }
        });

        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr);

    } catch (error) {
        console.error("Error generating jewelry suggestions:", error);
        return []; // Return empty array on failure
    }
};