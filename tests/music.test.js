import test from"node:test";import assert from"node:assert/strict";import{midiToNote,noteToMidi,frequencyForMidi,isCorrectMidi,pianoRange,staffStep,renderStaff}from"../src/music.js";import{GROUPS,LESSONS}from"../src/curriculum.js";
test("88-key piano MIDI boundaries",()=>{assert.equal(pianoRange.length,88);assert.equal(pianoRange[0],21);assert.equal(pianoRange.at(-1),108);assert.deepEqual(midiToNote(21),{name:"A",octave:0,midi:21});assert.equal(midiToNote(108).name,"C");assert.equal(midiToNote(108).octave,8)});
test("MIDI conversion round-trips",()=>{for(let m=0;m<=127;m++){const n=midiToNote(m);assert.equal(noteToMidi(n.name,n.octave),m)}});
test("A4 is tuning reference",()=>{assert.equal(frequencyForMidi(69),440)});
test("answer check includes octave",()=>{assert.ok(isCorrectMidi(60,60));assert.ok(!isCorrectMidi(60,72))});
test("curriculum has expected independent clef groups and unique lessons",()=>{assert.equal(GROUPS.length,10);assert.equal(LESSONS.length,49);assert.equal(new Set(LESSONS.map(l=>l.id)).size,49)});
test("treble and bass line positions match diatonic staff",()=>{assert.deepEqual([64,67,71,74,77].map(m=>staffStep(m,"treble")),[0,2,4,6,8]);assert.deepEqual([43,47,50,53,57].map(m=>staffStep(m,"bass")),[0,2,4,6,8])});
test("staff renderer supports hidden quiz label and ledger C4",()=>{assert.match(renderStaff(60,"treble",{showLabel:false}),/Identify the note/);assert.match(renderStaff(60,"treble"),/class="ledger-line"/);assert.match(renderStaff(64,"treble"),/E4/)});
test("sharp note is represented in staff glyph",()=>{assert.match(renderStaff(61,"treble"),/♯/);assert.equal(midiToNote(61).name,"C♯")});

test("staff spaces and ledger positions use correct diatonic steps",()=>{assert.deepEqual([65,69,72,76].map(m=>staffStep(m,"treble")),[1,3,5,7]);assert.deepEqual([45,48,52,55].map(m=>staffStep(m,"bass")),[1,3,5,7]);assert.equal(staffStep(60,"treble"),-2);assert.equal(staffStep(60,"bass"),10);assert.match(renderStaff(60,"bass"),/class="ledger-line"/)});

test("curriculum includes independent rhythm and rest lessons with beat values",()=>{const rhythm=LESSONS.filter(l=>l.kind==="rhythm");assert.equal(rhythm.length,12);assert.deepEqual(rhythm.map(l=>l.rhythmId),["whole","half","quarter","eighth","sixteenth","whole-rest","half-rest","quarter-rest","dotted-half","dotted-quarter","eighth-rest","sixteenth-rest"]);assert.ok(rhythm.every(l=>Number.isFinite(l.value)&&l.symbol));});

test("flat spellings map to the correct MIDI pitch and staff letter position",()=>{assert.equal(noteToMidi("D♭",4),61);assert.equal(noteToMidi("E♭",4),63);assert.equal(noteToMidi("G♭",4),66);assert.equal(noteToMidi("A♭",4),68);assert.equal(noteToMidi("B♭",4),70);assert.equal(staffStep(61,"treble","D♭"),-1);assert.match(renderStaff(61,"treble",{spelling:"D♭"}),/♭/);assert.match(renderStaff(61,"treble",{spelling:"D♭"}),/D♭4/)});
