'use client';
import axios from 'axios';
import { useState } from 'react';

export default function NewList() {

    const [listName, setListName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/lists', {   
                listName,
                description,
            });
            console.log('List created:', response.data);
        } catch (error) {
            console.error('Error creating list:', error);
        }   
    };



    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-4">Create New List</h1>
            {/* Form for creating a new list */}
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700"> 
                        List Name
                    </label>
                    <input
                        type="text" 
                        name="listName"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter list name"
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter list description"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={handleSubmit}
                >
                    Create List
                </button>
            </form>
        </div>
    );
}