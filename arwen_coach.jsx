import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════
// WORD BANKS — add new entries here easily!
// ═══════════════════════════════════════════════════

const ENGLISH_BANK = [
  {word:"curious"},{word:"disappointed"},{word:"careful"},{word:"delicious"},
  {word:"brave"},{word:"quiet"},{word:"noisy"},{word:"suddenly"},
  {word:"because"},{word:"before"},{word:"after"},{word:"through"},
  {word:"towards"},{word:"enormous"},{word:"gentle"},{word:"hollow"},
  {word:"journey"},{word:"marvellous"},{word:"narrow"},{word:"patient"},
  {word:"shelter"},{word:"thoughtful"},{word:"wander"},{word:"fierce"},
  {word:"imagine"},{word:"polite"},{word:"whisper"},{word:"discover"},
  {word:"ancient"},{word:"protect"},{word:"harvest"},{word:"finally"},
  {word:"perhaps"},{word:"adventure"},{word:"terrible"},{word:"compare"},
  {word:"almost"},{word:"budget"},{word:"auction"}
];

const CHINESE_BANK = [
  {item:"我",meaning:"I / me",pinyin:"wǒ"},{item:"你",meaning:"you",pinyin:"nǐ"},
  {item:"他",meaning:"he",pinyin:"tā"},{item:"她",meaning:"she",pinyin:"tā"},
  {item:"好",meaning:"good",pinyin:"hǎo"},{item:"是",meaning:"to be",pinyin:"shì"},
  {item:"有",meaning:"to have",pinyin:"yǒu"},{item:"不",meaning:"not",pinyin:"bù"},
  {item:"大",meaning:"big",pinyin:"dà"},{item:"小",meaning:"small",pinyin:"xiǎo"},
  {item:"猫",meaning:"cat",pinyin:"māo"},{item:"狗",meaning:"dog",pinyin:"gǒu"},
  {item:"鸟",meaning:"bird",pinyin:"niǎo"},{item:"鱼",meaning:"fish",pinyin:"yú"},
  {item:"书",meaning:"book",pinyin:"shū"},{item:"水",meaning:"water",pinyin:"shuǐ"},
  {item:"火",meaning:"fire",pinyin:"huǒ"},{item:"山",meaning:"mountain",pinyin:"shān"},
  {item:"天",meaning:"day / sky",pinyin:"tiān"},{item:"月",meaning:"moon / month",pinyin:"yuè"},
  {item:"人",meaning:"person",pinyin:"rén"},{item:"吃",meaning:"to eat",pinyin:"chī"},
  {item:"喝",meaning:"to drink",pinyin:"hē"},{item:"去",meaning:"to go",pinyin:"qù"},
  {item:"来",meaning:"to come",pinyin:"lái"},{item:"红",meaning:"red",pinyin:"hóng"},
  {item:"蓝",meaning:"blue",pinyin:"lán"},{item:"黄",meaning:"yellow",pinyin:"huáng"},
  {item:"妈妈",meaning:"mum",pinyin:"māmā"},{item:"爸爸",meaning:"dad",pinyin:"bàba"},
  {item:"老师",meaning:"teacher",pinyin:"lǎoshī"},{item:"学校",meaning:"school",pinyin:"xuéxiào"},
  {item:"朋友",meaning:"friend",pinyin:"péngyou"},{item:"今天",meaning:"today",pinyin:"jīntiān"},
  {item:"明天",meaning:"tomorrow",pinyin:"míngtiān"},{item:"谢谢",meaning:"thank you",pinyin:"xièxie"},
  {item:"喜欢",meaning:"to like",pinyin:"xǐhuān"},{item:"家",meaning:"home",pinyin:"jiā"},
  {item:"手",meaning:"hand",pinyin:"shǒu"},{item:"口",meaning:"mouth",pinyin:"kǒu"},
  {item:"眼",meaning:"eye",pinyin:"yǎn"},{item:"心",meaning:"heart",pinyin:"xīn"},
  {item:"花",meaning:"flower",pinyin:"huā"},{item:"草",meaning:"grass",pinyin:"cǎo"},
  {item:"树",meaning:"tree",pinyin:"shù"},{item:"风",meaning:"wind",pinyin:"fēng"},
  {item:"雨",meaning:"rain",pinyin:"yǔ"},{item:"雪",meaning:"snow",pinyin:"xuě"},
  {item:"飞",meaning:"to fly",pinyin:"fēi"},{item:"跑",meaning:"to run",pinyin:"pǎo"},
  {item:"走",meaning:"to walk",pinyin:"zǒu"},{item:"说",meaning:"to speak",pinyin:"shuō"},
  {item:"听",meaning:"to listen",pinyin:"tīng"},{item:"写",meaning:"to write",pinyin:"xiě"},
  {item:"唱",meaning:"to sing",pinyin:"chàng"},{item:"多",meaning:"many",pinyin:"duō"},
  {item:"少",meaning:"few",pinyin:"shǎo"},{item:"快",meaning:"fast",pinyin:"kuài"},
  {item:"慢",meaning:"slow",pinyin:"màn"},{item:"冷",meaning:"cold",pinyin:"lěng"},
  {item:"热",meaning:"hot",pinyin:"rè"},{item:"新",meaning:"new",pinyin:"xīn"},
  {item:"哥哥",meaning:"older brother",pinyin:"gēge"},{item:"姐姐",meaning:"older sister",pinyin:"jiějie"},
  {item:"弟弟",meaning:"younger brother",pinyin:"dìdi"},{item:"妹妹",meaning:"younger sister",pinyin:"mèimei"},
  {item:"太阳",meaning:"sun",pinyin:"tàiyáng"}
];

