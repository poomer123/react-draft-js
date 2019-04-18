import React, { useState, useEffect, useRef } from 'react'
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import InlineStyleControls from './InlineStyleControls'
import BlockStyleControls from './BlockStyleControls'

const App = (props) => {
    const [editorState, setEditorState] = useState( EditorState.createEmpty() )
    const editor = useRef(null)

    function focusEditor() {
        editor.current.focus()
    }

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            setEditorState(newState)
            return true
        }
        return false
    }

    function toggleInlineStyle(inlineStyle) {
        setEditorState(
            RichUtils.toggleInlineStyle(editorState, inlineStyle)
        )
    }

    function toggleBlockType(blockType) {
        setEditorState(
            RichUtils.toggleBlockType(editorState, blockType)
        )
    }

    useEffect(() => {
        focusEditor()
    }, [])

    useEffect(() => {
        console.log(convertToRaw(editorState.getCurrentContent()))
    }, [editorState])

    return (
        <div>
            <h1>React with Draft.js</h1>
            <div className="RichEditor-root" onClick={focusEditor}>
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={toggleBlockType}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={toggleInlineStyle}
                />
                <Editor
                    ref={editor}
                    editorState={editorState}
                    onChange={editorState => setEditorState(editorState)}
                    handleKeyCommand={handleKeyCommand}
                />
            </div>
            <hr />
            <div>
                {stateToHTML(editorState.getCurrentContent())}
            </div>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: stateToHTML(editorState.getCurrentContent()) }} />
        </div>
    )
    
}

export default App
