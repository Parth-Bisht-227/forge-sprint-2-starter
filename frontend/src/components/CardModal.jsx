import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

function CardModal({ card, onClose, refreshBoard }) {
  const [formData, setFormData] = useState({
    title: card.title,
    description: card.description || '',
    due_date: card.due_date || '',
  });
  const [tags, setTags] = useState(card.tags || []);
  const [members, setMembers] = useState(card.members || []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/cards/${card.id}`, formData);
      onClose();
      refreshBoard();
    } catch (err) {
      alert("Error updating card");
    }
  };

  const syncTags = async (tagIds) => {
    try {
      await axios.post(`${API_BASE_URL}/cards/${card.id}/tags`, { tag_ids: tagIds });
      refreshBoard();
    } catch (err) {
      alert("Error syncing tags");
    }
  };

  const syncMembers = async (memberIds) => {
    try {
      await axios.post(`${API_BASE_URL}/cards/${card.id}/members`, { member_ids: memberIds });
      refreshBoard();
    } catch (err) {
      alert("Error syncing members");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Edit Card</h2>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">Title</label>
            <input 
              className="w-full p-2 border rounded" 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">Description</label>
            <textarea 
              className="w-full p-2 border rounded" 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase">Due Date</label>
            <input 
              type="datetime-local" 
              className="w-full p-2 border rounded" 
              value={formData.due_date} 
              onChange={e => setFormData({...formData, due_date: e.target.value})} 
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tags (IDs)</label>
            <input 
              className="w-full p-2 border rounded" 
              placeholder="1,2,3" 
              onChange={e => syncTags(e.target.value.split(',').map(v => v.trim()).filter(v => v).map(Number))} 
            />
            <p className="text-[10px] text-gray-400 mt-1">Comma separated IDs. Updates instantly.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Members (IDs)</label>
            <input 
              className="w-full p-2 border rounded" 
              placeholder="1,2,3" 
              onChange={e => syncMembers(e.target.value.split(',').map(v => v.trim()).filter(v => v).map(Number))} 
            />
            <p className="text-[10px] text-gray-400 mt-1">Comma separated IDs. Updates instantly.</p>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CardModal;
