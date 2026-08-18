import { ProjectObject } from '@/libs/projectVariable';
import React from 'react'
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}


const PDF = async ({ params }: PageProps) => {
     const { slug } = await params;
    
      const project = ProjectObject.find(
        (item) => item.id.toLowerCase() === slug.toLowerCase()
      );

  return (
    <div>
        
    </div>
  )
}

export default PDF