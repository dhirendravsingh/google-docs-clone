"use client"

import { BoldIcon, ChevronDownIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, Underline, Undo2Icon } from 'lucide-react';
import React from 'react'
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type Level } from '@tiptap/extension-heading';
const HeadingLevelButton=()=>{
     //loading the global state of the editor, this gives the access to the editor
    const {editor} = useEditorStore()

    const headings = [
        {label: "Normal text", value:0, fontSize: "16px"},
        {label: "Heading 1", value:1, fontSize: "32px"},
        {label: "Heading 2", value:2, fontSize: "24px"},
        {label: "Heading 3", value:3, fontSize: "20px"},
        {label: "Heading 4", value:4, fontSize: "18px"},
        {label: "Heading 5", value:5, fontSize: "16px"},
    ]

    const getCurrentHeading=()=> {
        for(let level=1; level <=5; level++){
            if(editor?.isActive("heading", {level})){
                return `Heading ${level}`
            }
        }

        return "Normal Text"
    }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <button className='h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
                <span className='truncate'>
                    {/* this function will be fetching the current level of heading */}
                    {getCurrentHeading()}
                </span>
                <ChevronDownIcon className='ml-2 size-4 shrink-0'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 felx flex-col gap-y-1">
                {headings.map(({label, value, fontSize})=>(
                    <button
                    key={value}
                    style={{fontSize}}
                    onClick={()=>{
                        if(value===0){
                            editor?.chain().focus().setParagraph().run()
                        } else {
                            editor?.chain().focus().toggleHeading({level : value as Level}).run()
                        }
                    }}
                    className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80", 
                        //below the dynamic className has been used which will appear in darker shade when selected
                        (value===0 && !editor?.isActive("heading")) || editor?.isActive("heading", {level : value}) &&  "bg-neutral-200/80"
                    )}>
                    {label}
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


//here a separate component is created for font-family as it is more complex, hence it is not extracted directly from the starter kit
const FontFamilyButton=()=>{
    //loading the global state of the editor
    const {editor} = useEditorStore()

    const fonts = [
        {label: "Arial", value: "Arial"},
        {label: "Times New Roman", value: "Times New Roman"},
        {label: "Courier New", value : "Courier New"},
        {label: "Georgia", value:"Georgia"},
        {label: "Verdana", value: "Verdana"},
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
                <span className='truncate'>
                    {/* here we have set the textstyle either to the fontfamily selected or the default one will be "Arial" */}
                    {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                </span>
                <ChevronDownIcon className='ml-2 size-4 shrink-0'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {fonts.map(({label, value})=>(
                    <button
                    key={value}
                    onClick={()=> editor?.chain().focus().setFontFamily(value).run()}
                    className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80", 
                        //below the dynamic className has been used which will appear in darker shade when selected
                        editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                    )}
                    style={{fontFamily: value}}>
                        <span className='text-sm'>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
         </DropdownMenu>   
    )
}

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
    //calling the global state of editor, which will have an array of actions being performed, hence we can pass the new actions like undo to undo the elements of that array
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
        <FontFamilyButton/>
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        <HeadingLevelButton/>
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