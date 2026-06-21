import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BoardSelector from './components/BoardSelector';
import KanbanBoard from './components/KanbanBoard';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

function App() {
  const [view, setView] = useState('selector'); // 'selector' | 'board'
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  const handleSelectBoard = (id) => {
    setSelectedBoardId(id);
    setView('board');
  };

  const handleBackToSelector = () => {
    setSelectedBoardId(null);
    setView('selector');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4">
      {view === 'selector' ? (
        <BoardSelector onSelectBoard={handleSelectBoard} />
      ) : (
        <KanbanBoard 
          boardId={selectedBoardId} 
          onBack={handleBackToSelector} 
        />
      )}
    </div>
  );
}

export default App;
