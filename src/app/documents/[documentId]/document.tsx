"use client"

import React from 'react'
import Editor from './editor'
import Toolbar from './toolbar'
import { Navbar } from './navbar'
import { Room } from './room'
import { api } from '../../../../convex/_generated/api'
import { Preloaded, usePreloadedQuery } from 'convex/react'

interface DocumentProps {
    preloadedDocument : Preloaded<typeof api.documents.getById>
}


const Document = ({preloadedDocument}: DocumentProps) => {
  //the initial load of the document info is done by the server component and we are making sure that the real time changes are also updated using a client component
    const document = usePreloadedQuery(preloadedDocument)
  return (
    <Room>
    <div className='min-h-screen bg-[#FAFBFD]'>
      <div className='flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] print:hidden'>
        <Navbar data={document}/>
        <Toolbar/>
      </div>
      <div className='pt-[114px] print:pt-0'>
        
          <Editor initialContent={document.initialContent}/>
        
      </div> 
    </div>
    </Room>
  )
}

export default Document