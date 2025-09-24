// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");

// // Get the API key from environment variables
// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "application/json",
// };

// export const GenerateCourseLayout = model.startChat({
//   generationConfig,
//   // Safety settings are optional but recommended.
//   // See https://ai.google.dev/gemini-api/docs/safety-settings
//   history: [
//     {
//       role: "user",
//       parts: [
//         {
//           text: "Generate a course tutorial on the following details with field as Course Name, Description, Along with Chapter Name, about, Duration:",
//         },
//       ],
//     },
//     {
//       role: "model",
//       parts: [
//         {
//           text: "'''json\n{\n \"course\": {\n  \"name\": \"Introduction to python Programming\"\n }\n}'''",
//         },
//       ],
//     },
//   ],
// });

//   const result = await GenerateCourseLayout.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

// Get the API key from environment variables
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateCourseLayout_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `You are a course content generator. 
Return the output in strict JSON format inside a '''json fenced block.

Fields to include:
- Course Name
- Description
- Category
- Topic
- Level
- Duration
- NoOf Chapters
- Chapters (array with Chapter Name, About, Duration)`,
        },
      ],
    },
  ],
});

export const GenerateChapterContent_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Explain the concept in Detail on Topic: python Basic, Chapter: Introduction to python ,in JSON Format with list of array with field as title,explanation on given chapter in detail, Code Example(Code field in <precode> format) if applicable

        Fields to include:
        - title
        - explanation
        - code_example`,
        },
      ],
    },
  ],
});



//   const result = await GenerateCourseLayout.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());

