"use client";

import { useMemo, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, Bookmark, BookmarkCheck,
  ChevronDown, Filter, Gauge, LayoutDashboard, ListFilter, Menu, Search,
  Settings2, SlidersHorizontal, Sparkles, TrendingUp, X, Zap
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
import { breadth, chartData, stocks, type Stock } from "@/lib/data";

type Tab = "Overview" | "All stocks" | "Breakouts" | "Swing radar" | "Backtest lab";
const money = (n: number) => "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Home() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [query, setQuery] = useState("");
  const [signal, setSignal] = useState("All signals");
  const [sector, setSector] = useState("All sectors");
  const [minChange, setMinChange] = useState("-10");
  const [maxPrice, setMaxPrice] = useState("10000");
  const [watch, setWatch] = useState<string[]>(["BEL", "ICICIBANK"]);
  const [mobile, setMobile] = useState(false);
  const [capital, setCapital] = useState("100000");
  const [target, setTarget] = useState("10");
  const [stop, setStop] = useState("5");
  const [ran, setRan] = useState(false);

  const filtered = useMemo(() => stocks.filter((s) =>
    (s.symbol.toLowerCase().includes(query.toLowerCase()) || s.name.toLowerCase().includes(query.toLowerCase())) &&
    (signal === "All signals" || s.signal === signal) &&
    (sector === "All sectors" || s.sector === sector) &&
    s.change >= Number(minChange) && s.price <= Number(maxPrice)
  ), [query, signal, sector, minChange, maxPrice]);

  const toggleWatch = (symbol: string) => setWatch((w) => w.includes(symbol) ? w.filter((x) => x !== symbol) : [...w, symbol]);
  const nav: Tab[] = ["Overview", "All stocks", "Breakouts", "Swing radar", "Backtest lab"];
  const nav: Tab[] = ["Overview", "All stocks", "Breakouts", "Swing radar", "Backtest lab"];
  const shown = tab === "Breakouts"
    ? filtered.filter((s) => s.change >= 2 && s.relativeVolume >= 1.5)
    : tab === "Swing radar"
      ? filtered.filter((s) => s.rsi >= 52 && s.relativeVolume >= 1.2)
      : filtered;

  const tableSection = (
    <section className="panel screener-panel">
      <div className="panel-head">
        <div>
          <div className="eyebrow">{tab === "Overview" ? "QUICK SCAN" : "STOCK UNIVERSE"}</div>
          <h2>{tab === "Overview" ? "Stocks in focus" : tab === "Breakouts" ? "Breakout candidates" : tab === "Swing radar" ? "Swing momentum candidates" : "Explore stocks"}</h2>
          <p>{shown.length} matches in illustrative NSE sample universe</p>
        </div>
        <button className="btn secondary compact" onClick={() => setTab("All stocks")}><ListFilter size={14} /> Full screener</button>
      </div>
      <div className="filters">
        <div className="searchbox"><Search size={16} /><input placeholder="Search symbol or company..." value={query} onChange={(e) => setQuery(e.target.value)} />{query && <button onClick={() => setQuery("")}><X size={14} /></button>}</div>
        <select value={signal} onChange={(e) => setSignal(e.target.value)}><option>All signals</option><option>Bullish</option><option>Bearish</option><option>Neutral</option></select>
        <select value={sector} onChange={(e) => setSector(e.target.value)}><option>All sectors</option>{Array.from(new Set(stocks.map((s) => s.sector))).sort().map((x) => <option key={x}>{x}</option>)}</select>
        <div className="filter-number"><span>Min change %</span><input value={minChange} onChange={(e) => setMinChange(e.target.value)} type="number" /></div>
        <div className="filter-number"><span>Max price ₹</span><input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} type="number" /></div>
      </div>
      <div className="table-scroll">
        <table><thead><tr><th>STOCK</th><th>SECTOR</th><th className="right">LAST PRICE</th><th className="right">CHANGE</th><th className="right">RSI (14)</th><th className="right">REL. VOL</th><th>SIGNAL</th><th /></tr></thead>
          <tbody>{shown.slice(0, tab === "Overview" ? 6 : 30).map((s) => <StockRow key={s.symbol} stock={s} saved={watch.includes(s.symbol)} onSave={() => toggleWatch(s.symbol)} />)}</tbody>
        </table>
        {shown.length === 0 && <div className="empty-table">No stocks match these filters. Try adjusting your criteria.</div>}
      </div>
      <div className="table-footer"><span>Showing {Math.min(shown.length, tab === "Overview" ? 6 : 30)} of {shown.length} stocks · Demo universe</span><button className="text-btn" onClick={() => setTab("All stocks")}>Explore universe <ArrowUpRight size={14} /></button></div>
    </section>
  );

  const overviewContent = (
    <>
      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <div className="panel-head"><div><div className="eyebrow">MARKET TREND</div><h2>Nifty 50 · Intraday view</h2></div><div className="chart-controls"><span className="tag green">+0.84%</span><button className="period active">1D</button><button className="period">1W</button><button className="period">1M</button></div></div>
          <div className="chart-summary"><b>22,482.15</b><span className="positive"><ArrowUpRight size={14} /> +187.40 (0.84%)</span></div>
          <div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#21c997" stopOpacity={0.24} /><stop offset="100%" stopColor="#21c997" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="#222c37" vertical={false} /><XAxis dataKey="day" tick={{ fill: "#778391", fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis domain={["dataMin-80", "dataMax+80"]} orientation="right" tick={{ fill: "#778391", fontSize: 10 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: "#111923", border: "1px solid #2a3745", borderRadius: 10, color: "#edf2f7" }} /><Area type="monotone" dataKey="value" stroke="#25c99a" strokeWidth={2.2} fill="url(#fill)" /></AreaChart></ResponsiveContainer></div>
          <div className="chart-foot"><span><i className="legend-dot" /> NIFTY 50 · DEMO SERIES</span><span>09:20 — 15:30 IST</span></div>
        </section>
        <section className="panel movers-panel">
          <div className="panel-head"><div><div className="eyebrow">MARKET ACTIVITY</div><h2>Top movers</h2></div><button className="text-btn" onClick={() => setTab("All stocks")}>View all <ArrowUpRight size={14} /></button></div>
          <div className="movers-list">{[...stocks].sort((a, b) => b.change - a.change).slice(0, 5).map((s) => <div className="mover" key={s.symbol}><div className="ticker-icon">{s.symbol.slice(0, 2)}</div><div className="mover-name"><b>{s.symbol}</b><small>{s.sector}</small></div><div className="mover-price"><b>{money(s.price)}</b><small className={s.change >= 0 ? "positive" : "negative"}>{s.change > 0 ? "+" : ""}{s.change.toFixed(2)}%</small></div></div>)}</div>
        </section>
      </div>
      {tableSection}
      <div className="bottom-grid">
        <section className="panel"><div className="panel-head"><div><div className="eyebrow">MARKET BREADTH</div><h2>Participation snapshot</h2></div><span className="tag">50 STOCKS</span></div><div className="breadth"><div className="breadth-bar"><span style={{ width: "62%" }} /><span style={{ width: "28%" }} /><span style={{ width: "10%" }} /></div><div className="breadth-legend">{breadth.map((b) => <div key={b.name}><i style={{ background: b.color }} /><span>{b.name}</span><b>{b.value}</b></div>)}</div></div></section>
        <section className="panel"><div className="panel-head"><div><div className="eyebrow">SCANNER SHORTCUTS</div><h2>Find your setup</h2></div></div><div className="shortcut-list"><button onClick={() => setTab("Breakouts")}><span className="shortcut-icon green-bg"><TrendingUp size={16} /></span><span><b>Breakout radar</b><small>Price strength + relative volume</small></span><ArrowUpRight size={15} /></button><button onClick={() => setTab("Swing radar")}><span className="shortcut-icon blue-bg"><Activity size={16} /></span><span><b>Swing momentum</b><small>RSI + volume confirmation</small></span><ArrowUpRight size={15} /></button><button onClick={() => setTab("Backtest lab")}><span className="shortcut-icon purple-bg"><Gauge size={16} /></span><span><b>Risk calculator</b><small>Target, stop and reward-to-risk</small></span><ArrowUpRight size={15} /></button></div></section>
      </div>
    </>
  );

  const backtestContent = (
    <section className="panel backtest">
      <div className="panel-head"><div><div className="eyebrow">STRATEGY WORKBENCH</div><h2>Quick backtest calculator</h2><p>Explore a simple hypothetical target / stop framework.</p></div><span className="tag">SIMULATION ONLY</span></div>
      <div className="backtest-grid">
        <div className="form-card"><label>Starting capital (₹)</label><input value={capital} onChange={(e) => setCapital(e.target.value)} type="number" /><label>Target (%)</label><input value={target} onChange={(e) => setTarget(e.target.value)} type="number" /><label>Stop loss (%)</label><input value={stop} onChange={(e) => setStop(e.target.value)} type="number" /><button className="btn primary full" onClick={() => setRan(true)}>Calculate scenario <ArrowUpRight size={15} /></button></div>
        <div className="result-card">{ran ? <><span className="eyebrow">RISK / REWARD PROFILE</span><h3>{(Number(target) / Math.max(Number(stop), 0.01)).toFixed(2)}R</h3><p>Reward-to-risk ratio based on your inputs.</p><div className="result-row"><span>Potential gain at target</span><b className="positive">{money(Number(capital) * Number(target) / 100)}</b></div><div className="result-row"><span>Potential loss at stop</span><b className="negative">{money(Number(capital) * Number(stop) / 100)}</b></div><div className="result-row"><span>Break-even win rate*</span><b>{(100 * Number(stop) / (Number(target) + Number(stop))).toFixed(1)}%</b></div><small>*Before brokerage, taxes, slippage and gaps. This is not a historical backtest.</small></> : <div className="empty-state"><Gauge size={30} /><b>Your scenario will appear here</b><span>Adjust the inputs and run the calculator.</span></div>}</div>
      </div>
    </section>
  );

  return (
    <main className="shell">
      <aside className={`sidebar ${mobile ? "mobile-open" : ""}`}>
        <div className="brand"><div className="brand-mark">U<span>G</span></div><div><b>UGB<span>Screener</span></b><small>MARKET INTELLIGENCE</small></div><button className="mobile-close" onClick={() => setMobile(false)}><X size={17} /></button></div>
        <div className="workspace"><div className="workspace-icon">U</div><div><b>Underground Bulls</b><small>Personal workspace</small></div><ChevronDown size={14} /></div>
        <div className="nav-label">WORKSPACE</div>
        <nav>{nav.map((n, i) => <button key={n} className={`nav-item ${tab === n ? "active" : ""}`} onClick={() => { setTab(n); setMobile(false); }}>{[<LayoutDashboard key="dashboard" />, <ListFilter key="list" />, <Zap key="zap" />, <Activity key="activity" />, <Gauge key="gauge" />][i]}<span>{n}</span>{n === "Breakouts" && <em>5</em>}</button>)}</nav>
        <div className="nav-label spaced">YOUR TOOLS</div>
        <button className="nav-item" onClick={() => setTab("All stocks")}><Bookmark size={17} /><span>My watchlist</span><em>{watch.length}</em></button>
        <button className="nav-item" onClick={() => setTab("All stocks")}><SlidersHorizontal size={17} /><span>Custom screeners</span></button>
        <div className="sidebar-bottom"><div className="upgrade"><div className="upgrade-icon"><Sparkles size={16} /></div><b>Built for sharper decisions.</b><p>Find your next setup with a focused market view.</p><button onClick={() => setTab("Swing radar")}>Explore scanners <ArrowUpRight size={14} /></button></div><div className="profile"><div className="avatar">UG</div><div><b>UGB Trader</b><small>Free workspace</small></div><Settings2 size={17} /></div></div>
      </aside>
      <section className="main">
        <header className="topbar"><button className="hamburger" onClick={() => setMobile(!mobile)}><Menu /></button><div className="crumb">Workspace <span>/</span> <b>{tab}</b></div><div className="top-actions"><div className="market-status"><i /> MARKET CLOSED <span>·</span> DEMO MODE</div><button className="icon-btn" aria-label="Notifications"><Bell size={18} /><i /></button><div className="top-avatar">UG</div></div></header>
        <div className="content">
          <div className="page-head"><div><div className="eyebrow"><span /> YOUR MARKET EDGE</div><h1>{tab === "Overview" ? "Market overview" : tab}</h1><p>{tab === "Overview" ? "A clearer view of market activity, momentum and potential setups." : "Scan the market, narrow your universe and focus on the signals that matter."}</p></div><div className="head-actions"><button className="btn secondary" onClick={() => { setQuery(""); setSignal("All signals"); setSector("All sectors"); setMinChange("-10"); setMaxPrice("10000"); }}><Filter size={15} /> Reset filters</button><button className="btn primary" onClick={() => setTab("All stocks")}><Zap size={15} /> Open scanner</button></div></div>
          <div className="notice"><div><Sparkles size={15} /><b>Preview environment</b><span>Illustrative market data is shown. Connect a licensed data provider for live NSE quotes.</span></div><span className="demo-pill">DEMO DATA</span></div>
          <div className="metric-grid">
            <Metric title="NIFTY 50" value="22,482.15" change="+0.84%" positive sub="Illustrative snapshot" />
            <Metric title="NIFTY BANK" value="48,216.70" change="+0.62%" positive sub="Illustrative snapshot" />
            <Metric title="ADVANCE / DECLINE" value="31 / 14" change="+17 net advances" positive sub="50-stock sample universe" />
            <Metric title="HIGH RELATIVE VOLUME" value="08" change="Across sample universe" positive sub="Relative volume above 1.5x" />
          </div>
          {tab === "Backtest lab" ? backtestContent : tab === "Overview" ? overviewContent : tableSection}
          <footer><span>UGBScreener <b>·</b> Built for process, not predictions.</span><span>Demo build 0.1.1 <b>·</b> Not investment advice</span></footer>
        </div>
      </section>
    </main>
  );
}

