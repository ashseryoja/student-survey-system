# Student Survey and Feedback System

A modern, minimalistic web application built with React.js and C# ASP.NET Core for managing student surveys and feedback collection.

## Features

- **Beautiful UI**: Clean, minimalistic design with white and blue color scheme
- **Survey Management**: Create, edit, and manage surveys with different question types
- **Multiple Question Types**: 
  - Single choice
  - Multiple choice
  - Text input
  - Rating scale (1-5)
  - Checkbox (multiple selections)
- **Real-time Results**: View survey results with interactive charts and statistics
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **RESTful API**: Clean API endpoints for all operations

## Technology Stack

### Frontend
- React 18
- React Router DOM
- Lucide React (icons)
- Axios (HTTP client)
- CSS3 (custom styling)

### Backend
- C# ASP.NET Core 8.0
- Entity Framework Core
- SQL Server LocalDB
- Swagger/OpenAPI

## Project Structure

```
StudentSurveySystem/
├── src/                          # React frontend
│   ├── components/               # Reusable components
│   │   ├── Header.js
│   │   └── Header.css
│   ├── pages/                    # Page components
│   │   ├── Dashboard.js
│   │   ├── Dashboard.css
│   │   ├── SurveyList.js
│   │   ├── SurveyList.css
│   │   ├── SurveyForm.js
│   │   ├── SurveyForm.css
│   │   ├── CreateSurvey.js
│   │   ├── CreateSurvey.css
│   │   ├── SurveyResults.js
│   │   └── SurveyResults.css
│   ├── App.js                    # Main app component
│   ├── App.css
│   ├── index.js                  # Entry point
│   └── index.css                 # Global styles
├── Controllers/                  # API controllers
│   └── SurveysController.cs
├── Models/                       # Data models
│   ├── Survey.cs
│   ├── Question.cs
│   ├── Response.cs
│   └── Answer.cs
├── DTOs/                         # Data transfer objects
│   └── SurveyDto.cs
├── Services/                     # Business logic
│   ├── ISurveyService.cs
│   └── SurveyService.cs
├── Data/                         # Database context
│   └── ApplicationDbContext.cs
├── Program.cs                    # Application entry point
├── appsettings.json             # Configuration
└── StudentSurveySystem.csproj   # Project file
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- .NET 8.0 SDK
- SQL Server LocalDB (comes with Visual Studio)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd StudentSurveySystem
   ```

2. **Install React dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   dotnet ef database update
   ```

4. **Start the backend**
   ```bash
   dotnet run
   ```
   The API will be available at `https://localhost:7000` (or the port shown in the console)

5. **Start the frontend** (in a new terminal)
   ```bash
   npm start
   ```
   The React app will be available at `http://localhost:3000`

## API Endpoints

### Surveys
- `GET /api/surveys` - Get all surveys
- `GET /api/surveys/active` - Get active surveys
- `GET /api/surveys/{id}` - Get survey by ID
- `POST /api/surveys` - Create new survey
- `PUT /api/surveys/{id}` - Update survey
- `DELETE /api/surveys/{id}` - Delete survey

### Responses
- `POST /api/surveys/responses` - Submit survey response
- `GET /api/surveys/{id}/results` - Get survey results

## Usage

1. **Dashboard**: View survey statistics and recent surveys
2. **Create Survey**: Design surveys with different question types
3. **Take Survey**: Students can participate in active surveys
4. **View Results**: Analyze survey responses with visual charts

## Features in Detail

### Question Types

1. **Single Choice**: Radio buttons for one selection
2. **Multiple Choice**: Radio buttons (same as single choice in UI)
3. **Text Input**: Free text response with optional placeholder
4. **Rating Scale**: Numeric rating from min to max value
5. **Checkbox**: Multiple selections allowed

### Survey Management

- Create surveys with multiple questions
- Set question order and requirements
- Configure question-specific options
- Set survey end dates
- Categorize surveys (Academic, Services, etc.)

### Results Analysis

- Visual charts for different question types
- Response counts and percentages
- Text response samples
- Export functionality (UI ready)

## Customization

### Styling
The application uses a custom CSS framework with:
- CSS variables for consistent theming
- Responsive grid layouts
- Smooth animations and transitions
- Accessible color contrasts

### Adding New Question Types
1. Update the `QuestionType` enum in the backend
2. Add rendering logic in `SurveyForm.js`
3. Update the results display in `SurveyResults.js`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.

