import { Button } from '@/components/ui/button'
import { MoreVertical, ExternalLinkIcon, TrashIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { Id } from '../../../convex/_generated/dataModel'
import RemoveDialog from '@/components/remove-dialog'

interface DocumentMenuProps {  
  documentId : Id<"documents">
  title : string
  onNewTab : (id : Id<"documents">) => void
}

const DocumentMenu = ({documentId, title, onNewTab} : DocumentMenuProps) => {
  return (
    <DropdownMenu>
      {/* dropdown menu trigger is a button component and has been given as child attribute as it contains the button element inside it, which may cause hydration error, button inside a button is not allowed */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className='rounded-full' size="icon">
          <MoreVertical className='size-4'/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem onClick={(e) => e.stopPropagation()} onSelect={(e) => e.preventDefault()}>
            <TrashIcon className='size-4 mr-2'/>
              Remove
          </DropdownMenuItem>
        </RemoveDialog>
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLinkIcon className='size-4 mr-2'/>
          Open in a new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    
  )
}

export default DocumentMenu
