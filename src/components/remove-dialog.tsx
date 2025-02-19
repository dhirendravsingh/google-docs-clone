"use client"

import React from 'react'
import { Id } from '../../convex/_generated/dataModel'

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogFooter
} from "@/components/ui/alert-dialog"
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useState } from 'react'

interface RemoveDialogProps { 
    documentId : Id<"documents">
    children : React.ReactNode
}

const RemoveDialog = ({documentId, children} : RemoveDialogProps) => {

    const remove = useMutation(api.documents.removeById)
    const [isRemoving, setIsRemoving] = useState(false)

  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent onClick={(e)=> e.stopPropagation()}>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your document.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={(e) => {
                    e.stopPropagation()
                    setIsRemoving(true)
                    remove({id : documentId})
                        .finally(()=> setIsRemoving(false))
                }}
                 disabled={isRemoving}>
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default RemoveDialog
