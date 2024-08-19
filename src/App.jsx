import React, { useState, useCallback } from 'react';
import TabSystem from './components/TabSystem';
import SatoriEditor from './components/SatoriEditor';
import WritingStats from './components/WritingStats';
import useAutoSave from './hooks/useAutoSave';
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts';

const App = () => {
  const [documents, setDocuments] = useState([{ id: 'default', title: 'Untitled', content: '' }]);
  const [activeDocId, setActiveDocId] = useState('default');

  const activeDoc = documents.find(doc => doc.id === activeDocId);

  const handleContentChange = useCallback((content) => {
    setDocuments(docs => docs.map(doc => 
      doc.id === activeDocId ? { ...doc, content } : doc
    ));
  }, [activeDocId]);

  const handleSave = useCallback(async () => {
    if (activeDoc) {
      const filePath = await window.electronAPI.saveFile(activeDoc.content, activeDoc.filePath);
      if (filePath) {
        setDocuments(docs => docs.map(doc => 
          doc.id === activeDocId ? { ...doc, filePath, title: filePath.split('/').pop() } : doc
        ));
      }
    }
  }, [activeDoc, activeDocId]);

  useAutoSave(activeDoc?.content, handleSave);

  const handleNewDocument = useCallback(() => {
    const newDoc = { id: Date.now().toString(), title: 'Untitled', content: '' };
    setDocuments(docs => [...docs, newDoc]);
    setActiveDocId(newDoc.id);
  }, []);

  const handleCloseDocument = useCallback((docId) => {
    setDocuments(docs => docs.filter(doc => doc.id !== docId));
    if (activeDocId === docId) {
      setActiveDocId(documents[0].id);
    }
  }, [activeDocId, documents]);

  const shortcuts = {
    'Ctrl+S': handleSave,
    'Ctrl+N': handleNewDocument,
  };

  useKeyboardShortcuts(shortcuts);

  return (
    <div className="h-screen flex flex-col">
      <TabSystem 
        documents={documents}
        activeDocId={activeDocId}
        onSelectDocument={setActiveDocId}
        onCloseDocument={handleCloseDocument}
        onNewDocument={handleNewDocument}
      />
      <div className="flex-grow flex">
        <SatoriEditor 
          content={activeDoc?.content || ''}
          onChange={handleContentChange}
        />
        <WritingStats content={activeDoc?.content || ''} />
      </div>
    </div>
  );
};

export default App;
