export type Stock = {
  symbol: string; name: string; sector: string; price: number; change: number;
  volume: string; rsi: number; relativeVolume: number; signal: "Bullish" | "Bearish" | "Neutral";
  marketCap: string; high52: number; low52: number;
};
export const stocks: Stock[] = [
  {symbol:"RELIANCE",name:"Reliance Industries",sector:"Energy",price:1468.35,change:2.84,volume:"8.42M",rsi:64,relativeVolume:1.8,signal:"Bullish",marketCap:"₹19.8T",high52:1608,low52:1115},
  {symbol:"HDFCBANK",name:"HDFC Bank",sector:"Banking",price:1762.8,change:1.42,volume:"6.15M",rsi:58,relativeVolume:1.3,signal:"Bullish",marketCap:"₹13.4T",high52:1880,low52:1420},
  {symbol:"ICICIBANK",name:"ICICI Bank",sector:"Banking",price:1298.5,change:2.16,volume:"5.72M",rsi:67,relativeVolume:2.1,signal:"Bullish",marketCap:"₹9.1T",high52:1362,low52:1012},
  {symbol:"TCS",name:"Tata Consultancy Services",sector:"IT",price:3988.2,change:-0.86,volume:"1.92M",rsi:46,relativeVolume:0.9,signal:"Neutral",marketCap:"₹14.4T",high52:4592,low52:3310},
  {symbol:"INFY",name:"Infosys",sector:"IT",price:1842.6,change:-1.34,volume:"3.18M",rsi:39,relativeVolume:1.1,signal:"Bearish",marketCap:"₹7.6T",high52:2006,low52:1358},
  {symbol:"TRENT",name:"Trent",sector:"Retail",price:6128.0,change:3.72,volume:"1.48M",rsi:72,relativeVolume:2.7,signal:"Bullish",marketCap:"₹2.2T",high52:8345,low52:4100},
  {symbol:"BEL",name:"Bharat Electronics",sector:"Defence",price:312.45,change:4.18,volume:"18.6M",rsi:69,relativeVolume:3.2,signal:"Bullish",marketCap:"₹2.3T",high52:340,low52:180},
  {symbol:"SBIN",name:"State Bank of India",sector:"Banking",price:824.7,change:0.64,volume:"7.35M",rsi:53,relativeVolume:1.0,signal:"Neutral",marketCap:"₹7.3T",high52:912,low52:680},
  {symbol:"ADANIPORTS",name:"Adani Ports",sector:"Infrastructure",price:1388.9,change:-2.18,volume:"2.84M",rsi:34,relativeVolume:1.9,signal:"Bearish",marketCap:"₹3.0T",high52:1621,low52:995},
  {symbol:"SUNPHARMA",name:"Sun Pharmaceutical",sector:"Healthcare",price:1764.1,change:1.08,volume:"1.76M",rsi:57,relativeVolume:0.8,signal:"Neutral",marketCap:"₹4.2T",high52:1960,low52:1300},
  {symbol:"ZOMATO",name:"Eternal",sector:"Consumer",price:258.6,change:5.26,volume:"24.1M",rsi:76,relativeVolume:3.8,signal:"Bullish",marketCap:"₹2.5T",high52:304,low52:120},
  {symbol:"TATAMOTORS",name:"Tata Motors",sector:"Auto",price:688.25,change:-2.92,volume:"9.4M",rsi:31,relativeVolume:2.4,signal:"Bearish",marketCap:"₹2.5T",high52:1179,low52:620},
  {symbol:"COALINDIA",name:"Coal India",sector:"Energy",price:421.8,change:2.34,volume:"4.62M",rsi:63,relativeVolume:1.7,signal:"Bullish",marketCap:"₹2.6T",high52:543,low52:350},
  {symbol:"HAL",name:"Hindustan Aeronautics",sector:"Defence",price:4386.5,change:1.92,volume:"1.12M",rsi:61,relativeVolume:1.5,signal:"Bullish",marketCap:"₹1.5T",high52:5675,low52:3045},
  {symbol:"WIPRO",name:"Wipro",sector:"IT",price:294.1,change:-0.42,volume:"2.6M",rsi:48,relativeVolume:0.7,signal:"Neutral",marketCap:"₹3.1T",high52:324,low52:208}
];
export const chartData = [
  {day:"09:20",value:22140},{day:"09:45",value:22178},{day:"10:10",value:22152},{day:"10:35",value:22206},
  {day:"11:00",value:22188},{day:"11:25",value:22234},{day:"11:50",value:22210},{day:"12:15",value:22268},
  {day:"12:40",value:22242},{day:"13:05",value:22291},{day:"13:30",value:22270},{day:"13:55",value:22318},
  {day:"14:20",value:22298},{day:"14:45",value:22346},{day:"15:10",value:22322},{day:"15:30",value:22382}
];
export const breadth = [{name:"Advancing",value:31,color:"#20c997"},{name:"Declining",value:14,color:"#f06b78"},{name:"Unchanged",value:5,color:"#7b8794"}];