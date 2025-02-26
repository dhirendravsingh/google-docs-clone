"use client"

import React from 'react'
import { Id } from '../../convex/_generated/dataModel'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"

import { Button } from './ui/button'
import { Input } from './ui/input'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useState } from 'react'

interface RenameDialogProps { 
    documentId : Id<"documents">
    initialTitle : string
    children : React.ReactNode
}

const RenameDialog = ({documentId, children, initialTitle} : RenameDialogProps) => {

    const update = useMutation(api.documents.updateById)
    const [isUpdating, setIsUpdating] = useState(false)

    const [title, setTitle] = useState(initialTitle)
    const[open, setOpen] = useState(false)

    const onSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsUpdating(true)

        update({id : documentId, title : title.trim() || "Untitled"})
        .then(() => { setOpen(false)} )
        .finally(() => 
            {setIsUpdating(false)
            
            })
     }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent>
            <form onSubmit={onSubmit}>
                <DialogHeader>
                    <DialogTitle>Rename Document</DialogTitle>
                    <DialogDescription>
                        Enter a new name for your document
                    </DialogDescription>
                </DialogHeader>
                <div className='my-4'>
                    <Input defaultValue={initialTitle} onChange={(e) => setTitle(e.target.value)} onClick={(e) => e.stopPropagation()}/>
                </div>
                <DialogFooter>
                    <Button type='button' variant='ghost' onClick={(e) => {
                        e.stopPropagation()
                        setOpen(false)
                         }}>
                        Cancel
                    </Button>
                    <Button type='submit' disabled={isUpdating} onClick={(e) => e.stopPropagation()}>
                        Save
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default RenameDialog
