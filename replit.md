# replit.md

## Overview

This is a modern full-stack web application built as a creative portfolio and personal website. The project showcases a professional's work in product management and UX design, featuring case studies, creative galleries, and contact functionality with interactive audio feedback. It uses a contemporary tech stack with React frontend, Express.js backend, and PostgreSQL database with Drizzle ORM for data management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built with React 18 and TypeScript, utilizing Vite as the build tool for fast development and optimized production builds. The application follows a component-based architecture with:
- **UI Framework**: shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom CSS variables for theming and dark mode support
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod schema validation

The design system implements a sophisticated dark theme with gradient backgrounds, glassmorphism effects, custom animations, and interactive audio feedback. Button interactions include both visual hover effects and audio click sounds generated via Web Audio API. The layout is fully responsive with mobile-first design principles.

### Backend Architecture
The backend follows a REST API pattern using Express.js with TypeScript:
- **Server Framework**: Express.js with middleware for JSON parsing, CORS, and request logging
- **API Design**: RESTful endpoints with proper HTTP status codes and error handling
- **Data Validation**: Zod schemas shared between frontend and backend for type safety
- **Storage Layer**: Abstracted storage interface allowing for different implementations (currently in-memory for development, designed for database integration)

The server includes comprehensive request/response logging and structured error handling with proper HTTP status codes.

### Data Storage Solutions
The application is configured for PostgreSQL with Drizzle ORM:
- **Database**: PostgreSQL as the primary database (configured but not yet implemented)
- **ORM**: Drizzle ORM for type-safe database queries and migrations
- **Schema Management**: Centralized schema definitions in TypeScript with automatic type generation
- **Development Storage**: In-memory storage implementation for rapid development and testing

The database schema includes users and contacts tables with proper relationships and validation.

### Authentication and Authorization
Currently, the application has a basic user schema defined but no active authentication system implemented. The architecture supports future implementation of:
- User registration and login functionality
- Session management with connect-pg-simple for PostgreSQL session storage
- Protected routes and role-based access control

### External Dependencies
- **Neon Database**: @neondatabase/serverless for PostgreSQL connectivity
- **UI Components**: Extensive Radix UI component library for accessible UI elements
- **Development Tools**: Vite with React plugin, ESBuild for production builds
- **Styling**: Tailwind CSS with PostCSS for processing
- **Form Validation**: Zod for runtime type checking and validation
- **Date Handling**: date-fns for date manipulation and formatting

The application includes proper TypeScript configuration with strict mode enabled and path mapping for clean imports. The build system supports both development with hot module replacement and optimized production builds.