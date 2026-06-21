import React, { useState } from 'react';
import axios from 'axios';
import Card from './Card';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

function BoardList({ list, refreshBoard, allLists }) {
  const [newCardTitle, setNewCardTitle] = useState('');

  const addCard = async (e) => {
    e.preventDefault();
    if (!newCardTitle) return;
    try {
      await axios.post(`${API_BASE_URL}/lists/${list.id}/cards`, { 
        title: newCardTitle,
        position: list.cards?.length || 0 
      });
      setNewCardTitle('');
      refreshBoard();
    } catch (err) {
      alert("Error adding card");
    }
  };

  const deleteList = async () => {
    if (!confirm("Delete this list and all its cards?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/lists/${list.id}`);
      refreshBoard();
    } catch (err) {
      alert("Error deleting list");
    }
  };

  return (
    <div className="w-80 bg-gray-200 rounded-lg p-3 flex flex-col max-h-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold text-gray-700 uppercase text-sm tracking-wider">{list.name}</h2>
        <button 
          onClick={deleteList} 
          className="text-gray-400 hover:text-red-500 p-1 text-xs"
          title="Delete List"
        >
          ✕
        </button>
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto mb-4">
        {list.cards?.map(card => (
          <Card 
            key={card.id} 
            card={card} 
            refreshBoard={refreshBoard} 
            allLists={allLists}
          />
        ))}
      </div>
      <form onSubmit={addCard} className="mt-auto">
        <input 
          className="w-full p-2 text-sm rounded border-none shadow-sm focus:ring-2 focus:ring-blue-400" 
          value={newCardTitle} 
          onChange={e => setNewCardTitle(e.target.value)} 
          placeholder="+ Add a card" 
        />
      </form>
    </div>
  );
}

export default BoardList;
