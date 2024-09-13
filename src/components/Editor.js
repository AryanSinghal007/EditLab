import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';

const Editor = ({ socketRef, roomId }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    // Initialize CodeMirror
    editorRef.current = Codemirror.fromTextArea(
      document.getElementById('realtimeEditor'),
      {
        mode: { name: 'javascript', json: true },
        theme: 'dracula',
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      }
    );

    // Handle editor changes
    const handleChange = (instance, changes) => {
      const { origin } = changes;
      const code = instance.getValue();
      // onCodeChange(code);

      if (origin !== 'setValue') {
        if (socketRef.current) {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        } else {
          console.error('Socket reference is not defined');
        }
      }
    };

    editorRef.current.on('change', handleChange);

    // Handle incoming code changes
    const handleCodeChange = ({ code }) => {
      if (editorRef.current && code !== null) {
        editorRef.current.setValue(code);
      } else {
        console.error('Editor reference is not defined or code is null');
      }
    };

    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, handleCodeChange);
    } else {
      console.error('Socket reference is not defined');
    }

    // Cleanup on component unmount
    return () => {
      if (editorRef.current) {
        editorRef.current.toTextArea(); // Destroy the CodeMirror instance
        editorRef.current = null; // Reset the reference
      }
      if (socketRef.current) {
        socketRef.current.off(ACTIONS.CODE_CHANGE, handleCodeChange);
      }
    };
  }, [socketRef, roomId]); // Ensure the effect runs when socketRef or roomId changes

  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
