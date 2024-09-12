import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';

import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const Editor = () => {
  const editorRef = useRef(null); // Create a ref to store the CodeMirror instance

  useEffect(() => {
    if (!editorRef.current) {
      // Initialize CodeMirror only if not already initialized
      editorRef.current = Codemirror.fromTextArea(document.getElementById('realtimeEditor'), {
        mode: { name: 'javascript', json: true },
        theme: 'dracula',
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      });
    }

    return () => {
      // Cleanup function to destroy the CodeMirror instance on component unmount
      if (editorRef.current) {
        editorRef.current.toTextArea(); // Destroys the CodeMirror instance and reverts to the textarea
        editorRef.current = null; // Reset the reference
      }
    };
  }, []);

  return <textarea id='realtimeEditor'></textarea>;
};

export default Editor;
