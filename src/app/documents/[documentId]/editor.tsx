"use client"

import React from 'react'
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import {useEditor, EditorContent} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import ImageResize from "tiptap-extension-resize-image"
import { useEditorStore } from '@/store/use-editor-store'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import {Color} from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import {useLiveblocksExtension} from "@liveblocks/react-tiptap"
import { Threads } from './threads'
import { FontSizeExtension } from '@/extensions/font-size'
import { LineHeightExtension } from '@/extensions/line-height'
import { Ruler } from './ruler'
import { useStorage } from '@liveblocks/react'
const Editor = () => {
    const leftMargin = useStorage((root)=> root.leftMargin)
    const rightMargin = useStorage((root)=> root.rightMargin)
    const liveblocks = useLiveblocksExtension()
    //it is being called here like a custom hoook
    const {setEditor} = useEditorStore()

    const editor = useEditor({
      immediatelyRender: false,
        onCreate({editor}){
            setEditor(editor)
        },
        onDestroy(){
            setEditor(null)
        },
        onUpdate({editor}){
            setEditor(editor)
        },
        onSelectionUpdate({editor}){
            setEditor(editor)
        },
        onTransaction({editor}){
            setEditor(editor)
        },
        onFocus({editor}){
            setEditor(editor)
        },
        onBlur({editor}){
            setEditor(editor)
        },
        onContentError({editor}){
            setEditor(editor)
        },
        editorProps : {
            attributes : {
                style : `padding-left: ${leftMargin ?? 56}px; padding-right: ${rightMargin ?? 56}px;`,
                class : "focus:outline-none print:border-0 bg-[#ffffff] border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 cursor-text"
            }
        },
        extensions : [
            liveblocks,
            StarterKit.configure({
              history : false
            }),
            FontSizeExtension,
            LineHeightExtension,
            Underline,
            Link.configure({
              openOnClick: false,
              autolink: true,
              defaultProtocol: "https"
            }),
            FontFamily,
            TextStyle,
            Table,
            TableCell,
            TableHeader,
            TableRow,
            Image,
            TextAlign.configure({
              types: ["heading", "paragraph"]
            }),
            ImageResize,
            TaskItem.configure({
                nested : true
            }),
            TaskList,
            Color,
            //have to set the highlight multicolor to true, otherwise it will show only yellow color to highlight
            Highlight.configure({
              multicolor: true
            })
        ],
    })
  return (
    <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
      <Ruler/>
       <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
            <EditorContent editor={editor} />
            <Threads editor={editor}/>
       </div> 
    </div>
  )
}

export default Editor