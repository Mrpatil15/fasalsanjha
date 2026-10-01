import React, { useState } from 'react';
import { Send, FileText, CheckCircle2, DollarSign, UserCheck, ShieldCheck } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const Messages: React.FC = () => {
  const { messages, sendMessage } = useAppStore();
  const [activeThreadId, setActiveThreadId] = useState<string>(messages[0]?.id || 'thread-1');
  const [inputText, setInputText] = useState('');

  const activeThread = messages.find(m => m.id === activeThreadId) || messages[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeThread.id, inputText);
    setInputText('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2card shadow-soft border border-slate-200 overflow-hidden flex flex-col md:flex-row h-[75vh]">
        {/* Left Thread List */}
        <div className="w-full md:w-80 border-r border-slate-200 bg-slate-50/50 flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-extrabold text-base text-slate-900">In-App Direct Messages</h2>
            <p className="text-xs text-slate-500">Buyer–Seller & Investor Discussions</p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {messages.map((thread) => (
              <div
                key={thread.id}
                onClick={() => setActiveThreadId(thread.id)}
                className={`p-4 cursor-pointer transition-colors flex items-start gap-3 ${
                  thread.id === activeThread.id
                    ? 'bg-white border-l-4 border-l-forest-800 shadow-sm'
                    : 'hover:bg-slate-100/60'
                }`}
              >
                <img
                  src={thread.contactAvatar}
                  alt={thread.contactName}
                  className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-xs text-slate-900 truncate">{thread.contactName}</h4>
                    <span className="text-[10px] text-slate-400">{thread.time}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-forest-800 truncate">{thread.cropOrListing}</p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{thread.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Active Conversation Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Active Header */}
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">
            <div className="flex items-center gap-3">
              <img
                src={activeThread.contactAvatar}
                alt={activeThread.contactName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-sm text-slate-900">{activeThread.contactName}</h3>
                <span className="text-xs text-forest-800 font-semibold">{activeThread.cropOrListing}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" /> Escrow Verified Chat
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/40">
            {activeThread.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
              >
                {msg.type === 'agreement' && (
                  <div className="my-2 p-3 rounded-2xl bg-amber-50 border border-amber-200 max-w-sm text-xs space-y-1 text-slate-800">
                    <span className="font-bold text-amber-900 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-amber-700" /> Tripartite Agreement Ready for e-Sign
                    </span>
                    <p className="text-[11px] text-slate-600">
                      Standardized smart contract clauses applied. Review and approve to disburse capital.
                    </p>
                  </div>
                )}

                {msg.type === 'offer' && (
                  <div className="my-2 p-3 rounded-2xl bg-forest-50 border border-forest-200 max-w-sm text-xs space-y-1 text-slate-800">
                    <span className="font-bold text-forest-900 flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-harvest-500" /> Formal Price Quote Accepted
                    </span>
                    <p className="text-[11px] text-slate-600">
                      Rate agreed at <strong>₹{msg.offerAmount}/quintal</strong>. Logistics dispatch scheduled.
                    </p>
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl text-xs max-w-md leading-relaxed shadow-sm ${
                    msg.isMe
                      ? 'bg-forest-900 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`text-[9px] block text-right mt-1 ${msg.isMe ? 'text-forest-200' : 'text-slate-400'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Send Input Box */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type message, counter-offer, or inquiry..."
              className="flex-1 p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-forest-800 outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1"
            >
              <Send className="w-4 h-4 text-harvest-400" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
