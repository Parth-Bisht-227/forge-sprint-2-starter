import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BoardList from './BoardList';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

function KanbanBoard({ boardId, onBack }) {
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBoard = async () => {
    setLoading(true);
    try {
      // a la T1.4 corrections: fetch board with nested lists.cards.tags.members
      const res = await axios.get(`${API_BASE_URL}/boards/${boardId}`);
      setBoard(res.data);
    } catch (err) {
      console.error("Failed to fetch board", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [boardId]);

  if (loading) return <div className="text-center p-10">Loading Board...</div>;
  if (!board) return <div className="text-center p-10">Board not found.</div>;

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{board.name}</h1>
        <button 
          onClick={onBack} 
          className="text-blue-500 hover:underline"
        >
          ← Back to Boards
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 items-start">
        {board.lists?.map(list => (
          <BoardList 
            key={list.id} 
            list={list} 
            refreshBoard={fetchBoard} 
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
