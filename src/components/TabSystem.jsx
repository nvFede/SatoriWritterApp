import React from 'react';
import { Tab } from '@headlessui/react';

const TabSystem = ({ documents, activeDocId, onSelectDocument, onCloseDocument, onNewDocument }) => {
  return (
    <div className="w-full px-2 sm:px-0">
      <Tab.Group selectedIndex={documents.findIndex(doc => doc.id === activeDocId)} onChange={(index) => onSelectDocument(documents[index].id)}>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          {documents.map((doc) => (
            <Tab
              key={doc.id}
              className={({ selected }) =>
                `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
                 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60
                 ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
              }
            >
              {doc.title}
              <button onClick={(e) => { e.stopPropagation(); onCloseDocument(doc.id); }} className="ml-2 text-red-500">&times;</button>
            </Tab>
          ))}
          <button
            onClick={onNewDocument}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            +
          </button>
        </Tab.List>
      </Tab.Group>
    </div>
  );
};

export default TabSystem;