const SPANISH_BANK = [
  {item:"hola",meaning:"hello"},{item:"adiós",meaning:"goodbye"},
  {item:"gracias",meaning:"thank you"},{item:"por favor",meaning:"please"},
  {item:"sí",meaning:"yes"},{item:"no",meaning:"no"},
  {item:"mamá",meaning:"mum"},{item:"papá",meaning:"dad"},
  {item:"escuela",meaning:"school"},{item:"libro",meaning:"book"},
  {item:"agua",meaning:"water"},{item:"gato",meaning:"cat"},
  {item:"perro",meaning:"dog"},{item:"uno",meaning:"one"},
  {item:"dos",meaning:"two"},{item:"tres",meaning:"three"},
  {item:"cuatro",meaning:"four"},{item:"cinco",meaning:"five"},
  {item:"seis",meaning:"six"},{item:"siete",meaning:"seven"},
  {item:"ocho",meaning:"eight"},{item:"nueve",meaning:"nine"},
  {item:"diez",meaning:"ten"},{item:"rojo",meaning:"red"},
  {item:"azul",meaning:"blue"},{item:"amarillo",meaning:"yellow"},
  {item:"verde",meaning:"green"},{item:"blanco",meaning:"white"},
  {item:"negro",meaning:"black"},{item:"naranja",meaning:"orange"},
  {item:"rosa",meaning:"pink"},{item:"casa",meaning:"house"},
  {item:"mesa",meaning:"table"},{item:"amigo",meaning:"friend"},
  {item:"grande",meaning:"big"},{item:"pequeño",meaning:"small"},
  {item:"bueno",meaning:"good"},{item:"feliz",meaning:"happy"},
  {item:"triste",meaning:"sad"},{item:"comer",meaning:"to eat"},
  {item:"beber",meaning:"to drink"},{item:"jugar",meaning:"to play"},
  {item:"leer",meaning:"to read"},{item:"sol",meaning:"sun"},
  {item:"luna",meaning:"moon"},{item:"flor",meaning:"flower"},
  {item:"árbol",meaning:"tree"}
];

