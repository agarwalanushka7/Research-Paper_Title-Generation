# Research-Paper_Title-Generation
Upload the extract of your research paper and it generate the most suitable title for the paper.
An intelligent research paper title generation application that generates relevant, meaningful, and academically appropriate titles from research paper extracts.

## Overview

Choosing an appropriate title is an important part of academic research. This application simplifies the process by allowing users to submit an extract of their research paper and automatically generate a suitable title based on its content.

The application integrates the Groq API to analyze research content and generate contextually relevant title suggestions.

## Features

- **Automated Title Generation:** Generate suitable research titles from submitted text.
- **Contextual Analysis:** Identify the central theme and key ideas of research content.
- **Simple User Interface:** Easy-to-use interface for submitting research extracts.
- **Language Model Integration:** Uses Groq API for intelligent text processing.
- **Fast Processing:** Generate title suggestions without manually brainstorming titles.

## Technology Stack

| Component | Technology |
|---|---|
| Backend | Python |
| Frontend | HTML, JavaScript |
| LLM API | Groq API |
| Dependencies | Python |
| Configuration | Environment Variables |

## Project Structure

```text
Research-Paper-Title-Generation/
│
├── backend/
│   ├── generator.py
│   └── main.py
│
├── frontend/
│   ├── index.html
│   └── script.js
│
├── requirements.txt
├── .gitignore
├── README.md
└── LICENSE
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/agarwalanushka7/Research-Paper_Title-Generation.git
```

### 2. Navigate to the Project

```bash
cd Research-Paper_Title-Generation
```

### 3. Create a Virtual Environment

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure Environment Variables

Create a `.env` file in the root directory:

```env
GROQ_API_KEY=your_groq_api_key
```

Get your API key from the [Groq Console](https://console.groq.com/keys).

**Security Note:** Never commit your `.env` file or expose API credentials publicly.

### 6. Run the Application

Start the backend using the appropriate command configured in `backend/main.py`.

Open the frontend using the local serving method configured for the application.

## How It Works

1. The user submits an extract of a research paper.
2. The backend receives and processes the submitted content.
3. The Groq API analyzes the research context.
4. Relevant title suggestions are generated.
5. The generated title is presented to the user.

## Future Enhancements

- Generate multiple title suggestions.
- Support PDF and DOCX uploads.
- Add domain-specific title generation.
- Introduce multilingual support.
- Add title relevance scoring.
- Allow customization of academic writing styles.

## License

This project is licensed under the MIT License.

## Author

**Anushka Agarwal**
