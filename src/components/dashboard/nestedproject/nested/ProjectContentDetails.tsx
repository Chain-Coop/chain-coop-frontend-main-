import React from 'react';
import { Primary } from '../../../common/Button';
import { formatBalance } from '../../../../shared/utils/format';

interface ProjectContentDetailsProps {
  project: any; 
}

const ProjectContentDetails: React.FC<ProjectContentDetailsProps> = ({ project }) => {
        if (!project) {
          return <LoadingIndicator />;
        }

  return (
    <main className='font-sans px-3'>
        <header>
            <h1 className='font-semibold text-lg'>{project?.title}</h1>
        </header>
        <div className='flex flex-col gap-[1.4em] mt-[1.3em]'>
         <p className='text-gray-400 font-semibold text-sm'>OverView</p>
        <article>
            <p className='font-medium'>
            {project?.description}
            </p>
        </article>
        <div>
            <img src={project?.documentUrl} alt={project.title} className='rounded-lg' />
        </div>
        <div className='flex flex-col gap-[1em]'>
          <p className='font-medium text-howtext'>Project Price</p>
          <p className='font-bold'>This Project is available for {formatBalance(project?.projectPrice)} {}</p>
        </div>
        <div className='flex justify-between items-center'>
           <h1>back</h1>
           <Primary
           className="mt-8 w- bg-text2 rounded-md py-2 font-semibold px-5 text-white"
          >
          Purchase
        </Primary>
        </div>
        </div>
    </main>
  );
};

export default ProjectContentDetails;

const LoadingIndicator = () => (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
    </div>
  );