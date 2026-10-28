export const PROGRESS_VERSION=2;
export function emptyProgress(){return{version:PROGRESS_VERSION,completed:[],lastLessonId:null,attempts:{},assessments:[]}}
function uniqueValid(ids,validIds){const unique=[...new Set(Array.isArray(ids)?ids.filter(id=>typeof id==="string"):[])];return validIds?.length?unique.filter(id=>validIds.includes(id)):unique}
export function parseProgress(raw,validIds=[]){const empty=emptyProgress();if(raw==null||raw==="")return empty;let value;try{value=typeof raw==="string"?JSON.parse(raw):raw}catch{return empty}
if(Array.isArray(value)){empty.completed=uniqueValid(value,validIds);return empty}
if(!value||typeof value!=="object")return empty;
empty.completed=uniqueValid(value.completed,validIds);
empty.lastLessonId=typeof value.lastLessonId==="string"&&(!validIds.length||validIds.includes(value.lastLessonId))?value.lastLessonId:null;
if(value.attempts&&typeof value.attempts==="object"&&!Array.isArray(value.attempts)){for(const[id,stats]of Object.entries(value.attempts)){if(validIds.length&&!validIds.includes(id))continue;const attempts=Math.max(0,Math.floor(Number(stats?.attempts)||0)),correct=Math.max(0,Math.min(attempts,Math.floor(Number(stats?.correct)||0)));if(attempts)empty.attempts[id]={attempts,correct,accuracy:Math.round(correct/attempts*100)}}}
if(Array.isArray(value.assessments))empty.assessments=value.assessments.filter(a=>a&&Number.isFinite(a.score)&&Number.isFinite(a.total)).slice(-100);
return empty}
export function markCompleted(progress,lessonId){return{...progress,completed:[...new Set([...progress.completed,lessonId])]}}
export function setLastLesson(progress,lessonId){return{...progress,lastLessonId:lessonId}}
export function recordAttempt(progress,lessonId,correct){const previous=progress.attempts[lessonId]||{attempts:0,correct:0};const attempts=previous.attempts+1,correctCount=previous.correct+(correct?1:0);return{...progress,attempts:{...progress.attempts,[lessonId]:{attempts,correct:correctCount,accuracy:Math.round(correctCount/attempts*100)}}}}
export function recordAssessment(progress,result){return{...progress,assessments:[...progress.assessments,{score:result.score,total:result.total,accuracy:result.accuracy,at:new Date().toISOString()}].slice(-100)}}
export function readProgress(storage,validIds=[]){try{return parseProgress(storage?.getItem("naghmeh-progress-v2")??storage?.getItem("naghmeh-progress-v1"),validIds)}catch{return emptyProgress()}}
export function writeProgress(storage,progress){try{storage?.setItem("naghmeh-progress-v2",JSON.stringify({...progress,version:PROGRESS_VERSION}));return true}catch{return false}}
