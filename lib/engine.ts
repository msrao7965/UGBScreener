export type Candle = { date: string; symbol: string; open: number; high: number; low: number; close: number; volume: number };
export type StockRow = { symbol:string; price:number; change:number; rsi:number; relVol:number; high20:number; low20:number; sma20:number; sma50:number; signal:"Bullish"|"Bearish"|"Neutral"; candles:Candle[] };
export type Trade = { symbol:string; entryDate:string; exitDate:string; entry:number; exit:number; returnPct:number; result:"Target"|"Stop"|"Time exit"; bars:number };
export function sma(values:number[], n:number, end=values.length-1){ if(end+1<n)return NaN; const a=values.slice(end-n+1,end+1); return a.reduce((x,y)=>x+y,0)/n; }
export function rsi(values:number[], n=14){ if(values.length<n+1)return 50; let up=0,down=0; for(let i=values.length-n;i<values.length;i++){const d=values[i]-values[i-1]; if(d>0)up+=d; else down-=d;} if(down===0)return 100; return 100-100/(1+up/down); }
export function buildRows(all:Candle[]):StockRow[]{
 const groups=new Map<string,Candle[]>(); for(const c of all){const a=groups.get(c.symbol)||[];a.push(c);groups.set(c.symbol,a);}
 return [...groups.entries()].map(([symbol,candles])=>{candles.sort((a,b)=>a.date.localeCompare(b.date));const closes=candles.map(x=>x.close),last=candles.at(-1)!,prev=candles.at(-2)||last,vols=candles.map(x=>x.volume);const avgVol=sma(vols,20);const avg20=sma(closes,20),avg50=sma(closes,50);const hi=Math.max(...candles.slice(-20,-1).map(x=>x.high));const lo=Math.min(...candles.slice(-20,-1).map(x=>x.low));const strength=rsi(closes);const rel=avgVol>0?last.volume/avgVol:0;const signal=(last.close>avg20&&strength>=55?"Bullish":last.close<avg20&&strength<45?"Bearish":"Neutral") as StockRow["signal"];return {symbol,price:last.close,change:prev.close?((last.close-prev.close)/prev.close)*100:0,rsi:strength,relVol:rel,high20:hi,low20:lo,sma20:avg20,sma50:avg50,signal,candles};});
}
export function parseCSV(text:string):Candle[]{
 const lines=text.replace(/^\uFEFF/,"").trim().split(/\r?\n/);if(lines.length<2)throw new Error("CSV needs a header and at least one data row.");
 const headers=lines[0].split(",").map(x=>x.trim().toLowerCase().replace(/[^a-z0-9]/g,""));
 const find=(...names:string[])=>headers.findIndex(h=>names.includes(h));
 const ix={date:find("date","datetime","timestamp","time"),symbol:find("symbol","ticker","tradingsymbol","stock"),open:find("open","o"),high:find("high","h"),low:find("low","l"),close:find("close","adjclose","ltp","c"),volume:find("volume","vol","v")};
 if([ix.date,ix.open,ix.high,ix.low,ix.close,ix.volume].some(x=>x<0))throw new Error("Required columns: Date, Open, High, Low, Close, Volume. Symbol is optional for a single-stock file.");
 const out:Candle[]=[];for(const line of lines.slice(1)){if(!line.trim())continue;const c=line.split(",");const num=(i:number)=>Number((c[i]||"").replace(/,/g,"").trim());const date=(c[ix.date]||"").trim();const symbol=ix.symbol>=0?(c[ix.symbol]||"").trim().toUpperCase():"UPLOADED";const open=num(ix.open),high=num(ix.high),low=num(ix.low),close=num(ix.close),volume=num(ix.volume);if(!date||![open,high,low,close,volume].every(Number.isFinite)||Math.min(open,high,low,close)<=0)continue;out.push({date,symbol,open,high,low,close,volume});}
 if(!out.length)throw new Error("No valid OHLCV rows found. Check your CSV columns and values.");return out;
}
export function runBacktest(rows:StockRow[],target:number,stop:number,maxBars:number):Trade[]{
 const trades:Trade[]=[];for(const s of rows){const c=s.candles;for(let i=51;i<c.length-2;i++){const hist=c.slice(0,i+1),cl=hist.map(x=>x.close),last=c[i],r=rsi(cl),ma=sma(cl,20,i),ma50=sma(cl,50,i);const signal=last.close>ma&&ma>ma50&&r>=55;if(!signal)continue;const entryBar=c[i+1],entry=entryBar.open;if(!Number.isFinite(entry)||entry<=0)continue;const tp=entry*(1+target/100),sl=entry*(1-stop/100);let exit=entryBar.close,exitIndex=Math.min(i+1+maxBars,c.length-1),result:Trade["result"]="Time exit";for(let j=i+1;j<=exitIndex;j++){if(c[j].low<=sl){exit=sl;exitIndex=j;result="Stop";break;}if(c[j].high>=tp){exit=tp;exitIndex=j;result="Target";break;}exit=c[j].close;}trades.push({symbol:s.symbol,entryDate:entryBar.date,exitDate:c[exitIndex].date,entry,exit,returnPct:(exit-entry)/entry*100,result,bars:exitIndex-i});i=exitIndex;}}
 return trades;
}
export const demoSymbols=["RELIANCE","HDFCBANK","ICICIBANK","TCS","INFY","BEL","SBIN","TRENT","SUNPHARMA","COALINDIA"];
