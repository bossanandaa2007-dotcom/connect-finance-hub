import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Bot, User, Sparkles, TrendingUp } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const suggestedQuestions = [
  "What's my profit this month?",
  "Which product is most profitable?",
  "How can I reduce costs?",
  "Analyze my business health",
];

const BusinessChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your business intelligence assistant. I can help you analyze your business performance, identify growth opportunities, and provide strategic insights. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responses: { [key: string]: string } = {
        "What's my profit this month?": "Based on your current data:\n\n📊 **Monthly Summary**\n• Revenue: $10,500\n• Expenses: $3,900\n• Net Profit: $6,600\n\nYour profit margin is 62.8%, which is excellent! You're outperforming last month by 12.5%.",
        "Which product is most profitable?": "📦 **Product Profitability Analysis:**\n\n1. **Premium Widget** - 49% margin, $49 profit/unit\n2. **Eco Bag** - 66% margin, $10 profit/unit\n\n💡 While Eco Bags have higher margins, Premium Widgets generate more absolute profit. Consider bundling them for maximum revenue.",
        "How can I reduce costs?": "💰 **Cost Reduction Strategies:**\n\n1. **Inventory Management** - Reduce holding costs by 15%\n2. **Bulk Purchasing** - Negotiate 10-15% discounts\n3. **Automate Operations** - Cut labor costs by 20%\n4. **Review Subscriptions** - Eliminate unused services\n5. **Energy Efficiency** - Reduce utility bills\n\n📈 Implementing these could save you $800-1,200/month.",
        "Analyze my business health": "🏥 **Business Health Report:**\n\n✅ **Strengths:**\n• Strong profit margins (62.8%)\n• Consistent revenue growth\n• Diverse income streams\n\n⚠️ **Areas to Watch:**\n• Inventory turnover could improve\n• Marketing ROI needs optimization\n\n📊 **Overall Score: 8.5/10**\n\nYour business is in excellent shape! Focus on scaling your best-performing products.",
      };

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[messageText] || "I understand you're asking about your business. Based on your data, I can see positive trends in your revenue and profitability. Would you like me to provide specific insights on revenue, expenses, products, or growth strategies?",
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">Business Assistant</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              AI Powered
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'user' ? 'bg-accent' : 'bg-accent/10'
            }`}>
              {message.role === 'user' ? (
                <User className="w-4 h-4 text-accent-foreground" />
              ) : (
                <Bot className="w-4 h-4 text-accent" />
              )}
            </div>
            <div className={`max-w-[80%] p-3 rounded-2xl ${
              message.role === 'user'
                ? 'bg-accent text-accent-foreground rounded-tr-sm'
                : 'bg-card border border-border rounded-tl-sm'
            }`}>
              <p className="text-sm whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-accent" />
            </div>
            <div className="bg-card border border-border p-3 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              </div>
            </div>
          </div>
        )}

        {messages.length === 1 && (
          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Try asking:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => handleSend(question)}
                  className="px-3 py-2 text-sm bg-card border border-border rounded-full hover:border-accent hover:bg-accent/5 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about your business..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button
            size="icon"
            className="bg-accent hover:bg-accent/90"
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BusinessChatbotPage;
