# MediAI Assistant

An AI-powered healthcare diagnostic assistant that helps medical professionals analyze patient data and provides insights.

## Phase 1 Features

- AI-powered analysis of medical scans and reports
- Doctor-focused comprehensive reports
- Patient-friendly summaries
- Medical disclaimer about AI limitations
- Donation support with QR code
- Contact/feedback section

## Project Structure

```
mediai-assistant/
├── components/
│   ├── common/
│   │   ├── AnimatedSection.tsx
│   │   ├── Button.tsx
│   │   ├── ContactSection.tsx
│   │   ├── DonationBox.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── MedicalDisclaimer.tsx
│   └── dashboard/
│       ├── AnalysisOutput.tsx
│       ├── FileUpload.tsx
│       ├── PatientDataInput.tsx
│       └── SummaryOutput.tsx
├── hooks/
│   ├── useAuth.ts
│   └── useGemini.ts
├── public/
│   └── images/
│       └── donation-qr.png
├── App.tsx
├── constants.ts
├── index.html
├── index.tsx
└── package.json
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Build for production: `npm run build`

---

## Streamlit Application (Python)

This project also includes a Python-based version of the MediAI Assistant built with Streamlit. This version connects to the Google Gemini API for real-time AI analysis.

### Prerequisites

- Python 3.7+
- Pip (Python package installer)
- Access to Google Gemini API and a valid API key.

### Setup and Running the Streamlit App

1.  **Clone the Repository (if you haven't already):**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Navigate to the Streamlit App Directory:**
    It's recommended to run the Streamlit app from the root of the project directory to ensure paths to assets are resolved correctly. The application itself is in the `streamlit_mediai_app` folder.

3.  **Create a Python Virtual Environment (Recommended):**
    Open your terminal in the project's root directory and run:
    ```bash
    python -m venv .venv
    ```
    Activate the virtual environment:
    - On Windows:
      ```bash
      .venv\Scripts\activate
      ```
    - On macOS and Linux:
      ```bash
      source .venv/bin/activate
      ```

4.  **Set Up Your Gemini API Key:**
    You need to set your Gemini API key as an environment variable named `GEMINI_API_KEY`.
    - On macOS and Linux:
      ```bash
      export GEMINI_API_KEY="YOUR_API_KEY_HERE"
      ```
    - On Windows (Command Prompt):
      ```bash
      set GEMINI_API_KEY="YOUR_API_KEY_HERE"
      ```
    - On Windows (PowerShell):
      ```bash
      $env:GEMINI_API_KEY="YOUR_API_KEY_HERE"
      ```
    **Important:** Replace `"YOUR_API_KEY_HERE"` with your actual Gemini API key. Do not commit your API key to the repository. Add `.venv` to your `.gitignore` file if it's not already there.

5.  **Install Dependencies:**
    Install the required Python packages using the `requirements.txt` file located within the `streamlit_mediai_app` directory:
    ```bash
    pip install -r streamlit_mediai_app/requirements.txt
    ```

6.  **Run the Streamlit Application:**
    From the project's root directory, run:
    ```bash
    streamlit run streamlit_mediai_app/app.py
    ```
    The application should open in your web browser automatically. If not, the terminal will provide a URL (usually `http://localhost:8501`).

### Features (Streamlit Version)
-   Direct interaction with Google Gemini API for analysis.
-   Text-based patient data input.
-   (File/image upload is present in UI but not yet fully wired to Gemini Vision model in this iteration).
-   Displays doctor-focused analysis and patient-friendly summaries.
-   Includes a medical disclaimer, contact information, and a donation QR code.

## Phase 1 Completed Tasks

- Added comprehensive medical disclaimer about AI limitations
- Fixed Generate Analysis button hover styling
- Adjusted QR code aspect ratio and size for better scannability
- Added contact/feedback section with provided contact information
- Polished UI and performed end-to-end review

## Next Steps (Phase 2)

- Implement user authentication
- Add patient data storage and history
- Enhance AI analysis with more specialized models
- Implement export functionality for reports
