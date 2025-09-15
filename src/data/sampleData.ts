import type { Answer } from "../types/chat";

export const sampleAnswers: Answer[] = [
    {
        id: "206f7ba5-e1c5-4448-861f-0df80ca87b26",
        answerText: "A goodbye to a teacher who changed schools.",
        voteCounts: [],
    },
    {
        id: "355f11c9-6537-4b99-ab7b-8011a7e21181",
        answerText: "Saying goodbye to a pet I never got to see again.",
        voteCounts: [
            { emoticon: "❤️", count: 9 },
            { emoticon: "🌻", count: 21 },
            { emoticon: "👍", count: 1 },
        ],
    },
    {
        id: "3f3e2b1c-5dcb-4f0e-8f7a-5c3e2b1c5dcb",
        answerText: "Not telling my grandfather how much I appreciated him before he passed away. We were very close when I was growing up - he taught me how to fish, how to fix things around the house, and would tell me stories about his life growing up during difficult times. As I got older and busier with college and starting my career, I visited less and less. When he got sick, I kept thinking there would be more time to have those meaningful conversations, to thank him for everything he taught me. But his condition deteriorated quickly, and by the time I made it home, he wasn't conscious anymore. I sat with him and talked, but I'll never know if he heard me. That was five years ago and it still haunts me that I prioritized everything else over those last potential conversations.",
        voteCounts: [
            { emoticon: "🎨", count: 15 },
        ],
    },
];
