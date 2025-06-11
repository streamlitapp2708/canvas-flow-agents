
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Globe, Database, Calculator, Mail, Image } from 'lucide-react';

const skills = [
  {
    id: 'reading_doc',
    name: 'Document Reader',
    description: 'Read and analyze documents',
    icon: FileText,
    connector: 'Document Upload',
    category: 'Data Processing'
  },
  {
    id: 'web_search',
    name: 'Web Search',
    description: 'Search and retrieve web information',
    icon: Globe,
    connector: 'Search API',
    category: 'Information Retrieval'
  },
  {
    id: 'database_query',
    name: 'Database Query',
    description: 'Query and analyze database data',
    icon: Database,
    connector: 'Database Connection',
    category: 'Data Processing'
  },
  {
    id: 'calculations',
    name: 'Mathematical Calculations',
    description: 'Perform complex calculations',
    icon: Calculator,
    connector: 'Calculator Engine',
    category: 'Computation'
  },
  {
    id: 'email_sender',
    name: 'Email Sender',
    description: 'Send automated emails',
    icon: Mail,
    connector: 'Email Service',
    category: 'Communication'
  },
  {
    id: 'image_analysis',
    name: 'Image Analysis',
    description: 'Analyze and process images',
    icon: Image,
    connector: 'Image Upload',
    category: 'Vision'
  }
];

export const SkillsLibrary = () => {
  const handleDragStart = (e: React.DragEvent, skill: any) => {
    e.dataTransfer.setData('application/json', JSON.stringify(skill));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const categories = [...new Set(skills.map(skill => skill.category))];

  return (
    <div className="h-full p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Skills Library</h2>
      
      {categories.map(category => (
        <div key={category} className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">{category}</h3>
          <div className="space-y-2">
            {skills.filter(skill => skill.category === category).map(skill => {
              const IconComponent = skill.icon;
              return (
                <Card
                  key={skill.id}
                  className="cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 border-2 border-dashed border-transparent hover:border-primary/30"
                  draggable
                  onDragStart={(e) => handleDragStart(e, skill)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{skill.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {skill.description}
                        </p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {skill.connector}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
