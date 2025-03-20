import { auth } from "@clerk/nextjs/server"
import Document from "./document"
import { Id } from "../../../../convex/_generated/dataModel"
import { usePreloadedQuery } from "convex/react"
import {preloadQuery} from "convex/nextjs"
import { api } from "../../../../convex/_generated/api"

interface documentIdProps {
  params : Promise<{documentId : Id<"documents">}>
}

const documentId = async ({params} : documentIdProps) => {
    const {documentId} = await params
    const {getToken} = await auth()
    const token = await getToken({template : "convex"}) ?? undefined

    const preloadedDocument = await preloadQuery(
      api.documents.getById,
      {id : documentId},
      {token}
    )

  return (
   
   <Document preloadedDocument={preloadedDocument}/>
   
  )
}

export default documentId