
## Project Overview(updates realtime with 1minute interval)

Deployed Front-End:  
[CapX App](https://capx--ashen.vercel.app/)

# CapX App

CapX is a responsive investment platform optimized for both desktop and mobile devices. It provides real-time updates, portfolio insights, and an intuitive user experience for efficient stock management.

## Features

### Dashboard
- Real-time updates on page load and refresh.  
- Displays current portfolio value, invested portfolio value, and a combined performance chart of all portfolio stocks.  
- Highlights the top-performing stock based on price change.  
- Visualizes portfolio diversification and industry distribution with a pie chart.

### Portfolio Page
- Updates stock prices and changes in real-time at 1-minute intervals.  
- Lists stocks with details: quantity, invested price, price change, current price, and industry.  
- "Add Stock" functionality with a search-enabled popup with auto-suggestions to quickly find and add stocks to the portfolio .

### History Page
- Logs all transactions (add, buy, sell) with timestamps.  
- Shows stock name, quantity, and transaction type (e.g., buy or sell).

## Setting Up Rapid Api for key
- Visit [Rapidapi](https://rapidapi.com/apidojo/api/yahoo-finance1)
- Create an account and subscribe to Yahoo-finance1.
- Note down the Api X-RapidAPI-Key.
- It has a limit of 500 req/Month

## How to Run the Project

1. Download the project zip file from GitHub.  
2. Extract the zip file and open the folder in VSCode.
3. Create .env file in root directory and set REACT_APP_API_KEY to (rapid api key) and REACT_APP_API_URL to http://localhost:8080 (if backend is running locally)
4. Open the terminal and execute the following commands:  
   ```bash
   npm install   # Installs all dependencies.
   npm start     # Starts the development server.
   ```
5. Access the app at [http://localhost:3000](http://localhost:3000).

## Known Limitation

- When a stock is sold completely (e.g., selling all shares of a stock), the app does not record profit or loss into the portfolio value.
- User authentication

