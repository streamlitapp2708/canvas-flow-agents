
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, CheckCircle, Clock, ArrowRight } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  skills: any[];
}

interface PlannerStatusProps {
  agents: Agent[];
  onClose: () => void;
}

export const PlannerStatus: React.FC<PlannerStatusProps> = ({ agents, onClose }) => {
  const [planningStep, setPlanningStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const planningSteps = [
    'Analyzing agent capabilities...',
    'Identifying skill dependencies...',
    'Creating execution plan...',
    'Optimizing workflow...',
    'Planning complete!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlanningStep(prev => {
        if (prev < planningSteps.length - 1) {
          return prev + 1;
        } else {
          setIsComplete(true);
          clearInterval(interval);
          return prev;
        }
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-96 max-w-[90vw]">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Planning Agent Active</CardTitle>
            {isComplete && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Planning Steps */}
          <div className="space-y-3">
            {planningSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                {index < planningStep ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : index === planningStep ? (
                  <Clock className="h-4 w-4 text-primary animate-spin" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-muted" />
                )}
                <span className={`text-sm ${
                  index <= planningStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step}
                </span>
              </div>
            ))}
          </div>

          {/* Agent Summary */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-sm mb-3">Workflow Agents</h4>
            <div className="space-y-2">
              {agents.map((agent, index) => (
                <div key={agent.id} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                  <Badge variant="outline" className="text-xs">
                    Agent {index + 1}
                  </Badge>
                  <div className="flex-1">
                    <span className="text-sm font-medium">{agent.name}</span>
                    <div className="flex items-center gap-1 mt-1">
                      {agent.skills.slice(0, 2).map(skill => (
                        <Badge key={skill.id} variant="secondary" className="text-xs">
                          {skill.name}
                        </Badge>
                      ))}
                      {agent.skills.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{agent.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isComplete && (
            <div className="pt-4 border-t">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-600">
                  Workflow is ready for execution!
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Use the chat interface below to start assigning tasks.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
