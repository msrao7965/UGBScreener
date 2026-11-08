# UGBScreener
A Vercel-native browser screener and historical strategy workbench inspired by the scanner concepts in [PKScreener](https://github.com/pkjmesra/PKScreener).

## Deploy
Import this repository into Vercel. Framework: Next.js. Build command: `npm run build`. No environment variables are required for the demo and CSV workflows.

## Included
- Responsive market dashboard and stock table
- Screener filters: symbol, signal, RSI and relative volume
- Scanner presets: momentum/volume, breakout watch, trend template, volume expansion and oversold
- Strategy rule controls and local watchlist
- CSV OHLCV import and browser-local persistence
- Historical strategy simulation with next-session-open entry, target/stop/time exit, trade ledger and CSV export
- No server, database, API key or external chart library required

## Data & limitations
Demo rows are illustrative and are never represented as live quotes. Import OHLCV CSV to use actual historical data. CSV schema: Date, Symbol (optional for one symbol), Open, High, Low, Close, Volume. This version runs calculations in the browser; it does not include a licensed live NSE feed, cloud sync, Telegram alerts, broker execution, or unattended cron scanning. Those require a market-data/broker provider and, for persistent multi-user workflows, a database/auth service. Vercel serverless functions are request-driven and are not a replacement for a permanently running Python process.

## Attribution
PKScreener is an MIT-licensed open-source project. This project is a separate web implementation inspired by its publicly documented scanner capabilities; it does not bundle the original Python application. See the upstream repository and license: https://github.com/pkjmesra/PKScreener
