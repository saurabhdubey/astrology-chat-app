import { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth } from '../../lib/firebase';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Send message to Firestore
  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '' || isLoading) return;

    setIsLoading(true);
    
    try {
      // Add user message to Firestore
      await addDoc(collection(db, "messages"), {
        text: message,
        sender: auth.currentUser.email,
        timestamp: serverTimestamp(),
        isAI: false
      });

      // Get AI response
      await getAIResponse(message);
      
      setMessage('');
    } catch (error) {
      console.error("Error sending message: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get AI response and add to Firestore
  const getAIResponse = async (userMessage) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      
      const data = await response.json();
      
      // Add AI response to Firestore
      await addDoc(collection(db, "messages"), {
        text: data.reply,
        sender: "AI Astrologer",
        timestamp: serverTimestamp(),
        isAI: true
      });
    } catch (error) {
      console.error("Error getting AI response: ", error);
    }
  };

  // Listen for new messages
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`message ${msg.sender === auth.currentUser?.email ? "sent" : "received"} ${msg.isAI ? "ai-message" : ""}`}
          >
            <div className="sender">{msg.isAI ? "🔮 AstroAI" : "You"}</div>
            <div className="text">{msg.text}</div>
            <div className="timestamp">
              {msg.timestamp?.toDate().toLocaleTimeString()}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message received ai-message">
            <div className="sender">🔮 AstroAI</div>
            <div className="text">Thinking about your stars...</div>
          </div>
        )}
      </div>
      
      <form onSubmit={sendMessage} className="message-form">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about your relationship..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}