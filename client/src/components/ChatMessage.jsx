import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FileText, User, Bot } from 'lucide-react';

export default function ChatMessage({ role, content, sources }) {
  const isUser = role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center shrink-0">
          <Bot size={16} className="text-teal" />
        </div>
      )}

      <div className={`max-w-2xl ${isUser ? 'order-1' : ''}`}>
        <div
          className={`rounded-xl px-4 py-3 ${
            isUser ? 'bg-teal text-navy font-medium' : 'bg-card text-offwhite border border-tealDim/30'
          }`}
        >
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </div>

        {sources && sources.length > 0 && (
          <div className="mt-2 space-y-1.5">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
              Sources
            </p>
            {sources.map((src, i) => (
              <div
                key={i}
                className="flex items-start gap-2 bg-navyMid/60 rounded-lg px-3 py-2 text-xs border border-tealDim/20"
              >
                <FileText size={14} className="text-teal shrink-0 mt-0.5" />
                <div>
                  <span className="text-teal font-medium">
                    {src.documentName}
                    {src.pageNumber ? ` — page ${src.pageNumber}` : ''}
                  </span>
                  <p className="text-gray-400 mt-0.5 line-clamp-2">{src.snippet}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center shrink-0">
          <User size={16} className="text-white" />
        </div>
      )}
    </div>
  );
}
