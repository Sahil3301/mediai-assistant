import React, { useState } from 'react';
import MedicalDisclaimer from '../components/common/MedicalDisclaimer';
import FileUpload from '../components/dashboard/FileUpload';
import PatientDataInput from '../components/dashboard/PatientDataInput';
import AnalysisOutput from '../components/dashboard/AnalysisOutput';
import SummaryOutput from '../components/dashboard/SummaryOutput';
import Button from '../components/common/Button';
import { useGemini } from '../hooks/useGemini';

const DashboardPage: React.FC = () => {
  const [patientData, setPatientData] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [useGrounding, setUseGrounding] = useState(false);
  const { generateAnalysis, analysis, summary, isLoading, error } = useGemini();

  const handleAnalysisGeneration = async () => {
    if (!patientData && !file) {
      alert('Please provide patient data or upload a medical scan/report.');
      return;
    }

    await generateAnalysis(patientData, file, useGrounding);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-neutral-800 mb-2">AI Diagnostic Dashboard</h1>
      <p className="text-lg text-neutral-600 mb-6">Upload patient data and get AI-powered insights.</p>
      
      <MedicalDisclaimer />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">1. Upload Medical Scan / Report</h2>
          <p className="text-sm text-neutral-600 mb-2">Supported formats: JPG, PNG, PDF. Max size: 4MB.</p>
          
          <FileUpload 
            onFileSelect={setFile} 
            selectedFile={file}
          />
          
          <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">2. Enter Patient Details</h2>
          <p className="text-sm text-neutral-600 mb-2">Include symptoms, history, or specific questions for the AI.</p>
          
          <PatientDataInput 
            value={patientData}
            onChange={setPatientData}
          />
          
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="useGrounding"
              checked={useGrounding}
              onChange={(e) => setUseGrounding(e.target.checked)}
              className="h-4 w-4 text-primary-DEFAULT focus:ring-primary-DEFAULT border-neutral-300 rounded"
            />
            <label htmlFor="useGrounding" className="ml-2 block text-sm text-neutral-600">
              Enable Google Search Grounding (for up-to-date information, may increase processing time)
            </label>
          </div>
          
          <div className="mt-6">
            <Button
              onClick={handleAnalysisGeneration}
              disabled={isLoading || (!patientData && !file)}
              isLoading={isLoading}
            >
              Generate Analysis
            </Button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-neutral-800 mb-6">AI Analysis Results</h2>
          
          {error ? (
            <div className="bg-red-50 p-4 rounded-md border border-red-200">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          ) : (
            <>
              {analysis && <AnalysisOutput analysis={analysis} />}
              
              {summary && (
                <>
                  <div className="my-6 border-t border-neutral-200"></div>
                  <SummaryOutput summary={summary} />
                </>
              )}
              
              {!analysis && !summary && (
                <div className="flex flex-col items-center justify-center py-12">
                  <svg className="w-16 h-16 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-4 text-neutral-500 text-center">
                    Your analysis results will appear here.<br />
                    Please provide data and click "Generate Analysis".
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
