
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Globe, Database, Calculator, Mail, Image, Upload, Link, Search } from 'lucide-react';

const skills = [
  {
    id: 'reading_doc',
    name: 'Document Reader',
    description: 'Read and analyze documents (PDF, DOCX, TXT)',
    icon: FileText,
    connector: {
      name: 'Document Upload',
      description: 'Upload documents from your device',
      type: 'file_upload',
      icon: Upload,
      allowedTypes: ['.pdf', '.docx', '.txt', '.md']
    },
    category: 'Data Processing'
  },
  {
    id: 'web_search',
    name: 'Web Search',
    description: 'Search and retrieve information from the web',
    icon: Globe,
    connector: {
      name: 'Search API',
      description: 'Connect to web search engines',
      type: 'api_connection',
      icon: Search,
      endpoints: ['Google Search API', 'Bing Search API', 'DuckDuckGo']
    },
    category: 'Information Retrieval'
  },
  {
    id: 'database_query',
    name: 'Database Query',
    description: 'Query and analyze database data',
    icon: Database,
    connector: {
      name: 'Database Connection',
      description: 'Connect to SQL/NoSQL databases',
      type: 'database_connection',
      icon: Database,
      supportedDbs: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite']
    },
    category: 'Data Processing'
  },
  {
    id: 'calculations',
    name: 'Mathematical Calculations',
    description: 'Perform complex mathematical operations',
    icon: Calculator,
    connector: {
      name: 'Calculator Engine',
      description: 'Built-in mathematical computation engine',
      type: 'internal',
      icon: Calculator,
      capabilities: ['Algebra', 'Statistics', 'Calculus', 'Data Analysis']
    },
    category: 'Computation'
  },
  {
    id: 'email_sender',
    name: 'Email Sender',
    description: 'Send automated emails and notifications',
    icon: Mail,
    connector: {
      name: 'Email Service',
      description: 'Connect to email service providers',
      type: 'api_connection',
      icon: Link,
      providers: ['SMTP', 'SendGrid', 'Mailgun', 'AWS SES']
    },
    category: 'Communication'
  },
  {
    id: 'image_analysis',
    name: 'Image Analysis',
    description: 'Analyze and process images using AI',
    icon: Image,
    connector: {
      name: 'Image Upload',
      description: 'Upload and process image files',
      type: 'file_upload',
      icon: Upload,
      allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
    },
    category: 'Vision'
  }
];

export const SkillsLibrary = () => {
  const handleDragStart = (e: React.DragEvent, skill: any) => {
    e.dataTransfer.setData('application/json', JSON.stringify(skill));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const categories = [...new Set(skills.map(skill => skill.category))];

  const getConnectorTypeColor = (type: string) => {
    switch (type) {
      case 'file_upload':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'api_connection':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'database_connection':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'internal':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="h-full p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Skills Library</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Drag skills to the canvas to create agents. Each skill includes a connector to link with external services.
      </p>
      
      {categories.map(category => (
        <div key={category} className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">{category}</h3>
          <div className="space-y-3">
            {skills.filter(skill => skill.category === category).map(skill => {
              const IconComponent = skill.icon;
              const ConnectorIcon = skill.connector.icon;
              return (
                <Card
                  key={skill.id}
                  className="cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 border-2 border-dashed border-transparent hover:border-primary/30"
                  draggable
                  onDragStart={(e) => handleDragStart(e, skill)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{skill.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Connector Information */}
                    <div className="border-t pt-3 mt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <ConnectorIcon className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground">Connector</span>
                      </div>
                      <div className="space-y-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getConnectorTypeColor(skill.connector.type)}`}
                        >
                          {skill.connector.name}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {skill.connector.description}
                        </p>
                        
                        {/* Additional connector details */}
                        {skill.connector.allowedTypes && (
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">Supported files:</span> {skill.connector.allowedTypes.join(', ')}
                          </div>
                        )}
                        
                        {skill.connector.endpoints && (
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">APIs:</span> {skill.connector.endpoints.join(', ')}
                          </div>
                        )}
                        
                        {skill.connector.supportedDbs && (
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">Databases:</span> {skill.connector.supportedDbs.join(', ')}
                          </div>
                        )}
                        
                        {skill.connector.providers && (
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">Providers:</span> {skill.connector.providers.join(', ')}
                          </div>
                        )}
                        
                        {skill.connector.capabilities && (
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">Capabilities:</span> {skill.connector.capabilities.join(', ')}
                          </div>
                        )}
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