// Adaptive math: G3 default, level up to G4 on first-try correct
const MATH_TOPICS_G3 = [
  "multiplication facts (e.g. 7×8)",
  "addition within 1000",
  "subtraction within 1000",
  "division facts (e.g. 24÷6)",
  "two-digit × one-digit (e.g. 23×4)",
  "missing number (e.g. 5×? = 35)",
  "compare numbers (e.g. which is bigger: 347 or 374?)",
  "simple word problem (Year 3)",
  "place value (e.g. value of 4 in 347?)",
  "number sequences (e.g. 5, 10, 15, ?)",
  "halving and doubling",
  "simple fractions (e.g. half of 20)"
];

const MATH_TOPICS_G4 = [
  "multi-digit × one-digit (e.g. 1234×6)",
  "two-digit × two-digit (e.g. 23×45)",
  "division with remainders (e.g. 47÷5)",
  "factor pairs (e.g. list all factors of 24)",
  "multiples (e.g. is 36 a multiple of 4?)",
  "prime or composite (e.g. is 17 prime?)",
  "unit conversion (e.g. 3 km = ? m)",
  "multi-step word problem (Year 4)",
  "rounding to nearest 100 or 1000",
  "equivalent fractions (e.g. ½ = ?/4)",
  "compare fractions (e.g. which is bigger: ⅔ or ¾?)",
  "add and subtract fractions with same denominator"
];

// Science — aligned to NGSS Grade 3 + UK Year 3/4 national curriculum
const SCIENCE_TOPICS = [
  // Life Science (NGSS 3-LS1, 3-LS2, 3-LS4 / UK: plants, animals)
  "Life cycles: all living things go through birth, growth, reproduction, and death (e.g. frog: egg→tadpole→froglet→frog)",
  "What plants need to grow: sunlight, water, air, nutrients from soil",
  "Parts of a plant and their jobs: roots (absorb water), stem (support/transport), leaves (make food), flower (reproduction)",
  "Food chains: producer (plant) → primary consumer → secondary consumer → predator (e.g. grass→rabbit→fox)",
  "Animal groups: mammals, birds, reptiles, amphibians, fish, insects — what makes each group different",
  "Skeletons and muscles: humans have an endoskeleton; some animals have exoskeletons (e.g. insects, crabs)",
  // Physical Science (NGSS 3-PS2 / UK: forces, light, magnets)
  "Forces: push and pull; gravity pulls objects down; friction slows things down",
  "Magnets: attract iron/steel, have north and south poles; opposite poles attract, same poles repel",
  "Light: travels in straight lines; we see objects because light reflects off them; opaque objects make shadows",
  "States of matter: solid (fixed shape), liquid (takes shape of container), gas (fills all space)",
  // Earth Science (NGSS 3-ESS2 / UK: rocks, weather)
  "Rocks: igneous (from volcanoes), sedimentary (from layers), metamorphic (changed by heat/pressure); fossils form in sedimentary rock",
  "Weather and seasons: temperature, rainfall, and daylight hours change with seasons; UK has 4 seasons",
  // Simple chemistry (UK Year 4)
  "Changing materials: some changes are reversible (melting ice) and some are irreversible (burning, cooking)",
  "The water cycle: evaporation → condensation → precipitation → collection (rain fills rivers and seas)"
];

// Bonus subjects
const GEOGRAPHY_TOPICS = [
  "UK countries and capitals: England→London, Scotland→Edinburgh, Wales→Cardiff, Northern Ireland→Belfast",
  "European capitals: France→Paris, Germany→Berlin, Italy→Rome, Spain→Madrid, Portugal→Lisbon",
  "World continents: Africa, Antarctica, Asia, Australia, Europe, North America, South America",
  "Major oceans: Pacific, Atlantic, Indian, Arctic, Southern",
  "UK geography: River Thames, Ben Nevis (highest UK mountain), Loch Ness",
  "World capitals: China→Beijing, Japan→Tokyo, USA→Washington DC, Brazil→Brasília, Australia→Canberra",
  "Flags: UK (Union Jack), France (blue/white/red stripes), Japan (red circle on white)"
];

