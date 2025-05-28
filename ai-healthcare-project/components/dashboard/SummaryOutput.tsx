
import React from 'react';
import { IconProps } from '../../types';

const UserGroupIcon: React.FC<IconProps> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-3.741-5.245M15 15a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3.72a9.094 9.094 0 0 1-3.741-.479 3 3 0 0 1 3.741-5.245M12 12a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-3.75 9.375a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    </svg>
);


interface SummaryOutputProps {
  summary: string;
}

const SummaryOutput: React.FC<SummaryOutputProps> = ({ summary }) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(summary)
      .then(() => {
        alert("Summary copied to clipboard!");
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        alert("Failed to copy summary.");
      });
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-neutral-700 flex items-center">
            <UserGroupIcon className="h-6 w-6 mr-2 text-secondary-DEFAULT"/>
            Patient-Friendly Summary
        </h3>
        <button 
          onClick={handleCopyToClipboard}
          className="text-xs text-secondary-DEFAULT hover:text-secondary-dark font-medium py-1 px-2 rounded hover:bg-secondary-light/10 transition-colors"
          title="Copy to clipboard"
        >
          Copy
        </button>
      </div>
      {summary.startsWith("Error:") ? (
         <div className="bg-red-50 p-4 rounded-md border border-red-200">
            <p className="text-sm text-red-700 whitespace-pre-wrap">{summary}</p>
         </div>
      ) : (
        <div className="bg-teal-50 p-4 rounded-md border border-teal-200 max-h-96 overflow-y-auto">
          <p className="text-sm text-neutral-600 whitespace-pre-wrap">{summary || "No summary generated yet."}</p>
        </div>
      )}
    </div>
  );
};

export default SummaryOutput;
    