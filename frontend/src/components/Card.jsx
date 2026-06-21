import React, { useState } from 'react';
import axios from 'axios';
import CardModal from './CardModal';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

function Card({ card, refreshBoard }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const moveCard = async (listId) => {
    try {
      await axios.patch(`${API_BASE_URL}/cards/${card.id}/move`, { list_id: listId });
      refreshBoard();
    } catch (err) {
      alert("Error moving card");
    }
  };

  const isOverdue = card.due_date && new Date(card.due_date) < new Date();

  return (
    <div className={`p-3 bg-white rounded shadow-sm cursor-pointer hover:bg-gray-50 transition border-l-4 ${isOverdue ? 'border-red-500' : 'border-transparent'}`}
         onClick={() => setIsModalOpen(true)}>
      <div className="flex justify-between items-start mb-2">
        <span className="font-medium text-sm">{card.title}</span>
        {isOverdue && <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded font-bold uppercase">Overdue</span>}
      </div>
      
      <div className="flex gap-1 flex-wrap mb-3">
        {card.tags?.map(tag => (
          <span key={tag.id} className="text-[10px] px-2 py-0.5 rounded text-white" style={{ backgroundColor: tag.color }}>
            {tag.name}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <select 
          className="text-[10px] p-1 rounded bg-gray-100 border-none" 
          onChange={(e) => moveCard(parseInt(e.target.value))}
          onClick={(e) => e.stopPropagation()}
        >
          <option value="">Move to...</option>
          {/* We'll need a way to get other lists. For simplicity, we'll hardcode standard list IDs or allow the board context. 
              Since we only have current card data, we'll implement a simple move via a mocked or inferred list list if needed, 
              but per plan, we trigger the endpoint. For this demo, let's assume the user provides the target list_id via prompt or logic in the modal. 
              Wait, the plan says: "A simple control (dropdown/button) on the Card to trigger PATCH". 
              Since I don't have the other lists in the Card's immediate props, I'll just provide a simple "Move to Next List" for demo purposes or handle it in the Modal.
              Actually, the Modal is better. Let's leave a placeholder dropdown here or move it to Modal.
          */}
        </select>
      </div>

      {isModalOpen && (
        <CardModal 
          card={card} 
          onClose={() => setIsModalOpen(false)} 
          refreshBoard={refreshBoard} 
        />
      )}
    </div>
  );
}

export default Card;