const HISTORY_TOPICS = [
  "Great Fire of London: started 1666, began in a bakery on Pudding Lane, destroyed much of the City",
  "Ancient Egypt: pyramids, pharaohs, River Nile, mummies, hieroglyphics",
  "Florence Nightingale: famous nurse in the Crimean War, known as the Lady with the Lamp",
  "Guy Fawkes and the Gunpowder Plot: 1605, tried to blow up the Houses of Parliament",
  "Neil Armstrong: first person on the Moon, 1969, Apollo 11 mission",
  "Queen Victoria: reigned 1837–1901, the Victorian era, longest-reigning monarch at the time",
  "The Tudors: Henry VIII had six wives; his daughter became Elizabeth I",
  "Stone Age → Bronze Age → Iron Age: order of early human history in Britain"
];

const MUSIC_TOPICS = [
  "Note values: semibreve=4 beats, minim=2 beats, crotchet=1 beat, quaver=half a beat",
  "Drum kit parts: snare drum, bass drum, hi-hat cymbals, ride cymbal, crash cymbal, tom-toms",
  "Time signatures: 4/4 means 4 crotchet beats per bar; 3/4 means 3 beats per bar (waltz feel)",
  "Dynamics: piano (p) = quiet, forte (f) = loud, mezzo-forte (mf) = medium loud",
  "Tempo words: allegro = fast, andante = walking pace, largo = slow",
  "Rhythm counting in 4/4: 1-and-2-and-3-and-4-and (quavers land on the 'and')",
  "Trinity Rock & Pop drum grades: Grade 1 (beginner) up to Grade 8 (advanced); Grade 5 is intermediate"
];

// ═══════════════════════════════════════════════════
// SYSTEM PROMPT
// ═══════════════════════════════════════════════════

