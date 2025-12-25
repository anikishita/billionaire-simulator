import React from 'react';
import { Search, Edit, Phone, Video, Info } from 'lucide-react';

const MESSAGES = [
    { id: 1, sender: 'BankSim', time: 'Now', preview: 'Your payment of $50,000 to Luxury District was successful.', unread: true },
    { id: 2, sender: 'Mom', time: '10:42 AM', preview: 'Are you spending all your money again? Call me.', unread: true },
    { id: 3, sender: 'Hedge Fund Manager', time: 'Yesterday', preview: 'The market is crashing! Sell everything!', unread: false },
    { id: 4, sender: 'Amazon Delivery', time: 'Yesterday', preview: 'Your package "Robot Butler" has been delivered.', unread: false },
    { id: 5, sender: 'Unknown Number', time: 'Tuesday', preview: 'We have been trying to reach you about your car\'s extended warranty.', unread: false },
];

export const MessagesApp: React.FC = () => {
    const [messageText, setMessageText] = React.useState('');

    const handleSendMessage = () => {
        if (messageText.trim()) {
            // In a real app, this would send to backend
            // For now, just clear the input as visual feedback
            setMessageText('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex h-full bg-white font-sans overflow-hidden">
            {/* Sidebar */}
            <div className="w-full sm:w-80 border-r border-slate-200 flex flex-col bg-slate-50/50 backdrop-blur-xl">
                <div className="p-2 sm:p-3 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-slate-500 bg-slate-200/50 px-2 py-1 rounded-md w-full">
                        <Search size={14} />
                        <input type="text" placeholder="Search" className="bg-transparent text-xs sm:text-sm outline-none w-full" />
                    </div>
                    <button className="ml-2 text-blue-500"><Edit size={16} className="sm:w-5 sm:h-5" /></button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {MESSAGES.map((msg) => (
                        <div key={msg.id} className={`p-2 sm:p-3 border-b border-slate-100 hover:bg-blue-50 cursor-pointer ${msg.unread ? 'bg-blue-50/30' : ''}`}>
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">{msg.sender}</span>
                                <span className="text-[10px] sm:text-xs text-slate-400 shrink-0 ml-2">{msg.time}</span>
                            </div>
                            <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                {msg.preview}
                            </p>
                            {msg.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 sm:mt-2" />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="hidden sm:flex flex-1 flex-col bg-white">
                <div className="h-12 sm:h-14 border-b border-slate-100 flex items-center justify-between px-3 sm:px-4">
                    <div className="flex flex-col">
                        <span className="font-bold text-xs sm:text-sm">BankSim</span>
                        <span className="text-[10px] sm:text-xs text-slate-400">To: You</span>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 text-blue-500">
                        <Video size={18} className="sm:w-5 sm:h-5" />
                        <Phone size={18} className="sm:w-5 sm:h-5" />
                        <Info size={18} className="sm:w-5 sm:h-5" />
                    </div>
                </div>
                <div className="flex-1 p-3 sm:p-4 overflow-y-auto flex flex-col gap-3 sm:gap-4">
                    <div className="self-center text-[10px] sm:text-xs text-slate-400 my-2">Today 9:41 AM</div>
                    <div className="self-start bg-slate-200 rounded-2xl rounded-tl-none px-3 sm:px-4 py-2 max-w-xs text-xs sm:text-sm text-slate-800">
                        Your account balance is low. Please top up immediately to avoid service interruption.
                    </div>
                    <div className="self-end bg-blue-500 text-white rounded-2xl rounded-tr-none px-3 sm:px-4 py-2 max-w-xs text-xs sm:text-sm">
                        I just bought a private island, what do you expect?
                    </div>
                    <div className="self-start bg-slate-200 rounded-2xl rounded-tl-none px-3 sm:px-4 py-2 max-w-xs text-xs sm:text-sm text-slate-800">
                        Your payment of $50,000 to Luxury District was successful.
                    </div>
                    <div className="self-end text-[10px] sm:text-xs text-slate-400 mr-2">Delivered</div>
                </div>
                <div className="p-3 sm:p-4 border-t border-slate-100">
                    <div className="border border-slate-300 rounded-full px-3 sm:px-4 py-2 flex items-center gap-2">
                        <input 
                            type="text" 
                            placeholder="iMessage" 
                            className="flex-1 outline-none text-xs sm:text-sm" 
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button 
                            className="text-blue-500 font-bold text-xs sm:text-sm disabled:opacity-50"
                            onClick={handleSendMessage}
                            disabled={!messageText.trim()}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
