import { useState, useRef } from "react";

const PINK = "#cc0044";
const BLUE = "#0066aa";
const ORANGE = "#cc5500";
const PURPLE = "#5500aa";
const YELLOW = "#996600";
const GREEN = "#1a7a1a";
const BG = "#f2efe9";
const CARD = "#ffffff";
const INPUT_BG = "#e8e4dc";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=VT323&family=Rajdhani:wght@400;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${BG}; }

  .app {
    min-height: 100vh;
    background: ${BG};
    color: #1a1a1a;
    font-family: 'Rajdhani', sans-serif;
    font-size: 15px;
  }

  .header {
    background: linear-gradient(180deg, #1a0a0f 0%, #2d1020 100%);
    border-bottom: 3px solid ${PINK};
    padding: 14px 28px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.15);
  }

  .header-inner {
    max-width: 860px;
    margin: 0 auto;
    display: flex;
    align-items: flex-end;
    gap: 16px;
    flex-wrap: wrap;
  }

  .logo-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 52px;
    letter-spacing: 4px;
    color: #ff6090;
    text-shadow: 0 0 12px rgba(255,45,120,0.4);
    line-height: 1;
  }

  .logo-sub {
    font-family: 'VT323', monospace;
    font-size: 15px;
    color: #88ddff;
    letter-spacing: 3px;
    margin-bottom: 6px;
  }

  .main {
    max-width: 860px;
    margin: 0 auto;
    padding: 32px 24px;
  }

  .search-card {
    background: ${CARD};
    border: 1px solid #d8d4cc;
    border-radius: 8px;
    padding: 28px;
    margin-bottom: 24px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  }

  .search-intro {
    font-family: 'VT323', monospace;
    font-size: 16px;
    color: #888;
    letter-spacing: 1px;
    line-height: 1.7;
    margin-bottom: 22px;
  }

  /* SCAN BAR */
  .scan-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #f8f4ff;
    border: 2px dashed #c0a0e0;
    border-radius: 6px;
    padding: 12px 16px;
    margin-bottom: 20px;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
  }
  .scan-bar:hover { border-color: ${PURPLE}; background: #f2eaff; }
  .scan-bar.loading { border-color: ${PURPLE}; background: #f2eaff; cursor: wait; }
  .scan-bar.success { border-color: ${GREEN}; background: #f0fff0; cursor: pointer; }
  .scan-bar.error { border-color: ${PINK}; background: #fff0f4; cursor: pointer; }

  .scan-icon { font-size: 26px; flex-shrink: 0; }
  .scan-text { flex: 1; }

  .scan-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 17px;
    letter-spacing: 1.5px;
    color: ${PURPLE};
  }
  .scan-title.success { color: ${GREEN}; }
  .scan-title.error { color: ${PINK}; }

  .scan-sub { font-family: 'VT323', monospace; font-size: 13px; color: #999; margin-top: 2px; }

  .scan-preview {
    width: 52px;
    height: 52px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid #ddd;
    flex-shrink: 0;
  }

  /* FORM */
  .field-row {
    display: grid;
    grid-template-columns: 1fr 160px;
    gap: 12px;
    margin-bottom: 12px;
  }

  .form-label {
    font-family: 'VT323', monospace;
    font-size: 14px;
    color: ${BLUE};
    letter-spacing: 1px;
    margin-bottom: 5px;
    display: block;
  }

  .form-input, .form-select {
    width: 100%;
    background: ${INPUT_BG};
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 9px 12px;
    color: #1a1a1a;
    font-family: 'Rajdhani', sans-serif;
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .form-input:focus, .form-select:focus {
    border-color: ${PINK};
    box-shadow: 0 0 6px rgba(204,0,68,0.15);
  }
  .form-input::placeholder { color: #aaa; }

  /* BUTTONS */
  .btn-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 4px;
  }

  .btn {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    letter-spacing: 2px;
    padding: 13px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.18s;
    width: 100%;
  }

  .btn-sold { background: ${PINK}; color: #fff; box-shadow: 0 3px 8px rgba(204,0,68,0.3); }
  .btn-sold:hover { background: #aa0038; transform: translateY(-1px); box-shadow: 0 5px 14px rgba(204,0,68,0.4); }

  .btn-active { background: ${BLUE}; color: #fff; box-shadow: 0 3px 8px rgba(0,102,170,0.3); }
  .btn-active:hover { background: #005590; transform: translateY(-1px); box-shadow: 0 5px 14px rgba(0,102,170,0.4); }

  .btn-whatnot { background: ${ORANGE}; color: #fff; box-shadow: 0 3px 8px rgba(204,85,0,0.3); }
  .btn-whatnot:hover { background: #aa4400; transform: translateY(-1px); box-shadow: 0 5px 14px rgba(204,85,0,0.4); }

  .btn-boxart { background: ${PURPLE}; color: #fff; box-shadow: 0 3px 8px rgba(85,0,170,0.3); }
  .btn-boxart:hover { background: #440088; transform: translateY(-1px); box-shadow: 0 5px 14px rgba(85,0,170,0.4); }

  .btn-sub {
    font-family: 'VT323', monospace;
    font-size: 13px;
    letter-spacing: 1px;
    color: #aaa;
    text-align: center;
    margin-top: 6px;
  }

  /* SPREAD BOX */
  .spread-box {
    background: #fffbf0;
    border: 1px solid #e8dfc0;
    border-left: 3px solid ${YELLOW};
    border-radius: 5px;
    padding: 16px 18px;
    margin-bottom: 28px;
    font-family: 'VT323', monospace;
    font-size: 16px;
    color: #666;
    line-height: 1.8;
  }

  /* HISTORY */
  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 3px;
    color: #1a1a1a;
    border-left: 4px solid ${PINK};
    padding-left: 12px;
    margin-bottom: 14px;
  }

  .history-section { margin-bottom: 28px; }
  .history-list { display: flex; flex-direction: column; gap: 8px; }

  .history-item {
    background: ${CARD};
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: border-color 0.15s;
  }
  .history-item:hover { border-color: ${PINK}; }

  .history-query { flex: 1; min-width: 0; }

  .history-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px;
    color: #1a1a1a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .history-meta { font-family: 'VT323', monospace; font-size: 14px; color: #aaa; margin-top: 1px; }
  .history-links { display: flex; gap: 6px; flex-shrink: 0; flex-wrap: wrap; }

  .link-btn {
    font-family: 'VT323', monospace;
    font-size: 14px;
    padding: 4px 10px;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.15s;
  }

  .link-sold { background: rgba(204,0,68,0.08); color: ${PINK}; border: 1px solid rgba(204,0,68,0.25); }
  .link-sold:hover { background: rgba(204,0,68,0.16); }

  .link-active { background: rgba(0,102,170,0.08); color: ${BLUE}; border: 1px solid rgba(0,102,170,0.22); }
  .link-active:hover { background: rgba(0,102,170,0.15); }

  .link-whatnot { background: rgba(204,85,0,0.08); color: ${ORANGE}; border: 1px solid rgba(204,85,0,0.22); }
  .link-whatnot:hover { background: rgba(204,85,0,0.15); }

  .link-boxart { background: rgba(85,0,170,0.08); color: ${PURPLE}; border: 1px solid rgba(85,0,170,0.22); }
  .link-boxart:hover { background: rgba(85,0,170,0.15); }

  .clear-btn {
    font-family: 'VT323', monospace;
    font-size: 14px;
    background: none;
    border: none;
    color: #bbb;
    cursor: pointer;
    padding: 2px 6px;
    transition: color 0.15s;
  }
  .clear-btn:hover { color: #cc0000; }

  /* TIPS */
  .tips-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

  .tip-card {
    background: ${CARD};
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 12px 14px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }

  .tip-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 15px;
    letter-spacing: 1px;
    color: ${PINK};
    margin-bottom: 4px;
  }

  .tip-text { font-size: 13px; color: #666; line-height: 1.5; }

  @media (max-width: 580px) {
    .field-row { grid-template-columns: 1fr; }
    .btn-row { grid-template-columns: 1fr; }
    .tips-grid { grid-template-columns: 1fr; }
    .history-links { flex-wrap: wrap; }
  }
`;

function buildEbayUrl({ title = "", format = "", keywords = "", soldOnly = true } = {}) {
  const fmt = format.toLowerCase().includes("beta") ? "betamax" : format ? "VHS" : "";
  const parts = [title, fmt, keywords].map(s => s.trim()).filter(Boolean);
  const q = encodeURIComponent(parts.join(" "));
  const sold = soldOnly ? "&LH_Sold=1&LH_Complete=1" : "";
  return `https://www.ebay.com/sch/i.html?_nkw=${q}&_sacat=0${sold}`;
}

function buildWhatnotUrl({ title = "", format = "", keywords = "" } = {}) {
  const fmt = format.toLowerCase().includes("beta") ? "betamax" : format ? "VHS" : "";
  const parts = [title, fmt, keywords].map(s => s.trim()).filter(Boolean);
  return `https://www.whatnot.com/search?query=${encodeURIComponent(parts.join(" "))}`;
}

function buildBoxArtUrl({ title = "", format = "", keywords = "" } = {}) {
  const fmt = format.toLowerCase().includes("beta") ? "betamax" : format ? "VHS" : "";
  const parts = [title, fmt, keywords, "cover box art"].map(s => s.trim()).filter(Boolean);
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(parts.join(" "))}`;
}

const TIPS = [
  { title: "Big Box Premium", text: 'Add "big box" — these consistently fetch 3–10x the standard clamshell price.' },
  { title: "Sealed Copies", text: '"Sealed" or "factory sealed" — asking prices often detach from reality here.' },
  { title: "Rental Copies", text: '"Rental" copies trade at a discount but are often the only surviving print of rare titles.' },
  { title: "Betamax Spread", text: "Beta sold comps vs. active listings often show the widest spread — sellers know collectors pay up." },
  { title: "Condition Language", text: '"EX+" or "excellent plus" is how serious graders describe near-mint tapes.' },
  { title: "SOV Titles", text: "Shot-on-video horror often has no true comp — one sale can set the market for months." },
  { title: "Read the Spread", text: "Wide gap = sellers fishing, patient buyers win. Tight spread = liquid market, prices are real." },
  { title: "Lot Listings", text: 'Search title + "lot" to find bulk deals — common titles hidden in lots can be steals.' },
];

export default function App() {
  const [title, setTitle] = useState("");
  const [format, setFormat] = useState("VHS");
  const [keywords, setKeywords] = useState("");
  const [history, setHistory] = useState([]);
  const [scanState, setScanState] = useState("idle");
  const [scanMsg, setScanMsg] = useState("");
  const [scanPreview, setScanPreview] = useState(null);
  const fileInputRef = useRef();

  async function scanTape(file) {
    if (!file) return;
    setScanState("loading");
    setScanMsg("Reading your tape...");
    setScanPreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onload = async e => {
      const base64 = e.target.result.split(",")[1];
      const mediaType = file.type || "image/jpeg";
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-allow-browser": "true",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 200,
            messages: [{
              role: "user",
              content: [
                { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
                { type: "text", text: `Look at this VHS or Betamax tape photo. Return ONLY a JSON object with two fields: "title" (the movie/show title) and "format" (either "VHS" or "Betamax"). Best guess if unclear. Example: {"title":"The Burning","format":"VHS"}` }
              ]
            }]
          })
        });
        const data = await res.json();
        const text = data.content?.map(b => b.text || "").join("") || "";
        const match = text.match(/\{[^}]+\}/);
        if (match) {
          const parsed = JSON.parse(match[0]);
          if (parsed.title) {
            setTitle(parsed.title);
            if (parsed.format) setFormat(parsed.format);
            setScanState("success");
            setScanMsg(`Found: "${parsed.title}" · ${parsed.format || "VHS"} — fields pre-filled, hit any search button`);
            return;
          }
        }
        throw new Error("parse failed");
      } catch {
        setScanState("error");
        setScanMsg("Couldn't read the tape — try a clearer photo or type the title manually. Tap to retry.");
      }
    };
    reader.readAsDataURL(file);
  }

  function doSearch(soldOnly) {
    if (!title.trim() && !keywords.trim()) { alert("Enter a title or keywords to search."); return; }
    const url = buildEbayUrl({ title, format, keywords, soldOnly });
    const entry = { title: title.trim(), format, keywords: keywords.trim() };
    setHistory(h => {
      const isDupe = h.some(x => x.title === entry.title && x.format === entry.format && x.keywords === entry.keywords);
      return isDupe ? h : [entry, ...h].slice(0, 12);
    });
    window.open(url, "_blank");
  }

  function requireSearch(fn) {
    if (!title.trim() && !keywords.trim()) { alert("Enter a title or keywords to search."); return; }
    fn();
  }

  return (
    <div className="app">
      <style>{styles}</style>

      <div className="header">
        <div className="header-inner">
          <div className="logo-title">VHS CAFE</div>
          <div className="logo-sub">JIM SLAY · EBAY MARKET SEARCH</div>
        </div>
      </div>

      <div className="main">
        <div className="search-card">
          <div className="search-intro">
            Compare what tapes are&nbsp;
            <span style={{ color: GREEN }}>actually selling for</span>
            &nbsp;vs. what sellers are&nbsp;
            <span style={{ color: YELLOW }}>asking</span>.
            Opens in a new tab — log into eBay first to see sold prices.
          </div>

          {/* SCAN BAR */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={e => { scanTape(e.target.files[0]); e.target.value = ""; }}
          />
          <div
            className={`scan-bar ${scanState === "idle" ? "" : scanState}`}
            onClick={() => scanState !== "loading" && fileInputRef.current.click()}
          >
            <div className="scan-icon">
              {scanState === "loading" ? "⏳" : scanState === "success" ? "✅" : scanState === "error" ? "⚠️" : "📷"}
            </div>
            <div className="scan-text">
              <div className={`scan-title${scanState === "success" ? " success" : scanState === "error" ? " error" : ""}`}>
                {scanState === "idle" ? "Scan a Tape" : scanState === "loading" ? "Scanning..." : scanState === "success" ? "Tape Identified" : "Scan Failed"}
              </div>
              <div className="scan-sub">
                {scanState === "idle" ? "Upload a photo — Claude reads the title and format automatically" : scanMsg}
              </div>
            </div>
            {scanPreview && scanState !== "loading" && (
              <img src={scanPreview} className="scan-preview" alt="tape preview" />
            )}
          </div>

          {/* FIELDS */}
          <div className="field-row">
            <div>
              <label className="form-label">Title</label>
              <input
                className="form-input"
                placeholder="e.g. The Burning, Basket Case, Sleepaway Camp..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                onKeyDown={e => e.key === "Enter" && doSearch(true)}
              />
            </div>
            <div>
              <label className="form-label">Format</label>
              <select className="form-select" value={format} onChange={e => setFormat(e.target.value)}>
                <option value="">Any</option>
                <option>VHS</option>
                <option>Betamax</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label className="form-label">Extra Keywords</label>
            <input
              className="form-input"
              placeholder="e.g. big box, sealed, rental, horror..."
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              onKeyDown={e => e.key === "Enter" && doSearch(true)}
            />
          </div>

          {/* SEARCH BUTTONS */}
          <div className="btn-row">
            <div>
              <button className="btn btn-sold" onClick={() => doSearch(true)}>✅ Sold Comps</button>
              <div className="btn-sub">What it actually sold for · Login required</div>
            </div>
            <div>
              <button className="btn btn-active" onClick={() => doSearch(false)}>🛒 Active Listings</button>
              <div className="btn-sub">What sellers are asking · No login needed</div>
            </div>
            <div>
              <button className="btn btn-whatnot" onClick={() => requireSearch(() => window.open(buildWhatnotUrl({ title, format, keywords }), "_blank"))}>
                📦 Whatnot
              </button>
              <div className="btn-sub">Live auctions & buy now</div>
            </div>
            <div>
              <button className="btn btn-boxart" onClick={() => requireSearch(() => window.open(buildBoxArtUrl({ title, format, keywords }), "_blank"))}>
                🖼 Box Art
              </button>
              <div className="btn-sub">Google Images cover search</div>
            </div>
          </div>
        </div>

        {/* SPREAD BOX */}
        <div className="spread-box">
          <span style={{ color: YELLOW }}>Reading the spread:</span> A wide gap between asking and sold prices means sellers are fishing — patient buyers win. A tight spread on a rare title means the market is liquid and prices are real.
        </div>

        {/* HISTORY */}
        {history.length > 0 && (
          <div className="history-section">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div className="section-title" style={{ marginBottom: 0 }}>Recent Searches</div>
              <button className="clear-btn" onClick={() => setHistory([])}>Clear all</button>
            </div>
            <div className="history-list">
              {history.map((entry, i) => (
                <div key={i} className="history-item">
                  <div className="history-query">
                    <div className="history-title">
                      {entry.title || entry.keywords}
                      {entry.format && <span style={{ color: "#bbb", marginLeft: 8 }}>· {entry.format}</span>}
                    </div>
                    {entry.keywords && entry.title && <div className="history-meta">{entry.keywords}</div>}
                  </div>
                  <div className="history-links">
                    <button className="link-btn link-sold" onClick={() => window.open(buildEbayUrl({ ...entry, soldOnly: true }), "_blank")}>✅ Sold</button>
                    <button className="link-btn link-active" onClick={() => window.open(buildEbayUrl({ ...entry, soldOnly: false }), "_blank")}>🛒 Active</button>
                    <button className="link-btn link-whatnot" onClick={() => window.open(buildWhatnotUrl(entry), "_blank")}>📦 Whatnot</button>
                    <button className="link-btn link-boxart" onClick={() => window.open(buildBoxArtUrl(entry), "_blank")}>🖼 Art</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TIPS */}
        <div className="section-title">Search Tips</div>
        <div className="tips-grid">
          {TIPS.map(t => (
            <div key={t.title} className="tip-card">
              <div className="tip-title">▶ {t.title}</div>
              <div className="tip-text">{t.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
