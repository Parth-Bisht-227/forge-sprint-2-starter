import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BoardList from './BoardList';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

function KanbanBoard({ boardId, onBack }) {
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newListName, setNewListName] = useState('');

  const fetchBoard = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/boards/${boardId}`);
      setBoard(res.data);
    } catch (err) {
      console.error("Failed to fetch board", err);
    } finally {
      setLoading(false);
    }
  };

  const createList = async (e) => {
    e.preventDefault();
    if (!newListName) return;
    try {
      await axios.post(`${API_BASE_URL}/boards/${boardId}/lists`, { 
        name: newListName,
        position: board?.lists?.length || 0 
      });
      setNewListName('');
      fetchBoard();
    } catch (err) {
      alert("Error creating list");
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
            allLists={board.lists} 
          />
        ))}
        <form onSubmit={createList} className="w-60 flex flex-col gap-2">
          <input 
            className="p-2 text-sm rounded border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
            value={newListName} 
            onChange={e => setNewListName(e.target.value)} 
            placeholder="+ Add List" 
          />
          <button 
            type="submit" 
            className="text-xs bg-gray-300 p-1 rounded hover:bg-gray-400 text-gray-700 font-medium"
          >
            Add List
          </button>
        </form>
      </div>
    </div>
  );
}

export default KanbanBoard;
