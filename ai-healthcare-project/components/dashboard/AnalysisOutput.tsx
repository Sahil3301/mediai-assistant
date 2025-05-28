
import React from 'react';
import { IconProps } from '../../types';

const ClipboardDocumentCheckIcon: React.FC<IconProps> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25V9H11.25V6H6V4.5H4.5V6H3v1.5h1.5v12H6v-1.5h1.5V18H9v-1.5h1.5V15H12v-1.5h3.75Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 16.5v-1.5a3 3 0 0 0-3-3h-1.5a3 3 0 0 0-3 3V18H3V4.5h16.5V12M6.75 19.5H17.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.04 19.53-1.285-1.285-1.215 1.216 1.285 1.285 1.215-1.216Zm2.708-2.708-1.285-1.285-1.216 1.215 1.285 1.285 1.216-1.215Z" />
    </svg>
);

interface AnalysisOutputProps {
  analysis: string;
}

const AnalysisOutput: React.FC<AnalysisOutputProps> = ({ analysis }) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(analysis)
      .then(() => {
        // Maybe show a temporary "Copied!" message
        alert("Analysis copied to clipboard!");
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        alert("Failed to copy analysis.");
      });
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-neutral-700 flex items-center">
          <ClipboardDocumentCheckIcon className="h-6 w-6 mr-2 text-primary-DEFAULT"/>
          For Medical Professionals
        </h3>
        <button 
          onClick={handleCopyToClipboard}
          className="text-xs text-primary-DEFAULT hover:text-primary-dark font-medium py-1 px-2 rounded hover:bg-primary-light/10 transition-colors"
          title="Copy to clipboard"
        >
          Copy
        </button>
      </div>
      {analysis.startsWith("Error:") ? (
         <div className="bg-red-50 p-4 rounded-md border border-red-200">
            <p className="text-sm text-red-700 whitespace-pre-wrap">{analysis}</p>
         </div>
      ) : (
        <div className="bg-sky-50 p-4 rounded-md border border-sky-200 max-h-96 overflow-y-auto">
          <p className="text-sm text-neutral-600 whitespace-pre-wrap">{analysis || "No analysis generated yet."}</p>
        </div>
      )}
    </div>
  );
};

export default AnalysisOutput;
    