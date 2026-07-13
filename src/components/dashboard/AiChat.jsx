import React, { useState } from "react";

const AiChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    // BIG PRODUCT DATABASE (SIMULATION)
    const products = [
        { name: "iPhone 17", category: "Mobile", price: 120000 },
        { name: "Gaming Laptop", category: "Laptop", price: 180000 },
        { name: "AirPods Pro", category: "Accessories", price: 30000 },
        { name: "Samsung S24", category: "Mobile", price: 110000 },
        { name: "MacBook Pro", category: "Laptop", price: 250000 },
        { name: "Smart Watch", category: "Accessories", price: 25000 },
    ];

    // AI ENGINE (PROMISE BASED)
    const getAiResponse = (msg) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let response = "";
                let suggestions = [];

                // INTENT DETECTION (IF-ELSE ENGINE)
                if (msg.includes("phone")) {
                    suggestions = products.filter(
                        (p) => p.category === "Mobile"
                    );
                    response = "Here are the best mobile phones:";
                } else if (msg.includes("laptop")) {
                    suggestions = products.filter(
                        (p) => p.category === "Laptop"
                    );
                    response = "Top laptops for you:";
                } else if (msg.includes("cheap")) {
                    suggestions = products.filter(
                        (p) => p.price < 50000
                    );
                    response = "Budget-friendly products:";
                } else {
                    suggestions = products.slice(0, 3);
                    response = "Recommended products for you:";
                }

                resolve({ response, suggestions });
            }, 1200);
        });
    };

    const sendMessage = async () => {
        if (input.trim() === "") return;

        setLoading(true);

        const userMsg = {
            id: Date.now(),
            type: "user",
            text: input,
        };

        setMessages((prev) => [...prev, userMsg]);

        const ai = await getAiResponse(input);

        const aiMsg = {
            id: Date.now() + 1,
            type: "ai",
            text: ai.response,
            suggestions: ai.suggestions,
        };

        setMessages((prev) => [...prev, aiMsg]);

        setInput("");
        setLoading(false);
    };

    return (
        <div className="p-4 max-w-xl mx-auto">

            <h2 className="text-xl font-bold mb-2">
                AI Shopping Assistant
            </h2>

            {/* CHAT BOX */}
            <div className="border h-96 overflow-y-auto p-3 bg-gray-50">

                {messages.map((msg) => (
                    <div key={msg.id} className="mb-3">

                        {/* USER MESSAGE */}
                        {msg.type === "user" && (
                            <div className="text-right">
                                <span className="bg-blue-500 text-white px-2 py-1 rounded">
                                    {msg.text}
                                </span>
                            </div>
                        )}

                        {/* AI MESSAGE */}
                        {msg.type === "ai" && (
                            <div className="text-left">
                                <p className="font-semibold">
                                    {msg.text}
                                </p>

                                {/* PRODUCT SUGGESTIONS */}
                                <div className="mt-2 space-y-1">
                                    {msg.suggestions &&
                                        msg.suggestions.map((p, i) => (
                                            <div
                                                key={i}
                                                className="border p-2 bg-white rounded"
                                            >
                                                <p className="font-bold">
                                                    {p.name}
                                                </p>
                                                <p className="text-sm">
                                                    ৳ {p.price}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}

                    </div>
                ))}

                {loading && (
                    <p className="text-gray-500">
                        AI is thinking...
                    </p>
                )}

            </div>

            {/* INPUT */}
            <div className="flex gap-2 mt-3">

                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border flex-1 p-2"
                    placeholder="Ask AI (phone, laptop, cheap)..."
                />

                <button
                    onClick={sendMessage}
                    className="bg-green-600 text-white px-4"
                >
                    Send
                </button>

            </div>

        </div>
    );
};

export default AiChat;