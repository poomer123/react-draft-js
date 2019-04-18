import React, { useState, useEffect, useRef } from 'react'
import { Editor, EditorState } from 'draft-js'

const App = (props) => {
    const [editorState, setEditorState] = useState( EditorState.createEmpty() )
    const editor = useRef(null)
    
    const style = {
        editor: {
            border: '1px solid gray',
            minHeight: '150px',
            width: '400px'
        }
    }

    function focusEditor() {
        editor.current.focus()
    }
    
    useEffect(() => {
        focusEditor()
    }, [])

    return (
        <div>
            <h1>React with Draft.js</h1>
            <div style={style.editor} onClick={focusEditor}>
                <Editor
                    ref={editor}
                    editorState={editorState}
                    onChange={editorState => setEditorState(editorState)}
                />
            </div>
        </div>
    )
    
}

export default App
