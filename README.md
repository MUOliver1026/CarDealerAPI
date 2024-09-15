# Car Dealer API and Frontend

This project consists of a Car Dealer API built with ASP.NET Core and a React frontend that allows dealers to manage their car stocks.


## Project Structure

- `backend/`: Contains the ASP.NET Core Web API
- `frontend/`: Contains the React frontend application


## Features

1. Add/remove car
2. List cars and stock levels
3. Update car stock level
4. Search car by make, model

## Technologies Used

### Backend
- ASP.NET Core 6.0
- Entity Framework Core (In-Memory Provider)
- Swagger / OpenAPI
- Docker

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Query

## Running the Application

### Backend

### Without Docker

1. Ensure you have .NET 8.0 SDK installed on your machine.
2. Clone this repository.
3. Navigate to the project directory in your terminal.
4. Run the following command:
```
dotnet run
```
5. Open your browser and go to `http://localhost:5259/swagger` to access the Swagger UI.

### With Docker

1. Ensure you have Docker installed on your machine.
2. Clone this repository.
3. Navigate to the project directory in your terminal.
4. Build the Docker image:
```
docker build -t cardealerapi .
```

5. Run the Docker container:
```
docker run -d -p 8080:8080 -e ASPNETCORE_ENVIRONMENT=Development --name cardealerapi cardealerapi
```

6. Open your browser and go to `http://localhost:8080/swagger` to access the Swagger UI.

## API Endpoints

- GET /api/Cars - List all cars for a dealer
- GET /api/Cars/{id} - Get a specific car
- POST /api/Cars - Add a new car
- PUT /api/Cars/{id} - Update a car
- DELETE /api/Cars/{id} - Remove a car
- GET /api/Cars/search - Search cars by make and model

## Notes

- The backend application uses an in-memory database, so data will be lost when the application is stopped.
- Each dealer has a unique `DealerId` which is used to isolate their data from other dealers.
- The frontend allows you to switch between different dealer IDs to view and manage their respective inventories.


## Docker Image

If you want to pull the pre-built Docker image from Docker Hub, you can use the following command:
```
docker pull oliver1026/cardealerapi:latest
```


## Building from Source

### Backend

1. Navigate to the `backend` directory.
2. Build the Docker image:
```
docker build -t oliver1026/cardealerapi:latest .
```
### Frontend

1. Navigate to the `frontend` directory.
2. Build the production version:
```
npm run build
```
3. The built files will be in the `dist` directory.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/MUOliver1026/CarDealerAPI/blob/main/LICENSE) file for details.