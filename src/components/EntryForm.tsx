import { useState } from 'react';

export default function EntryForm() {
  const [commitMessages, setCommitMessages] = useState('');
  
  // Get current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split('T')[0];
  
  const handlePublish = () => {
    console.log({ date: currentDate, commitMessages });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">New Changelog Entry</h2>
      
      <form className="space-y-4">
        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-500 mb-1">
            Date:
          </label>
          <input
            type="date"
            id="date"
            defaultValue={currentDate}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {/* Commit Messages */}
        <div>
          <label htmlFor="commitMessages" className="block text-sm font-medium text-gray-500 mb-1">
            Commit Messages:
          </label>
          <textarea
            id="commitMessages"
            value={commitMessages}
            onChange={(e) => setCommitMessages(e.target.value)}
            placeholder="Enter your commit messages here..."
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Publish Button */}
        <button
          type="button"
          onClick={handlePublish}
          className="cursor-pointer w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Publish
        </button>
      </form>
    </div>
  );
} 