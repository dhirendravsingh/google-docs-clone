import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
 documents : defineTable ({
    title: v.string(),
    initialContent: v.optional(v.string()),
    ownerId: v.string(),
    roomId: v.optional(v.string()),
    organizaitonId: v.optional(v.string()),
 })
 //indexes are a way to fetch specific collections of data

 //the index below will fetch all the documents of a user
    .index("by_owner_id", ["ownerId"])

//the index below will fetch all the documents of an organization
    .index("by_organization_id", ["organizaitonId"])

//the index below will search for a specific document 
    .searchIndex("search_title", {
        searchField: "title",
        //this will search in that specific ownerId or organizaitonId
        filterFields: ["ownerId", "organizaitonId"]
    })
});