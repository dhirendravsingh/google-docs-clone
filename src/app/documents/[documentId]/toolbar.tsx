"use client"

import { BoldIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, Underline, Undo2Icon } from 'lucide-react';
import React from 'react'
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import { Separator } from '@/components/ui/separator';

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
            },
            {
                label : "Redo",
                icon : Redo2Icon,
                //here the function is defined that will be executed when this button is clicked
                onClick : ()=> editor?.chain().focus().redo().run()
            },
            {
                label : "Print",
                icon : PrinterIcon,
                //here the function is defined that will be executed when this button is clicked
                onClick : ()=> window.print()
            },
            {
                label : "Spell Check",
                icon : SpellCheckIcon,
                //this is native browser spell check, no third party api
                //here we are fetching the dom of the editor and calling the getAttribute
                onClick : ()=> {
                    const current = editor?.view.dom.getAttribute("spellcheck")
                    editor?.view.dom.setAttribute("spellcheck", current=== "false" ? "true" : "false")
                }
            }
        ] ,
        [
            {
                label : "Bold",
                icon : BoldIcon,
                isActive : editor?.isActive("bold"),
                //here the function is defined that will be executed when this button is clicked
                onClick : ()=> editor?.chain().focus().toggleBold().run()
            },
            {
                label : "Italic",
                icon : ItalicIcon,
                isActive : editor?.isActive("italic"),
                //here the function is defined that will be executed when this button is clicked
                onClick : ()=> editor?.chain().focus().toggleItalic().run()
            },
            {
                label : "Underline",
                icon : Underline,
                isActive : editor?.isActive("underline"),
                //here the function is defined that will be executed when this button is clicked
                onClick : ()=> editor?.chain().focus().toggleUnderline().run()
            }
        ],
        [
            {
                label : "Comment",
                icon : MessageSquarePlusIcon,
                isActive : false,
                //here the function is defined that will be executed when this button is clicked
                onClick : ()=> console.log("TODO comment")
            },
            {
                label : "List Todo",
                icon : ListTodoIcon,
                isActive : editor?.isActive("taskList"),
                //here the function is defined that will be executed when this button is clicked
                onClick : ()=> editor?.chain().focus().toggleTaskList().run()
            },
            {
                label : "Remove Formatting",
                icon : RemoveFormattingIcon,
                //here the function is defined that will be executed when this button is clicked
                onClick : ()=> editor?.chain().focus().unsetAllMarks().run()
            }
        ]
    ]
  return (
    <div className='bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
        {sections[0].map((item)=>(
            <ToolbarButton key={item.label}{...item}/>
        ))}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        {/* {TODO font family} */}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        {/* {TODO Heading} */}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        {/* {TODO font size} */}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        {
            sections[1].map((item)=>(
                <ToolbarButton key={item.label}{...item}/>
            ))
        }
        {/* {Text color} */}
        {/* {highlight color} */}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        {/* {Link} */}
        {/* {Image} */}
        {/* {Align} */}
        {/* {Line height} */}
        {/* {List} */}

        {
            sections[2].map((item)=>(
                <ToolbarButton key={item.label}{...item}/>
            ))
        }

    </div>
  )
}

export default Toolbar