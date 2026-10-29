export const NAMES=["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"];
const LETTER_INDEX={C:0,D:1,E:2,F:3,G:4,A:5,B:6};
export const midiToNote=m=>({name:NAMES[((m%12)+12)%12],octave:Math.floor(m/12)-1,midi:m});
export const noteToMidi=(name,oct)=>{const i=NAMES.indexOf(name);if(i<0||!Number.isInteger(+oct))return null;const m=(+oct+1)*12+i;return m>=0&&m<=127?m:null};
export const frequencyForMidi=m=>440*2**((m-69)/12);
export const isCorrectMidi=(a,b)=>Number(a)===Number(b);
export const pianoRange=Array.from({length:88},(_,i)=>i+21);
/** Diatonic staff steps relative to the bottom line (E4 treble, G2 bass). */
export function staffStep(m,clef){
 const n=midiToNote(m),letter=n.name.replace("♯",""),base=clef==="treble"?{octave:4,letter:"E"}:{octave:2,letter:"G"};
 return (n.octave-base.octave)*7+LETTER_INDEX[letter]-LETTER_INDEX[base.letter];
}
/**
 * Draw a single pitch with exact diatonic placement and ledger lines.
 * The viewBox expands vertically for ledger notes so no target pitch is clipped.
 */
export function renderStaff(m,clef,{showLabel=true}={}){
 const step=staffStep(m,clef),noteY=103-step*8.5,staffTop=35,staffBottom=103,x=300;
 const lines=Array.from({length:5},(_,i)=>{const y=staffTop+i*17;return `<line class="staff-line" x1="60" y1="${y}" x2="540" y2="${y}" stroke="#333b4a" stroke-width="1.5"/>`}).join("");
 const ledgerSteps=[];
 for(let s=-2;s>=step;s-=2)ledgerSteps.push(s);
 for(let s=10;s<=step;s+=2)ledgerSteps.push(s);
 const ledger=ledgerSteps.map(s=>{const y=staffBottom-s*8.5;return `<line class="ledger-line" x1="275" y1="${y}" x2="325" y2="${y}" stroke="#333b4a" stroke-width="1.5"/>`}).join("");
 const n=midiToNote(m),accidental=n.name.includes("♯")?`<text class="accidental" x="270" y="${noteY+5}" font-size="24" fill="#252c38" text-anchor="middle">♯</text>`:"";
 const label=showLabel?`<text x="470" y="22" fill="#778295" font-size="13" text-anchor="middle">${n.name}${n.octave}</text>`:"";
 const stemEnd=Math.max(staffTop-8,noteY-45);
 const stem=`<line class="note-stem" x1="${x+10}" y1="${noteY}" x2="${x+10}" y2="${stemEnd}" stroke="#252c38" stroke-width="2"/>`;
 const notehead=`<ellipse class="notehead" cx="${x}" cy="${noteY}" rx="12" ry="8" fill="#b9f27c" stroke="#253322" transform="rotate(-18 ${x} ${noteY})"/>`;
 const clefGlyph=clef==="treble"?"𝄞":"𝄢";
 const clef=`<text x="105" y="95" font-size="65" fill="#414b5c" text-anchor="middle">${clefGlyph}</text>`;
 const minY=Math.min(0,staffTop,noteY-28,...ledgerSteps.map(s=>staffBottom-s*8.5))-4;
 const maxY=Math.max(150,staffBottom,noteY+28,...ledgerSteps.map(s=>staffBottom-s*8.5))+4;
 return `<svg viewBox="0 ${minY} 600 ${maxY-minY}" role="img" aria-label="${showLabel?n.name+n.octave:"Identify the note on the staff"}" xmlns="http://www.w3.org/2000/svg">${clef}${lines}${ledger}${accidental}${notehead}${stem}${label}</svg>`;
}