# Changelog Generator

https://www.loom.com/share/02c3f416c85f4bbda5d7c8d7d6633ead?sid=3dd540c9-4a91-49a3-9d0e-d761e0256220

## Features

-   🤖 **AI-Powered Generation**: Uses OpenAI GPT-3.5rbo to convert raw commit messages into polished changelog entries
-   📝 **Smart Summarization**: Automatically adds a title and summary to the changelog entry
-   📊 **Categorized Changes**: Automatically tags changes as fix, feature, or refactor
-   💾 **Persistent Storage**: Saves changelog entries to local JSON file

## Getting Started

### Prerequisites

-   Node.js18
-   npm, yarn, pnpm, or bun
-   OpenAI API key

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd changelog-generator
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **Set up environment variables**

    Create a `.env.local` file in the root directory:

    ```bash
    OPENAI_API_KEY=your_openai_api_key_here
    ```

    To get an OpenAI API key:

    - Visit [OpenAI Platform](https://platform.openai.com/)
    - Sign up or log in
    - Navigate to API Keys section
    - Create a new API key
    - Copy the key and paste it in your `.env.local` file

4. **Run the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

5. **Open your browser**

    Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Routes

### Main Pages

-   **`/`** - Home page with the changelog entry generation form
-   **`/changelog`** - View all generated changelog entries

### API Endpoints

-   **`POST /api/generate-changelog`** - Generate ai powered changelog from commit messages
-   **`POST /api/save-changelog`** - Save a changelog entry to a json file
-   **`GET /api/get-changelog`** - Retrieve all changelog entries saved in file

## Usage

1. **Generate Changelog**:

    - Go to the home page
    - Paste your commit messages in the text area
    - Click "Generate Changelog"
    - Review the AI-generated summary and points

2. **Publish Changelog**:

    - Select a date for the entry
    - Click "Publish" to save the changelog entry

3. **View Changelog**:

    - Navigate to `/changelog` to see all published entries
    - Entries are sorted by date (newest first)

## Data Storage

Changelog entries are stored in `data/changelog.json`

Used cursor for development
