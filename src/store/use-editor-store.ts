import {create} from "zustand"
import {type Editor} from "@tiptap/react"

interface EditorState {
    editor : Editor | null;
    setEditor : (editor : Editor | null) => void;
}
//the initial state of the editor passed here is null, and upon calling setEditor we can set the value of the editor component in the store
export const useEditorStore = create<EditorState>((set)=>({
    editor : null,
    setEditor : (editor) => set({editor})
}))