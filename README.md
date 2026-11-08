# UGBScreener

A Vercel-ready Next.js stock-screening dashboard starter.

## Included in this first build
- Dark premium trading terminal UI
- Dashboard overview and market breadth cards
- Searchable NSE watchlist with sector, price, change and volume
- Functional client-side filters: bullish/bearish, price range, minimum change
- Watchlist pinning persisted in browser localStorage
- Strategy presets for momentum, breakout, pullback and volume
- Demo backtest calculator with configurable capital, target and stop-loss
- Responsive layout and chart visualizations

## Important data note
The included quotes and historical series are **illustrative demo data**, not live NSE prices or investment recommendations. No market-data provider is connected yet. To make this a real product, connect a licensed data source and implement its server-side adapter in `app/api/` before displaying live claims.

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Deploy to Vercel
1. Create a new GitHub repository named `UGBScreener`.
2. Upload/push this project folder to that repository.
3. In Vercel, choose **Add New → Project**, import `UGBScreener`.
4. Framework preset: Next.js. Build command: `npm run build`.
5. Deploy. No environment variables are required for this demo.

## Next development phase
1. Add a licensed Indian market-data provider (NSE cash + indices).
2. Add server-side caching/rate limiting and scheduled scans.
3. Add Supabase authentication, saved screeners and cloud watchlists.
4. Add validated historical backtesting with corporate-action adjusted data.
5. Add alerts and subscription/billing only after data rights and reliability are settled.