function buildSystemPrompt(streak) {
  return `You are Arwen, Jinny's warm friendly learning coach. You sound like a kind older sibling — calm, encouraging, never harsh.

STUDENT: Jinny, age 8, UK Year 3. She is a drummer at Trinity Rock Grade 5 — really impressive! Reads English only. Dislikes long text. Likes quick wins and encouragement.

YOUR STYLE:
- Short sentences only. At most one emoji per message.
- Praise effort first, correct gently. Never sound disappointed.
- Keep it game-like and fun. Celebrate small wins.

SESSION FLOW (follow this order strictly):
1. "start quiz" → warm greeting, then English task immediately
2. English → judge → hint+retry if wrong → move to Maths
3. Maths → judge → hint+retry if wrong → move to Science
4. Science → judge → hint+retry if wrong → move to Chinese
5. Chinese → judge → hint+retry if wrong → move to Spanish
6. Spanish → judge → hint+retry if wrong → offer bonus round
7. Bonus offer: say "Brilliant work on all five! Want a bonus round? Pick one: Geography 🌍, History 📜, or Music 🥁" — wait for her choice
8. Bonus subject → judge → hint+retry if wrong → final summary with ALL points

TASK FORMATS:
- English: Pick one word from ENGLISH_BANK. Say: "Your word is '[word]'. Write one sentence using it." Judge generously.
- Maths: Start with MATH_TOPICS_G3. If she answers correctly on first try, next maths question comes from MATH_TOPICS_G4 and say "Level up! 🌟". If she struggles, stay with G3.
- Science: Pick one topic from SCIENCE_TOPICS. Make a fun A/B/C question with a curious, wonder-filled tone. Science should feel exciting and surprising!
- Chinese: Pick one item from CHINESE_BANK. Make A/B/C choice — what does it mean? Show character + pinyin.
- Spanish: Pick one item from SPANISH_BANK. Make A/B/C choice — what does it mean?
- Geography: Pick one topic from GEOGRAPHY_TOPICS. Make a fun A/B/C question.
- History: Pick one topic from HISTORY_TOPICS. Make a fun A/B/C question with a storytelling touch.
- Music: Pick one topic from MUSIC_TOPICS. Make A/B/C question. Drum questions are extra exciting for Jinny!

ATTEMPT RULES:
- First answer: judge kindly but honestly
- If wrong: give ONE short helpful hint, say "Try once more!"
- Second answer: judge it, move on regardless
- If wrong twice: give a simpler follow-up task, then move on

SCORING (report exact integer in points_this_turn):
- Correct first try: 8 points
- Correct/partial second try: 7 points
- Engaged but wrong both times: 5 points
- Follow-up correct bonus: +2 extra
- When session_complete=true: also add streak bonus of ${Math.min(streak,7)} points (current streak: ${streak} day${streak!==1?"s":""})

SPECIAL COMMANDS:
- "pause quiz" → acknowledge warmly, say spot is saved
- "resume quiz" → remind where she was, continue
- "geography" / "history" / "music" → start that bonus subject immediately
- "science" → start a science question immediately (even outside the normal flow)
- Message with "how is / progress / report / weak" → parent mode: give clear English summary, not a quiz answer

WORD BANKS:
ENGLISH_BANK=${JSON.stringify(ENGLISH_BANK)}
CHINESE_BANK=${JSON.stringify(CHINESE_BANK)}
SPANISH_BANK=${JSON.stringify(SPANISH_BANK)}
MATH_TOPICS_G3=${JSON.stringify(MATH_TOPICS_G3)}
MATH_TOPICS_G4=${JSON.stringify(MATH_TOPICS_G4)}
SCIENCE_TOPICS=${JSON.stringify(SCIENCE_TOPICS)}
GEOGRAPHY_TOPICS=${JSON.stringify(GEOGRAPHY_TOPICS)}
HISTORY_TOPICS=${JSON.stringify(HISTORY_TOPICS)}
MUSIC_TOPICS=${JSON.stringify(MUSIC_TOPICS)}

CRITICAL: Respond ONLY with valid JSON. No text before or after. No markdown fences.
{"reply":"message in English for Jinny","points_this_turn":0,"session_complete":false,"current_subject":"greeting"}
current_subject values: greeting|english|math|science|chinese|spanish|bonus_offer|geography|history|music|summary|pause|chat
session_complete: only true after final summary (after bonus OR if Jinny skips bonus)`;
}

// ═══════════════════════════════════════════════════
// SUBJECT BADGE COLOURS
// ═══════════════════════════════════════════════════

const SUBJECT_META = {
  english:    { label:"English",      bg:"#E6F1FB" },
  math:       { label:"Maths",        bg:"#EAF3DE" },
  science:    { label:"Science 🔬",   bg:"#E1F5EE" },
  chinese:    { label:"Chinese",      bg:"#FAEEDA" },
  spanish:    { label:"Spanish",      bg:"#FAECE7" },
  geography:  { label:"Geography 🌍", bg:"#EAF3DE" },
  history:    { label:"History 📜",   bg:"#FBEAF0" },
  music:      { label:"Music 🥁",     bg:"#EEEDFE" },
  bonus_offer:{ label:"Bonus time!",  bg:"#F1EFE8" },
  greeting:   { label:"Hi!",          bg:"#F1EFE8" },
  summary:    { label:"Done! 🎉",     bg:"#EAF3DE" },
};

// ═══════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════

