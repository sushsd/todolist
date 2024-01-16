:: start the backend
cd api
venv\Scripts\activate
start cmd /k "flask run"

:: start the frontend
cd ../frontend
start cmd /k "npm run start"
