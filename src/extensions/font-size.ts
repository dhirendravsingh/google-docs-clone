import {Extension} from "@tiptap/react"
import "@tiptap/extension-text-style"

//WORKING
// How It Works:
// Extension Definition: Creates a new extension named "fontSize"
// Options: Configures it to work with textStyle marks
// Global Attributes:
// Adds fontSize attribute support
// Handles parsing from HTML and rendering to HTML
// Commands:
// setFontSize: Sets the font size on selected text
// unsetFontSize: Removes the font size styling

//here commands are being added to the commands interface which tells the tiptap of the available commands it can use
declare module "@tiptap/core" {
    interface Commands<ReturnType>{
        fontSize: {
            setFontSize: (size:string)=> ReturnType
            unsetFontSize: ()=> ReturnType
        }
    }
}

export const FontSizeExtension = Extension.create({
    //the name is set for identification
    name: "fontSize",
    //the return of the addOptions defined that this extension will be affecting the textStyle of the editor
    addOptions(){
        return {
            types : ["textStyle"]
        }
    },
    //this function below defines how the fontSize attribute is handled
    addGlobalAttributes(){
        return [
            {
                // this specifies below that the fontSize is applied to the textStyle types
                types : this.options.types,
                attributes : {
                    fontSize : {
                        default : null,
                        // this parse html extracts the fontSize from the elements style
                        parseHTML: element => element.style.fontSize,
                        //the render function adds the style attribute while rendering
                        renderHTML: attributes=>{
                            if(!attributes.fontSize){
                                return {}
                            }

                            return {
                                style: `font-size: ${attributes.fontSize}`
                            }
                        }
                    }
                }
            }
        ]
    },
    addCommands(){
        return{
            // here a function is passed inside another function which will take fontSize as an input which can be fed in the chain
            setFontSize: (fontSize : string)=> ({chain})=>{
                return chain().setMark("textStyle", {fontSize}).run()
            },
            unsetFontSize: ()=> ({chain})=> {
                return chain().setMark("textStyle", {fontSize: null}).removeEmptyTextStyle().run()
            },
        }
    }
})