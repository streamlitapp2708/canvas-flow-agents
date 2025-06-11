
import React, { useState } from 'react';
import { WorkflowCanvas } from '../components/WorkflowCanvas';
import { SkillsLibrary } from '../components/SkillsLibrary';
import { ChatInterface } from '../components/ChatInterface';
import { PlannerStatus } from '../components/PlannerStatus';
import { Button } from '@/components/ui/button';
import { Bot, Play } from 'lucide-react';

const Index = () => {
  const [agents, setAgents] = useState([]);
  const [plannerActive, setPlannerActive] = useState(false);
  const [workflowPlanned, setWorkflowPlanned] = useState(false);

  const handlePlanWorkflow = () => {
    if (agents.length >= 2) {
      setPlannerActive(true);
      setWorkflowPlanned(true);
      console.log('Planning workflow with agents:', agents);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">AI Workflow Designer</h1>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={handlePlanWorkflow}
              disabled={agents.length < 2}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Plan Workflow
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Skills Library Sidebar */}
        <div className="w-80 border-r bg-card">
          <SkillsLibrary />
        </div>

        {/* Workflow Canvas */}
        <div className="flex-1 relative">
          <WorkflowCanvas 
            agents={agents} 
            setAgents={setAgents}
            plannerActive={plannerActive}
          />
          
          {/* Planner Status Overlay */}
          {plannerActive && (
            <PlannerStatus 
              agents={agents} 
              onClose={() => setPlannerActive(false)}
            />
          )}
        </div>
      </div>

      {/* Chat Interface */}
      {workflowPlanned && (
        <ChatInterface agents={agents} />
      )}
    </div>
  );
};

export default Index;