function Metric({ title, value, change, positive, sub }: { title: string; value: string; change: string; positive: boolean; sub: string }) {
  return <div className="metric"><div className="metric-top"><span>{title}</span><span className="metric-icon"><Activity size={15} /></span></div><b className="metric-value">{value}</b><div className={positive ? "metric-change positive" : "metric-change negative"}>{positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {change}</div><small>{sub}</small></div>;
}

function StockRow({ stock: s, saved, onSave }: { stock: Stock; saved: boolean; onSave: () => void }) {
  return <tr><td><div className="stock-cell"><div className="ticker-icon">{s.symbol.slice(0, 2)}</div><div><b>{s.symbol}</b><small>{s.name}</small></div></div></td><td><span className="sector">{s.sector}</span></td><td className="right price">{money(s.price)}</td><td className={`right ${s.change >= 0 ? "positive" : "negative"}`}>{s.change > 0 ? "+" : ""}{s.change.toFixed(2)}%</td><td className="right"><span className={`rsi ${s.rsi >= 60 ? "rsi-high" : s.rsi <= 40 ? "rsi-low" : ""}`}>{s.rsi}</span></td><td className="right">{s.relativeVolume.toFixed(1)}x</td><td><span className={`signal ${s.signal.toLowerCase()}`}><i />{s.signal}</span></td><td><button className="save-btn" onClick={onSave} title={saved ? "Remove from watchlist" : "Add to watchlist"}>{saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}</button></td></tr>;
}
