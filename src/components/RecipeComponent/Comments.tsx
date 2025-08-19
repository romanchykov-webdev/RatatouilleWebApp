'use client';

import React, { JSX } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

const Comments: React.FC = (): JSX.Element => {
  return (
    <article className="flex items-center  gap-x-5">
      <Textarea placeholder="Type your message here." className="min-h-[200px]" />
      <Button className="flex h-[70px] w-[70px] text-blue-500  hover:bg-blue-500 hover:text-black ">
        <Send style={{ width: '50px', height: '50px' }} />
      </Button>
    </article>
  );
};
export default Comments;
