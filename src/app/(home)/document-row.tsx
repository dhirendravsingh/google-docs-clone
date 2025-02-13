import React from 'react'
import {format} from 'date-fns'
import { TableRow, TableCell } from '@/components/ui/table'
import { Doc } from '../../../convex/_generated/dataModel'
import { SiGoogledocs } from 'react-icons/si'
import { Building2Icon, CircleUserIcon, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DocumentRowProps { 
    document : Doc<"documents">
}
const DocumentRow = ({document} : DocumentRowProps) => {
  return (
    <TableRow className='cursor-pointer'>
        <TableCell className='w-[50px]'>
            <SiGoogledocs className="size-6 fill-blue-500"/>
        </TableCell>
        <TableCell className='font-medium md:w-[45%]'>
            {document.title}
        </TableCell>
        <TableCell className='text-muted-foreground hidden md:flex items-center gap-2'>
            {document.organizaitonId ? <Building2Icon className='size-4'/> : <CircleUserIcon className='size-4'/>}
            {document.organizaitonId ? "Organization" : "Personal"}
        </TableCell>
        <TableCell className='text-muted-foreground hidden md:table-cell'>
            {format(new Date(document._creationTime), "MMM d, yyyy")}
        </TableCell>
        <TableCell className='flex justify-end'>
            <Button variant="ghost" className='rounded-full' size="icon">
                <MoreVertical className='size-4'/>
            </Button>
        </TableCell>
    </TableRow>
  )
}

export default DocumentRow
