import { useState } from 'react';
import { usePermalink } from '../hooks/usePermalink';

interface NameFormProps {
  onPermalinkGenerated: (permalink: string, name: string) => void;
}

export default function NameForm({ onPermalinkGenerated }: NameFormProps) {
  const [name, setName] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [showLink, setShowLink] = useState(false);
  const [permalink, setPermalink] = useState('');
  const { generatePermalink } = usePermalink();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('Please enter a name');
      return;
    }

    const link = generatePermalink(name.trim(), customMessage.trim() || undefined);
    setPermalink(link);
    setShowLink(true);
    // Don't navigate immediately - let user copy the link first
  };

  const handleContinueToCelebration = () => {
    // Navigate to the celebration when user is ready
    onPermalinkGenerated(permalink, name.trim());
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(permalink).then(() => {
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
      alert('Failed to copy link. Please copy it manually.');
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-purple-600">
        Create Birthday Celebration
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Birthday Person's Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter name"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Custom Birthday Message (Optional)
          </label>
          <textarea
            id="message"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Happy Birthday!"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-md font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-md"
        >
          Generate Celebration Link
        </button>
      </form>

      {showLink && (
        <div className="mt-6 p-4 bg-purple-50 rounded-md">
          <p className="text-sm font-medium text-gray-700 mb-2">Your celebration link (valid for 24 hours):</p>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={permalink}
              readOnly
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              Copy
            </button>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Share this link with friends! It will expire in 24 hours.
          </p>
          <button
            onClick={handleContinueToCelebration}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-md font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 text-sm"
          >
            Continue to Celebration
          </button>
        </div>
      )}
    </div>
  );
}

