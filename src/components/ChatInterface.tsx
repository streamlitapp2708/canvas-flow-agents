
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, ArrowRight } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  skills: any[];
}

interface ChatInterfaceProps {
  agents: Agent[];
}

interface Message {
  id: string;
  type: 'user' | 'planner' | 'agent';
  content: string;
  agentName?: string;
  timestamp: Date;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ agents }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'planner',
      content: `Hello! I'm the Planning Agent. I have access to ${agents.length} specialized agents and I'm ready to help you accomplish complex tasks. What would you like me to help you with?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    // Simulate planner response
    setTimeout(() => {
      const plannerResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'planner',
        content: `I'll break down your task and assign it to the appropriate agents. Let me analyze this...`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, plannerResponse]);

      // Simulate agent assignments
      setTimeout(() => {
        agents.forEach((agent, index) => {
          setTimeout(() => {
            const agentMessage: Message = {
              id: (Date.now() + index + 10).toString(),
              type: 'agent',
              content: `I'm ${agent.name} and I've received my part of the task. Working on it now using my ${agent.skills.map(s => s.name).join(', ')} capabilities.`,
              agentName: agent.name,
              timestamp: new Date()
            };
            setMessages(prev => [...prev, agentMessage]);
          }, index * 1000);
        });

        setTimeout(() => {
          const finalResponse: Message = {
            id: (Date.now() + 100).toString(),
            type: 'planner',
            content: `Task completed! All agents have successfully executed their assigned portions. The workflow is functioning as designed.`,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, finalResponse]);
          setIsProcessing(false);
        }, agents.length * 1000 + 1000);
      }, 1500);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="mx-4 mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          Workflow Chat
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Messages */}
        <div className="h-64 overflow-y-auto mb-4 space-y-3 border rounded-lg p-3 bg-muted/30">
          {messages.map(message => (
            <div key={message.id} className={`flex gap-3 ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}>
              <div className={`max-w-[80%] ${
                message.type === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : message.type === 'planner'
                  ? 'bg-card border'
                  : 'bg-secondary'
              } rounded-lg p-3`}>
                {message.type !== 'user' && (
                  <div className="flex items-center gap-2 mb-1">
                    {message.type === 'planner' ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <div className="h-4 w-4 bg-primary rounded-full" />
                    )}
                    <Badge variant="outline" className="text-xs">
                      {message.type === 'planner' ? 'Planning Agent' : message.agentName}
                    </Badge>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex gap-3 justify-start">
              <div className="bg-card border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="h-4 w-4" />
                  <Badge variant="outline" className="text-xs">Processing</Badge>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe the task you want the agents to complete..."
            disabled={isProcessing}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isProcessing}
            className="flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Active Agents */}
        <div className="mt-3 pt-3 border-t">
          <p className="text-xs text-muted-foreground mb-2">Active Agents:</p>
          <div className="flex flex-wrap gap-2">
            {agents.map(agent => (
              <Badge key={agent.id} variant="secondary" className="text-xs">
                {agent.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
