
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Brain } from 'lucide-react';

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

interface AgentConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: Agent | null;
  onSave: (agent: Agent) => void;
}

// Mock skills for recommendation
const allSkills = [
  {
    id: 'reading_doc',
    name: 'Document Reader',
    description: 'Read and analyze documents',
    keywords: ['document', 'read', 'analyze', 'text', 'pdf']
  },
  {
    id: 'web_search',
    name: 'Web Search',
    description: 'Search and retrieve web information',
    keywords: ['search', 'web', 'internet', 'find', 'lookup']
  },
  {
    id: 'database_query',
    name: 'Database Query',
    description: 'Query and analyze database data',
    keywords: ['database', 'query', 'sql', 'data', 'table']
  },
  {
    id: 'calculations',
    name: 'Mathematical Calculations',
    description: 'Perform complex calculations',
    keywords: ['calculate', 'math', 'compute', 'number', 'formula']
  },
  {
    id: 'email_sender',
    name: 'Email Sender',
    description: 'Send automated emails',
    keywords: ['email', 'send', 'message', 'notify', 'communicate']
  }
];

export const AgentConfigModal: React.FC<AgentConfigModalProps> = ({
  open,
  onOpenChange,
  agent,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    model: 'gpt-4',
    systemPrompt: '',
    skills: [] as any[]
  });
  
  const [recommendedSkills, setRecommendedSkills] = useState<any[]>([]);

  useEffect(() => {
    if (agent) {
      setFormData({
        name: agent.name,
        description: agent.description,
        model: agent.model,
        systemPrompt: agent.systemPrompt,
        skills: agent.skills || []
      });
    }
  }, [agent]);

  useEffect(() => {
    // Smart skill recommendation based on system prompt
    if (formData.systemPrompt) {
      const prompt = formData.systemPrompt.toLowerCase();
      const recommended = allSkills.filter(skill => 
        skill.keywords.some(keyword => prompt.includes(keyword))
      ).slice(0, 4);
      setRecommendedSkills(recommended);
    } else {
      setRecommendedSkills([]);
    }
  }, [formData.systemPrompt]);

  const handleSave = () => {
    if (!agent) return;
    
    const updatedAgent: Agent = {
      ...agent,
      ...formData
    };
    
    onSave(updatedAgent);
  };

  const toggleSkill = (skill: any) => {
    const isSelected = formData.skills.some(s => s.id === skill.id);
    if (isSelected) {
      setFormData({
        ...formData,
        skills: formData.skills.filter(s => s.id !== skill.id)
      });
    } else {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill]
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Configure Agent
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Agent Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Research Assistant"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select value={formData.model} onValueChange={(value) => setFormData({ ...formData, model: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude-3">Claude 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the agent's purpose"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="systemPrompt">System Prompt</Label>
            <Textarea
              id="systemPrompt"
              value={formData.systemPrompt}
              onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
              placeholder="Define the agent's role, behavior, and capabilities..."
              rows={4}
            />
          </div>

          {/* Recommended Skills */}
          {recommendedSkills.length > 0 && (
            <div className="space-y-3">
              <Label>Recommended Skills</Label>
              <p className="text-sm text-muted-foreground">
                Based on your system prompt, these skills might be useful:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {recommendedSkills.map(skill => {
                  const isSelected = formData.skills.some(s => s.id === skill.id);
                  return (
                    <Card 
                      key={skill.id} 
                      className={`cursor-pointer transition-all ${
                        isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'
                      }`}
                      onClick={() => toggleSkill(skill)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <Checkbox checked={isSelected} />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{skill.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Selected Skills */}
          {formData.skills.length > 0 && (
            <div className="space-y-3">
              <Label>Selected Skills</Label>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map(skill => (
                  <Badge key={skill.id} variant="default" className="flex items-center gap-2">
                    {skill.name}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => toggleSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Agent
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
