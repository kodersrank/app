# Vue Secrets Frontend

This project is a Vue.js application designed to interact the **Secret Server Coding**
API, as specified [**here**](https://github.com/peti2001/secret-server-task).

## Technologies Used

- **Vue 3**: The framework for building the single-page application.
- **Vuetify**: For Material Design components.
- **TypeScript**: For static type checking and improved developer experience.
- **SCSS**: For advanced CSS styling.
- **Bun**: As the package manager for handling dependencies and scripts.

## Setup

### Prerequisites

Ensure you have Bun installed. If not, follow the [installation instructions](https://bun.sh/docs/installation).

### Installation

1. Clone the repository:

```sh
git clone <repository-url>
cd <repository-directory>
```

2. Install dependencies:
```sh
bun install
```

### Development

1. Start the development server:
```sh
bun dev
```

2. Open your browser and navigate to `http://localhost:3000` to view the application.

### Building for Production

1. Build the application:
```sh
bun build
```

2. The production-ready files will be in the `dist` directory.

## Usage

- **Home Page**: Allows users to create new secrets or view existing secrets by entering a hash.
- **Create Secret**: Form to create a new secret message.
- **View Secret**: Page to view a secret message based on the hash provided.

## Demo Instance

You can try our running instance of the app [**here**](https://app-noxi.onrender.com/).
