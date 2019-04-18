import React, { useState, useEffect, useRef } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'

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

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            setEditorState(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    const onBoldClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
    }

    const onUnderlineClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
    }
    
    useEffect(() => {
        focusEditor()
    }, [])

    return (
        <div className="editorContainer">
            <h1>React with Draft.js</h1>
            <div className="editors" style={style.editor} onClick={focusEditor}>
                <button onClick={onBoldClick}><b>B</b></button>
                <button onClick={onUnderlineClick}><b>U</b></button>
                <Editor
                    ref={editor}
                    editorState={editorState}
                    onChange={editorState => setEditorState(editorState)}
                    handleKeyCommand={handleKeyCommand}
                />
            </div>
        </div>
    )
    
}

export default App
