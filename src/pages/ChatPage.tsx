import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { timeAgo } from '../utils/format';
import type { Item, Message } from '../types';

const quickPrompts = [
  'Where can I pick it up?',
  'I left it with security at Mills.',
  'Can we meet at MUSC atrium?',
  'What proof do you need?',
];

export const ChatPage = () => {
  const { itemId, otherUserId } = useParams();
  const { user, requireLogin } = useAuth();
  const { fetchMessages, sendMessage, getItem } = useData();
  const [messages, setMessages] = useState<Message[]>([]);
  const [item, setItem] = useState<Item | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!itemId) return;
      const data = await fetchMessages(itemId, user?.id, otherUserId);
      setMessages(data);
      const loadedItem = await getItem(itemId);
      setItem(loadedItem);
      setLoading(false);
    };
    void load();
  }, [fetchMessages, getItem, itemId, otherUserId, user?.id]);

  const handleSend = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!itemId || !otherUserId) return;
    if (!requireLogin(`/chat/${itemId}/${otherUserId}`)) return;
    if (!input.trim()) return;
    await sendMessage(itemId, otherUserId, input.trim(), user);
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        item_id: itemId,
        sender_id: user?.id ?? 'me',
        receiver_id: otherUserId,
        body: input.trim(),
        created_at: new Date().toISOString(),
      },
    ]);
    setInput('');
  };

  if (loading) {
    return (
      <div className="page">
        <div className="card">Loading chat...</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="pill">Chat</p>
          <h2>Coordinate pickup</h2>
          <p className="lede">
            Ask questions, prove ownership, and share where the item can be picked up or was kept.
            Item: {item?.vague_description || item?.title || 'Item'} - blurred image for safety.
          </p>
        </div>
      </div>
      <div className="callout">
        Suggest safe meetup spots: MUSC atrium, Mills entrance, ETB lobby. Meet during daytime with a friend if possible.
      </div>

      <div className="quick-prompts">
        <span className="hint">Quick prompts:</span>
        {quickPrompts.map((text) => (
          <button
            key={text}
            type="button"
            className="chip chip-soft"
            onClick={() => setInput(text)}
          >
            {text}
          </button>
        ))}
      </div>

      <div className="chat-window">
        {messages.length === 0 && <p className="hint">No messages yet.</p>}
        {messages.map((msg) => {
          const mine = msg.sender_id === user?.id;
          return (
            <div key={msg.id} className={`chat-bubble ${mine ? 'chat-mine' : ''}`}>
              <div className="chat-meta">
                <span>{mine ? 'You' : msg.sender_id}</span>
                <span>{timeAgo(msg.created_at)}</span>
              </div>
              <div className="chat-body">{msg.body}</div>
            </div>
          );
        })}
      </div>

      <form className="chat-input" onSubmit={handleSend}>
        <input
          className="input"
          placeholder="Send a message (quiz question, meetup spot, proof check)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="primary-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};
