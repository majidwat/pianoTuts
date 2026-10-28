import test from"node:test";import assert from"node:assert/strict";import{midiToNote,noteToMidi,frequencyForMidi,isCorrectMidi,pianoRange,staffStep,renderStaff}from"../src/music.js";import{GROUPS,LESSONS}from"../src/curriculum.js";
test("88-key piano MIDI boundaries",()=>{assert.equal(pianoRange.length,88);assert.equal(pianoRange[0],21);assert.equal(pianoRange.at(-1),108);assert.deepEqual(midiToNote(21),{name:"A",octave:0,midi:21});assert.equal(midiToNote(108).name,"C");assert.equal(midiToNote(108).octave,8)});
test("MIDI conversion round-trips",()=>{for(let m=0;m<=127;m++){const n=midiToNote(m);assert.equal(noteToMidi(n.name,n.octave),m)}});
test("A4 is tuning reference",()=>{assert.equal(frequencyForMidi(69),440)});
test("answer check includes octave",()=>{assert.ok(isCorrectMidi(60,60));assert.ok(!isCorrectMidi(60,72))});
test("curriculum has expected independent clef groups and unique lessons",()=>{assert.equal(GROUPS.length,8);assert.equal(LESSONS.length,32);assert.equal(new Set(LESSONS.map(l=>l.id)).size,32)});
test("treble and bass line positions match diatonic staff",()=>{assert.deepEqual([64,67,71,74,77].map(m=>staffStep(m,"treble")),[0,2,4,6,8]);assert.deepEqual([43,47,50,53,57].map(m=>staffStep(m,"bass")),[0,2,4,6,8])});
test("staff renderer supports hidden quiz label and ledger C4",()=>{assert.match(renderStaff(60,"treble",{showLabel:false}),/Identify the note/);assert.match(renderStaff(60,"treble"),/y1="120"/);assert.match(renderStaff(64,"treble"),/E4/)});
test("sharp note is represented in staff glyph",()=>{assert.match(renderStaff(61,"treble"),/♯/);assert.equal(midiToNote(61).name,"C♯")});
