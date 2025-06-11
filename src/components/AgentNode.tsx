
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Zap } from 'lucide-react';

interface Agent {
  id: string;
  x: number;
  y: number;
  name: string;
  description: string;
  model: string;
  systemPrompt: string;
  skills: any[];
}

interface AgentNodeProps {
  agent: Agent;
  onDoubleClick: () => void;
  isPlanned: boolean;
}

export const AgentNode: React.FC<AgentNodeProps> = ({ 
  agent, 
  onDoubleClick,
  isPlanned 
}) => {
  return (
    <div
      className="absolute cursor-pointer"
      style={{ left: agent.x, top: agent.y }}
      onDoubleClick={onDoubleClick}
    >
      <Card className={`w-48 transition-all duration-300 hover:shadow-lg ${
        isPlanned ? 'ring-2 ring-primary ring-opacity-50 shadow-lg' : 'hover:scale-105'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${
              isPlanned ? 'bg-primary/20' : 'bg-primary/10'
            }`}>
              <Bot className={`h-5 w-5 ${
                isPlanned ? 'text-primary animate-pulse' : 'text-primary'
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm truncate">{agent.name}</h4>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {agent.description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {agent.model}
                </Badge>
                {agent.skills.length > 0 && (
                  <Badge variant="outline" className="text-xs flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    {agent.skills.length}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {isPlanned && (
            <div className="mt-3 text-xs text-primary font-medium">
              ● Ready for execution
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
