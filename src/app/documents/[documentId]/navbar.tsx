import Image from "next/image"
import Link from "next/link"
import { DocumentInput } from "./document-input"
import {
    Menubar,
    MenubarItem,
    MenubarSeparator,
    MenubarContent,
    MenubarTrigger,
    MenubarSubTrigger,
    MenubarShortcut,
    MenubarSubContent,
    MenubarSub,
    MenubarMenu
    

} from "@/components/ui/menubar"
import { FileIcon } from "lucide-react"


export const Navbar =()=>{
    return (
        <nav className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <Link href="/">
                    <Image alt="Logo" src="/logo.svg" width={36} height={36}/>
                </Link>
                <div className="flex flex-col">
                    <DocumentInput/>
                    <div className="flex">
                        <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                            <MenubarMenu>
                                <MenubarTrigger>
                                    File
                                </MenubarTrigger>
                                    <MenubarContent>
                                        <MenubarItem>
                                            <FileIcon className="size-4 mr-2" />
                                            Save
                                        </MenubarItem>
                                    </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                </div>
            </div>
            
        </nav>
    )
}