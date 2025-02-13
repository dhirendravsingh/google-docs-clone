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
  args : {paginationOpts: paginationOptsValidator},
  handler: async (ctx,args) => {
    return await ctx.db.query("documents").paginate(args.paginationOpts);
    // do something with `tasks`
  },
});