import React from 'react';
import DOMPurify from 'dompurify';

interface ProjectDisplayProps {
  description: string;
}

const ProjectDisplay: React.FC<ProjectDisplayProps> = ({ description }) => {
  return (
    <div 
      className="project-description"
      dangerouslySetInnerHTML={{ 
        __html: DOMPurify.sanitize(description)
      }} 
    />
  );
};

export default ProjectDisplay;