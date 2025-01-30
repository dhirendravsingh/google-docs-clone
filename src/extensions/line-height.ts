import {Extension} from "@tiptap/react"

declare module "@tiptap/core" {
    interface Commands<ReturnType>{
        lineHeight: {
            setLineHeight: (lineHeight :string)=> ReturnType
            unsetLineHeight: ()=> ReturnType
        }
    }
}

//here the extension is being created, the name is set for identification
export const LineHeightExtension = Extension.create({
    name : "lineHeight",
    //the function below defines the type of node this extension will be affecting using its commands which are explained further below
    addOptions(){
        return {
            types : ["paragraph", "heading"],
            defaultLineHeight : "normal",
        }
    },
    //this function fixates that the attributed will be affecting the nodes defined in the addOption
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    lineHeight : {
                        default : this.options.defaultLineHeight,
                        //the render html will define how the inline style will be applied
                        renderHTML: attributes =>{
                            if(!attributes.lineHeight) return {}
                            return {
                                style: `line-height: ${attributes.lineHeight}`
                            }
                        },
                        //the parse html will read the inline style defined above so as to set it when the content is being loaded
                        parseHTML: element => {
                            return element.style.lineHeight || this.options.defaultLineHeight
                        }
                    }
                }
            }
        ]
    },

    addCommands(){
        //both the function modify the nodes of the document and checks if each node is of a type that should have the line height attribute
        return {
            setLineHeight : (lineHeight: string)=> ({tr, state, dispatch})=>{
                //destructuring the state
                const {selection} = state;
                tr = tr.setSelection(selection)


                const {from, to} = selection
                state.doc.nodesBetween(from,to, (node,pos)=>{
                    if(this.options.types.includes(node.type.name)){
                        //the tr.setNodeMarkup lets applying the style transactionally that is how the tiptap operates
                        tr = tr.setNodeMarkup(pos, undefined, {
                            ...node.attrs,
                            lineHeight
                        })
                    }
                })
                if(dispatch) dispatch(tr)
                    return true
            },
            unsetLineHeight: ()=>({tr, state, dispatch})=>{
                const {selection} = state;
                tr = tr.setSelection(selection)

                const {from,to} = selection
                state.doc.nodesBetween(from,to, (node,pos)=>{
                    if(this.options.types.includes(node.type.name)){
                        tr = tr.setNodeMarkup(pos, undefined, {
                            ...node.attrs,
                            lineHeight: this.options.defaultLineHeight
                        })
                    }
                })
                if(dispatch) dispatch(tr)
                return true
            }
        }
    }
})