export default function CoachApp() {
  const [msgs, setMsgs] = useState([]);
  const [apiHist, setApiHist] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPts, setTotalPts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [sessionPts, setSessionPts] = useState(0);
  const [ready, setReady] = useState(false);
  const logRef = useRef(null);

  // Load stats — checkpoint takes priority, seeds at 197 / streak 1
  useEffect(() => {
    (async () => {
      let pts = 197, str = 1;
      try {
        const ck = await window.storage.get("jinny:checkpoint");
        if (ck) { const c = JSON.parse(ck.value); pts = c.totalPoints || pts; str = c.streak || str; }
      } catch(e) {}
      try {
        const r = await window.storage.get("jinny:stats");
        if (r) {
          const s = JSON.parse(r.value);
          if ((s.totalPoints || 0) > pts) { pts = s.totalPoints; str = s.streak || str; }
        }
      } catch(e) {}
      setTotalPts(pts); setStreak(str);
      try {
        await window.storage.set("jinny:stats", JSON.stringify({
          totalPoints: pts, streak: str, lastSaved: new Date().toISOString()
        }));
      } catch(e) {}
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [msgs, loading]);

  async function saveStats(pts, str) {
    try {
      await window.storage.set("jinny:stats", JSON.stringify({
        totalPoints: pts, streak: str, lastSaved: new Date().toISOString()
      }));
    } catch(e) {}
  }

  async function send(text) {
    if (!text.trim() || loading) return;
    const t = text.trim();
    setInput("");
    const newHist = [...apiHist, { role:"user", content:t }];
    setApiHist(newHist);
    setMsgs(m => [...m, { role:"user", text:t }]);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system:buildSystemPrompt(streak),
          messages:newHist
        })
      });
      const data = await res.json();
      const raw = (data.content||[]).map(b=>b.text||"").join("");
      let reply="Hmm, something went wrong. Try again!", pts=0, complete=false, subject="chat";
      try {
        const p = JSON.parse(raw.replace(/```json|```/g,"").trim());
        reply=p.reply||reply; pts=Math.round(Number(p.points_this_turn)||0);
        complete=!!p.session_complete; subject=p.current_subject||subject;
      } catch(e) { reply=raw||reply; }

      const newSP=sessionPts+pts, newTotal=totalPts+pts;
      setSessionPts(newSP); setTotalPts(newTotal);
      setMsgs(m=>[...m,{role:"assistant",text:reply,pts:pts>0?pts:null,subject}]);
      setApiHist(h=>[...h,{role:"assistant",content:raw}]);

      let newStreak=streak;
      if (complete) {
        const today=new Date().toDateString();
        try {
          const r=await window.storage.get("jinny:lastSession");
          const last=r?r.value:null;
          const yday=new Date(); yday.setDate(yday.getDate()-1);
          if (last===yday.toDateString()) newStreak=streak+1;
          else if (last!==today) newStreak=1;
          setStreak(newStreak);
          await window.storage.set("jinny:lastSession",today);
        } catch(e) {}
        try {
          await window.storage.set("jinny:checkpoint", JSON.stringify({
            totalPoints:newTotal, streak:newStreak, savedAt:new Date().toISOString()
          }));
        } catch(e) {}
      }
      await saveStats(newTotal, newStreak);
    } catch(e) {
      setMsgs(m=>[...m,{role:"assistant",text:"Oops! Could not connect. Error: "+e.message}]);
    }
    setLoading(false);
  }

  const SubjectBadge = ({s}) => {
    const meta = SUBJECT_META[s];
    if (!meta) return null;
    return <span style={{display:"inline-block",fontSize:11,padding:"2px 8px",borderRadius:99,background:meta.bg,color:"var(--color-text-secondary)",marginBottom:4}}>{meta.label}</span>;
  };

  const qBtn = (label, cmd) => (
    <button key={cmd} onClick={()=>send(cmd)} disabled={loading} style={{
      fontSize:13,padding:"6px 12px",borderRadius:"var(--border-radius-md)",
      border:"0.5px solid var(--color-border-secondary)",
      background:"var(--color-background-primary)",color:"var(--color-text-primary)",
      cursor:"pointer",opacity:loading?0.5:1,whiteSpace:"nowrap"
    }}>{label}</button>
  );

  return (
    <div style={{fontFamily:"var(--font-sans)",maxWidth:580,margin:"0 auto",padding:"1rem"}}>
      <h2 className="sr-only">Jinny's learning coach</h2>

      {/* Score bar */}
      <div style={{display:"flex",alignItems:"center",gap:16,padding:"10px 16px",background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",marginBottom:12}}>
        <span style={{fontSize:20}}>⭐</span>
        <div>
          <div style={{fontSize:22,fontWeight:500,color:"var(--color-text-primary)",lineHeight:1}}>{ready?totalPts:"…"}</div>
          <div style={{fontSize:11,color:"var(--color-text-secondary)"}}>total points</div>
        </div>
        <div style={{width:"0.5px",height:32,background:"var(--color-border-tertiary)"}}/>
        <div>
          <div style={{fontSize:22,fontWeight:500,color:"var(--color-text-primary)",lineHeight:1}}>{ready?streak:"…"}</div>
          <div style={{fontSize:11,color:"var(--color-text-secondary)"}}>day streak 🔥</div>
        </div>
        {sessionPts>0 && <div style={{marginLeft:"auto",fontSize:13,fontWeight:500,color:"#185FA5"}}>+{sessionPts} today</div>}
      </div>

      {/* Chat log */}
      <div ref={logRef} style={{display:"flex",flexDirection:"column",gap:10,minHeight:260,maxHeight:420,overflowY:"auto",marginBottom:10,padding:"4px 0"}}>
        {msgs.length===0 && (
          <div style={{color:"var(--color-text-secondary)",fontSize:14,padding:"3rem 0",textAlign:"center"}}>
            Hit <strong>Start quiz</strong> to begin! 👋
          </div>
        )}
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",flexDirection:"column",alignItems:m.role==="user"?"flex-end":"flex-start"}}>
            {m.role==="assistant"&&m.subject&&<SubjectBadge s={m.subject}/>}
            <div style={{
              padding:"10px 14px",borderRadius:"var(--border-radius-lg)",maxWidth:"88%",
              fontSize:15,lineHeight:1.65,whiteSpace:"pre-wrap",
              background:m.role==="user"?"#E6F1FB":"var(--color-background-secondary)",
              color:m.role==="user"?"#0C447C":"var(--color-text-primary)",
              border:m.role==="user"?"none":"0.5px solid var(--color-border-tertiary)"
            }}>{m.text}</div>
            {m.pts&&<div style={{fontSize:12,color:"#3B6D11",fontWeight:500,marginTop:2,padding:"0 4px"}}>+{m.pts} pts ✓</div>}
          </div>
        ))}
        {loading&&<div style={{alignSelf:"flex-start",padding:"10px 14px",background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",color:"var(--color-text-secondary)",fontSize:15}}>...</div>}
      </div>

      {/* Buttons — two rows */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:6}}>
        {qBtn("Start quiz ▶","start quiz")}
        {qBtn("Pause","pause quiz")}
        {qBtn("Resume","resume quiz")}
        {qBtn("Science 🔬","science")}
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>
        {qBtn("Geography 🌍","geography")}
        {qBtn("History 📜","history")}
        {qBtn("Music 🥁","music")}
      </div>

      {/* Input */}
      <div style={{display:"flex",gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&send(input)}
          placeholder="Type your answer here..." disabled={loading}
          style={{flex:1,padding:"10px 14px",borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",color:"var(--color-text-primary)",fontSize:15}}
        />
        <button onClick={()=>send(input)} disabled={loading||!input.trim()} style={{
          padding:"10px 20px",borderRadius:"var(--border-radius-md)",
          border:"0.5px solid var(--color-border-secondary)",
          background:"var(--color-background-primary)",color:"var(--color-text-primary)",
          fontSize:15,cursor:"pointer",fontWeight:500,
          opacity:(loading||!input.trim())?0.4:1
        }}>Send ↗</button>
      </div>
    </div>
  );
}
