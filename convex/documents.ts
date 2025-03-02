import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import {v} from "convex/values"

//this is the post method that will be called when the user hits the /documents endpoint
//whenver we creating a new document we will have to pass the arguments along with a handler function
export const create = mutation({
  args : {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  //in the handler we can destructure the arguments
  handler : async(ctx, args)=>{
    //first we have to check if the user is authenticated
    const user = await ctx.auth.getUserIdentity()

    if(!user){
      throw new Error("User not authenticated")
    }

    //now creating the document
    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document",
      ownerId: user.subject,
      initialContent: args.initialContent 
    })
  }
})


//this is the get method that will be called when the user hits the /documents endpoint
export const get = query({
  args : {paginationOpts: paginationOptsValidator, search : v.optional(v.string())},
  handler: async (ctx, {paginationOpts, search}) => {

    //protecting this route from unauthenticated users
    const user = await ctx.auth.getUserIdentity()
    if(!user){
      throw new Error("Unauthorized")
    }

    //when searching the document
    if(search){
      return await ctx.db.query("documents")
      .withSearchIndex("search_title" , (q)=>q.search("title", search).eq("ownerId", user.subject))
      .paginate(paginationOpts)
    }
    return await ctx.db
    .query("documents")
    .withIndex("by_owner_id", (q)=> q.eq("ownerId", user.subject))
    .paginate(paginationOpts);
    // do something with `tasks`
  },
});

//functionality to remove a document
export const removeById = mutation({
  args :  {id : v.id("documents")},
  //the handler function will be called when the user hits the /documents/:id endpoint
  handler : async (ctx, args) => { 
    //first we have to check if the user is authenticated
    const user = await ctx.auth.getUserIdentity()

    if(!user){
      throw new Error("User not authenticated")
    }
  
  //now fetching the document from the database
  const document = await ctx.db.get(args.id)

  if(!document){
    throw new Error("Document not found")
  }
  
//now we will check if the user is the owner of the document
  const isOwner = document.ownerId === user.subject

  if(!isOwner){
    throw new Error("Unauthorized")
  }

  //now we will remove the document from the database
  return await ctx.db.delete(args.id)
  
}
})

//functionality to update a document
export const updateById = mutation({
  args :  {id : v.id("documents"), title: v.optional(v.string())},
  //the handler function will be called when the user hits the /documents/:id endpoint
  handler : async (ctx, args) => { 
    //first we have to check if the user is authenticated
    const user = await ctx.auth.getUserIdentity()

    if(!user){
      throw new Error("User not authenticated")
    }
  
  //now fetching the document from the database
  const document = await ctx.db.get(args.id)

  if(!document){
    throw new Error("Document not found")
  }
  
//now we will check if the user is the owner of the document
  const isOwner = document.ownerId === user.subject

  if(!isOwner){
    throw new Error("Unauthorized")
  }

  //now we will update the document
  return await ctx.db.patch(args.id, {title: args.title})
  
}
})
