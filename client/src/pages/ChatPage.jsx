import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import ChatMessage from '../components/ChatMessage.jsx';
import { askQuestion } from '../api/client.js';

const SUGGESTED_QUESTIONS = [
  'When was Pump-7 last serviced?',
  'What is the safety procedure for confined space entry?',
  'Are there any overdue maintenance items?',
  'Summarize the last inspection report',
];

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (question) => {
    const q = (question || input).trim();
    if (!q || loading) return;

    setMessages((prev) => [...prev, { role: 'user', content: q }]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await askQuestion(q);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.answer, sources: data.sources },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            '⚠️ Something went wrong reaching the server. Make sure the backend is running and try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="px-6 py-4 border-b border-tealDim/20">
        <h1 className="text-lg font-semibold text-white">Ask FactoryIQ</h1>
        <p className="text-sm text-gray-400">
          Ask a question about your uploaded documents — get an answer with sources.
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
        {messages.length === 0 && (
          <div className="max-w-xl mx-auto mt-10 text-center">
            <p className="text-gray-400 mb-4">Try asking something like:</p>
            <div className="grid grid-cols-1 gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-left px-4 py-2.5 rounded-lg bg-card border border-tealDim/30 text-sm text-offwhite hover:border-teal transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <ChatMessage key={i} role={m.role} content={m.content} sources={m.sources} />
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-gray-400 text-sm pl-11">
            <Loader2 size={16} className="animate-spin" />
            Searching documents and generating an answer…
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-tealDim/20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2 max-w-3xl mx-auto"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your documents…"
            className="flex-1 bg-card border border-tealDim/30 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-teal text-navy px-4 py-2.5 rounded-lg font-medium disabled:opacity-40 flex items-center gap-2"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
