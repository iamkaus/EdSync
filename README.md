# EdSync

A comprehensive Node.js application for managing school-related data and operations.

## Overview

EdSync provides a robust backend API for school management, including features for handling school data, calculating distances, and data validation. Built with Node.js and MySQL, it follows a structured MVC architecture for maintainable and scalable code.

## Project Structure

```
├── 📁 config                   # Configuration files
│   ├── 📄 env.config.js        # Environment configuration 
│   └── 📄 mysql.config.js      # Database configuration
├── 📁 controllers              # Request handlers
│   └── 📄 school.controller.js # School-related controller logic
├── 📁 helper                   # Helper functions
│   └── 📄 calculate-distance.helper.js # Distance calculation utility
├── 📁 middleware               # Express middleware
│   └── 📄 validation.middleware.js # Request validation
├── 📁 models                   # Data models
│   └── 📄 school-management.model.js # School data model
├── 📁 routes                   # API routes
│   └── 📄 school.routes.js     # School endpoints
├── 📄 .env.development.local   # Development environment variables ( not included in version control)
├── 📄 .env.production.example  # Example production environment variables
├── 📄 .gitignore               # Git ignore configuration
├── 📄 app.js                   # Express application setup
├── 📄 LICENSE                  # Project license
├── 📄 package.json             # Project dependencies and scripts
├── 📄 package-lock.json        # Locked dependencies
└── 📄 server.js                # Server entry point
```

## Features

- **School Data Management**: Add schools and list schools based on proximity to the user's location
- **Distance Calculation**: Helper utility for geographic calculations
- **Data Validation**: Middleware for request validation
- **Environment Configuration**: Separate configurations for development and production
- **MVC Architecture**: Clean separation of concerns for maintainable code

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- MySQL database

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/iamkaus/EdSync.git
   cd school-management-system
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.development.example .env.development.local
   or
   cp .env.production.example .env.production.local
   ```
   Edit the `.env.*.local` file with your specific configuration

4. Set up the database
   ```bash
   # Configure your MySQL details in the .env file
   # Run database migrations if applicable
   ```

5. Start the server
   ```bash
   npm start
   ```

## API Endpoints

The API provides endpoints for managing school data:

- `GET /api/v1/school/listSchools` - Fetches all schools from the database, sorts them based on proximity to the user's location, and returns the sorted list.
- `POST /api/v1/schools/addSchool` - Validates the input data and adds a new school to the schools table

## Development

### Environment Setup

The project uses environment variables for configuration:

- Development: `.env.development.local`
- Production: Create a `.env.production` file based on the example

## License

This project is licensed under the terms found in the [LICENSE](LICENSE) file.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Contact

Project Link: [EdSync](https://github.com/iamkaus/EdSync.git)
