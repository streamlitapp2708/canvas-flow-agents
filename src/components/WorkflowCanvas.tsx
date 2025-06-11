
import React, { useState, useRef } from 'react';
import { AgentNode } from './AgentNode';
import { AgentConfigModal } from './AgentConfigModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

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

interface WorkflowCanvasProps {
  agents: Agent[];
  setAgents: (agents: Agent[]) => void;
  plannerActive: boolean;
}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({ 
  agents, 
  setAgents, 
  plannerActive 
}) => {
  const [draggedSkill, setDraggedSkill] = useState(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    try {
      const skill = JSON.parse(e.dataTransfer.getData('application/json'));
      const x = e.clientX - rect.left - 100; // Offset for agent size
      const y = e.clientY - rect.top - 50;

      // Create new agent at drop position
      const newAgent: Agent = {
        id: `agent-${Date.now()}`,
        x,
        y,
        name: 'New Agent',
        description: 'Agent description',
        model: 'gpt-4',
        systemPrompt: '',
        skills: [skill]
      };

      setSelectedAgent(newAgent);
      setConfigModalOpen(true);
    } catch (error) {
      console.error('Error parsing dropped skill:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleAgentDoubleClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setConfigModalOpen(true);
  };

  const handleAgentSave = (updatedAgent: Agent) => {
    if (agents.find(a => a.id === updatedAgent.id)) {
      // Update existing agent
      setAgents(agents.map(a => a.id === updatedAgent.id ? updatedAgent : a));
    } else {
      // Add new agent
      setAgents([...agents, updatedAgent]);
    }
    setConfigModalOpen(false);
    setSelectedAgent(null);
  };

  const addEmptyAgent = () => {
    const newAgent: Agent = {
      id: `agent-${Date.now()}`,
      x: 300,
      y: 200,
      name: 'New Agent',
      description: 'Agent description',
      model: 'gpt-4',
      systemPrompt: '',
      skills: []
    };

    setSelectedAgent(newAgent);
    setConfigModalOpen(true);
  };

  return (
    <>
      <div
        ref={canvasRef}
        className="w-full h-full bg-gradient-to-br from-background to-muted/20 relative overflow-hidden"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />
        </div>

        {/* Canvas Instructions */}
        {agents.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-8 bg-card/80 backdrop-blur-sm rounded-xl border-2 border-dashed border-muted-foreground/30">
              <h3 className="text-xl font-semibold mb-4">Start Building Your Workflow</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Drag skills from the library to create agents, or click the button below to add an empty agent.
              </p>
              <Button onClick={addEmptyAgent} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Agent
              </Button>
            </div>
          </div>
        )}

        {/* Agents */}
        {agents.map(agent => (
          <AgentNode
            key={agent.id}
            agent={agent}
            onDoubleClick={() => handleAgentDoubleClick(agent)}
            isPlanned={plannerActive}
          />
        ))}

        {/* Planner Agent (when active) */}
        {plannerActive && (
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
            <div className="bg-primary text-primary-foreground p-4 rounded-xl shadow-lg border-2 border-primary/50">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div>
                  <h4 className="font-semibold">Planning Agent</h4>
                  <p className="text-sm opacity-90">Orchestrating workflow execution</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Agent Button */}
        {agents.length > 0 && (
          <Button
            onClick={addEmptyAgent}
            className="absolute top-4 right-4 flex items-center gap-2"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
            Add Agent
          </Button>
        )}
      </div>

      {/* Agent Configuration Modal */}
      <AgentConfigModal
        open={configModalOpen}
        onOpenChange={setConfigModalOpen}
        agent={selectedAgent}
        onSave={handleAgentSave}
      />
    </>
  );
};
