import React, { useEffect, useState } from "react";

const SupportChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState(null);

  // FAKE API - create support ticket
  const createTicket = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`TICKET-${Math.floor(Math.random() * 99999)}`);
      }, 800);
    });
  };

  // FAKE AI SUPPORT RESPONSE ENGINE
  const getSupportReply = (msg) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let reply;

        if (msg.includes("refund")) {
          reply = "Your refund request is being processed.";
        } else if (msg.includes("order")) {
          reply = "Please provide your order ID.";
        } else if (msg.includes("delivery")) {
          reply = "Your delivery will arrive within 3-5 days.";
        } else {
          reply = "Our support team will assist you shortly.";
        }

        resolve(reply);
      }, 1200);
    });
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    setLoading(true);

    // create ticket first time
    if (!ticketId) {
      const id = await createTicket();
      setTicketId(id);
    }

    const userMsg = {
      id: Date.now(),
      type: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);

    const replyText = await getSupportReply(input);

    const botMsg = {
      id: Date.now() + 1,
      type: "bot",
      text: replyText,
    };

    setMessages((prev) => [...prev, botMsg]);

    setInput("");
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-2xl rounded-xl flex flex-col">

      {/* HEADER */}
      <div className="bg-blue-600 text-white p-3 rounded-t-xl">
        <h2 className="font-bold">Support Chat</h2>
        {ticketId && (
          <p className="text-xs">Ticket: {ticketId}</p>
        )}
      </div>

      {/* MESSAGES */}
      <div className="h-64 overflow-y-auto p-2 space-y-2">

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded ${msg.type === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-200 text-left"
              }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <p className="text-sm text-gray-500">
            Support typing...
          </p>
        )}

      </div>

      {/* INPUT */}
      <div className="p-2 flex gap-2 border-t">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-1 rounded"
          placeholder="Ask support..."
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-3 rounded"
        >
          Send
        </button>

      </div>

    </div>
  );
};

export default SupportChat;