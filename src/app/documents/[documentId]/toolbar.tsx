"use client"

import { LucideIcon, Undo2Icon } from 'lucide-react';
import React from 'react'
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';

interface ToolbarButtonProps{
    onClick?: ()=> void;
    isActive?: boolean;
    icon : LucideIcon;
}
const ToolbarButton =({onClick,isActive,icon: Icon} : ToolbarButtonProps)=>{
    return (
        //the cn package allows to have dynamic classes
        <button onClick={onClick} className={cn("text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80", 
            isActive && "bg-neutral-200/80"
        )}>
            <Icon className='size-4'/>
        </button>
    )
}

const Toolbar = () => {
    //calling the global state of editor, which will have an array of actions being performed, hence we can pass the undo action to undo the elements of that array
    const {editor} = useEditorStore()
    //here sections is defined for icons data and this array can be iterated in the toolbar, it has some props defined regarding the section, the section is made in the matrix format
    const sections: {
        label: string;
        icon : LucideIcon;
        onClick : ()=>void;
        isActive?: boolean;
    }[][] = [
        [
            {
                label : "Undo",
                icon : Undo2Icon,
                //here the function is defined that will be executed when this button is clicked
                onClick : ()=> editor?.chain().focus().undo().run()
            }
        ]
    ]
  return (
    <div className='bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
        {sections[0].map((item)=>(
            <ToolbarButton key={item.label}{...item}/>
        ))}
    </div>
  )
}

export default Toolbar