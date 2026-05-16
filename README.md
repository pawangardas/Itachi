# India AQI Monitor (WAQI)

A lightweight web app that displays live AQI station data for India and gives a quick summary of how bad the air quality is nationwide.

## Features

- Browse AQI across India from one table view
- View average AQI, worst AQI, and overall status
- Color-coded AQI categories
- Token saved in browser `localStorage`

## Setup

1. Get a free API token from the World Air Quality Index project: https://aqicn.org/data-platform/token/
2. Open `index.html` in your browser.
3. Paste your token and click **Save Token**.
4. Click **Refresh** to load latest AQI locations.

## API Used

- WAQI map bounds endpoint: `https://api.waqi.info/v2/map/bounds`
- India bounds used in app: `6.5,68.1,37.6,97.4`

## Notes

- This app runs fully client-side.
- AQI coverage depends on available WAQI monitoring stations at query time.
