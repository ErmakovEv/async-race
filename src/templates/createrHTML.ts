
export default function createViewElem<T extends keyof HTMLElementTagNameMap>
(tag: T,
 classList?: string[],
 id?: string,
 content?: string,
 event?: [string, () => void],) : HTMLElementTagNameMap[T] {
const elem = document.createElement(tag);
elem.classList.add(...classList);
if(id) {
  elem.id = id;
}
if(event) {
  elem.addEventListener(event[0], event[1]);
}
if(content) {
  elem.textContent = content;
}
return elem;
}