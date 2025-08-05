# Star Wars Movie Explorer

A React-based web application for exploring Star Wars movies and characters using the Star Wars API (SWAPI).

## Features

- 🎬 Browse all Star Wars movies
- 🔍 Search movies by title
- 👥 View characters from each movie
- 📱 Responsive design with Star Wars-themed UI
- ✨ Beautiful animations and hover effects

## Technologies Used

- **React** - Frontend framework
- **Redux Toolkit** - State management
- **Sass/SCSS** - Styling
- **Webpack** - Build tool
- **Star Wars API (SWAPI)** - Data source

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kfir91/StartWars.git
   cd StartWars
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and visit `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── CharacterAccordion.jsx
│   ├── MovieCard.jsx
│   └── SearchBar.jsx
├── store/
│   ├── store.js
│   └── slices/
│       └── moviesSlice.js
├── styles/
│   ├── App.scss
│   ├── Characters.scss
│   ├── MovieCard.scss
│   ├── SearchBar.scss
│   ├── _variables.scss
│   ├── index.scss
│   └── main.scss
├── App.jsx
└── index.js
```

## Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the app for production
- `npm run dev` - Start development server (alternative)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## API Reference

This project uses the [Star Wars API (SWAPI)](https://swapi.dev/) to fetch movie and character data.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Star Wars API (SWAPI) for providing the data
- Disney/Lucasfilm for the Star Wars universe
