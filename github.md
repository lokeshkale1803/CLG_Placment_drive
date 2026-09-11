## GitHub Repository Setup and Project Upload

After completing the initial FastAPI backend setup, the project was connected to GitHub for version control and source-code management.

### 1. GitHub Repository Creation

A new GitHub repository was created with the name:

**CLG_Placment_drive**

Repository:

`https://github.com/lokeshkale1803/CLG_Placment_drive`

The repository was created to store the complete College Placement Drive project, including the backend and frontend files.

### 2. Navigate to the Project Folder

The terminal was opened inside the main project directory:

```bash
cd "/Users/tejaskale/Library/Application Support/Steam/Steam.AppBundle/Steam/Contents/Clg driver placment project"
```

The project structure was:

```text
Clg driver placment project/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   └── .env
│
├── frontend/
│
├── .gitignore
└── README.md
```

### 3. Initialize Git

Initially, the project folder was not a Git repository.

Git was initialized using:

```bash
git init
```

After this command, Git started tracking the project directory.

### 4. Create `.gitignore`

A `.gitignore` file was added to prevent confidential and unnecessary files from being uploaded to GitHub.

```text
.env
.venv/
__pycache__/
*.pyc
.DS_Store
```

The `.env` file was excluded because it contains sensitive information such as Supabase credentials.

### 5. Add Project Files

All project files were added to Git staging using:

```bash
git add .
```

The project status was checked using:

```bash
git status
```

This helped verify which files were ready to be committed.

### 6. Create the First Local Commit

The project files were committed using:

```bash
git commit -m "Initial placement portal project"
```

This created the first local Git version of the College Placement Drive project.

### 7. Set the Main Branch

The Git branch was renamed to `main` using:

```bash
git branch -M main
```

### 8. Connect Local Project to GitHub

The GitHub repository was connected with the local project using:

```bash
git remote add origin https://github.com/lokeshkale1803/CLG_Placment_drive.git
```

The remote connection was verified using:

```bash
git remote -v
```

### 9. Push Project to GitHub

The project was then pushed using:

```bash
git push -u origin main
```

During the first push, Git reported that the GitHub repository already contained a commit. This happened because a README file had already been created in the GitHub repository.

### 10. Synchronize Local and Remote Repository

The GitHub repository and local project had separate Git histories.

To combine them, the following command was used:

```bash
git pull origin main --allow-unrelated-histories --no-rebase
```

This allowed the existing GitHub commit and the local project commits to be merged.

After resolving the merge, the changes can be committed using:

```bash
git add .
git commit -m "Merge GitHub repo with local project"
```

Finally, the project can be uploaded using:

```bash
git push -u origin main
```

### 11. Future GitHub Updates

Whenever new functionality is added to the project, the following Git workflow will be followed:

```bash
git add .
git commit -m "Description of changes"
git push
```

For example:

```bash
git add .
git commit -m "Add placement portal frontend"
git push
```

This allows each development stage of the project to be recorded and maintained on GitHub.

## Final GitHub Workflow

```text
Create GitHub Repository
        ↓
git init
        ↓
Create .gitignore
        ↓
git add .
        ↓
git commit
        ↓
Connect GitHub Remote
        ↓
git pull / merge remote history
        ↓
git push
        ↓
Continue development with regular commits
```

GitHub is therefore used in the College Placement Drive project for **version control, source-code backup, development history, and future deployment integration**.
