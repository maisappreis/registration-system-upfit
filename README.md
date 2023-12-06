# Customer registration system

## Project to register clients and control monthly payment of a functional training academy

![image](https://user-images.githubusercontent.com/113925909/230952733-3c007b6e-9e1d-44c6-ba10-0f9a0679983f.png)

# Front-end

## 🛠️ Installation

In the project directory `/front-end`, install the dependencies:
```
npm install
```

## 🌱 On Development

In the project directory `/front-end`, you can run:
```
npm start
```

- It runs the app in the development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- The page will reload when you make changes.
- You may also see any lint errors in the console.

```
npm test
```

- Launches the test runner in the interactive watch mode.
- See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


## 💻 On Production

In the project directory, you can run:
```
npm run build
```

- Builds the app for production to the `build` folder.
- It correctly bundles React in production mode and optimizes the build for the best performance.
- The build is minified and the filenames include the hashes.
- Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


# Back-end

## 🛠️ Installation

In the project directory `/back-end`:

1 - Create your `.env` file with your `SECRET_KEY`

2 - Create a virtual environment:
```
python -m venv .upfit
```

3 - Activate the Virtual Environment:

- on Mac (bash/zsh)
```
source .upfit/bin/activate
```

- on Windows (PowerShell)
```
.upfit\Scripts\Activate.ps1
```

4 - Install the dependencies:
```
pip install -r requirements.txt
```

## 🌱 On Development

In the project directory `/back-end`:

1 - Activate the Virtual Environment:

- On Mac (bash/zsh)
```
source .upfit/bin/activate
```

- On Windows (PowerShell)
```
.upfit\Scripts\Activate.ps1
```

2 - Run in the development mode:
```
python manage.py runserver
```

- It runs the app in the development mode.
- Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/)


## 🌱 Run Migrations

1. To create initial migrations:
```
python manage.py makemigrations
```

2. To apply migrations:
```
python manage.py migrate
```

3. To create and apply migrations for a specific app:
```
python manage.py makemigrations your_app_name
python manage.py migrate your_app_name
```

4. To check the status of migrations:
```
python manage.py showmigrations
```

5. To undo the last migration:
```
python manage.py migrate your_app_name <migration_name>
```