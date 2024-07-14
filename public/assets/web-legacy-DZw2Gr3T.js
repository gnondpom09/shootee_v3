System.register(["./UserProfile-legacy-RRoALqem.js","./user.service-legacy-DUo5nyxz.js","./index-legacy-22x3WcrL.js","./_plugin-vue_export-helper-legacy-DgAO6S8O.js"],(function(t,e){"use strict";var i,r,o;return{setters:[t=>{i=t.W,r=t.b,o=t.E},null,null,null],execute:function(){function e(t){const e=t.split("/").filter((t=>"."!==t)),i=[];return e.forEach((t=>{".."===t&&i.length>0&&".."!==i[i.length-1]?i.pop():i.push(t)})),i.join("/")}class s extends i{constructor(){super(...arguments),this.DB_VERSION=1,this.DB_NAME="Disc",this._writeCmds=["add","put","delete"],this.downloadFile=async t=>{var e,i;const o=r(t,t.webFetchExtra),s=await fetch(t.url,o);let a;if(t.progress)if(null==s?void 0:s.body){const e=s.body.getReader();let i=0;const r=[],o=s.headers.get("content-type"),n=parseInt(s.headers.get("content-length")||"0",10);for(;;){const{done:o,value:s}=await e.read();if(o)break;r.push(s),i+=(null==s?void 0:s.length)||0;const a={url:t.url,bytes:i,contentLength:n};this.notifyListeners("progress",a)}const c=new Uint8Array(i);let d=0;for(const t of r)void 0!==t&&(c.set(t,d),d+=t.length);a=new Blob([c.buffer],{type:o||void 0})}else a=new Blob;else a=await s.blob();return{path:(await this.writeFile({path:t.path,directory:null!==(e=t.directory)&&void 0!==e?e:void 0,recursive:null!==(i=t.recursive)&&void 0!==i&&i,data:a})).uri,blob:a}}}async initDb(){if(void 0!==this._db)return this._db;if(!("indexedDB"in window))throw this.unavailable("This browser doesn't support IndexedDB");return new Promise(((t,e)=>{const i=indexedDB.open(this.DB_NAME,this.DB_VERSION);i.onupgradeneeded=s.doUpgrade,i.onsuccess=()=>{this._db=i.result,t(i.result)},i.onerror=()=>e(i.error),i.onblocked=()=>{console.warn("db blocked")}}))}static doUpgrade(t){const e=t.target.result;t.oldVersion,e.objectStoreNames.contains("FileStorage")&&e.deleteObjectStore("FileStorage"),e.createObjectStore("FileStorage",{keyPath:"path"}).createIndex("by_folder","folder")}async dbRequest(t,e){const i=-1!==this._writeCmds.indexOf(t)?"readwrite":"readonly";return this.initDb().then((r=>new Promise(((o,s)=>{const a=r.transaction(["FileStorage"],i).objectStore("FileStorage")[t](...e);a.onsuccess=()=>o(a.result),a.onerror=()=>s(a.error)}))))}async dbIndexRequest(t,e,i){const r=-1!==this._writeCmds.indexOf(e)?"readwrite":"readonly";return this.initDb().then((o=>new Promise(((s,a)=>{const n=o.transaction(["FileStorage"],r).objectStore("FileStorage").index(t)[e](...i);n.onsuccess=()=>s(n.result),n.onerror=()=>a(n.error)}))))}getPath(t,e){const i=void 0!==e?e.replace(/^[/]+|[/]+$/g,""):"";let r="";return void 0!==t&&(r+="/"+t),""!==e&&(r+="/"+i),r}async clear(){(await this.initDb()).transaction(["FileStorage"],"readwrite").objectStore("FileStorage").clear()}async readFile(t){const e=this.getPath(t.directory,t.path),i=await this.dbRequest("get",[e]);if(void 0===i)throw Error("File does not exist.");return{data:i.content?i.content:""}}async writeFile(t){const e=this.getPath(t.directory,t.path);let i=t.data;const r=t.encoding,o=t.recursive,s=await this.dbRequest("get",[e]);if(s&&"directory"===s.type)throw Error("The supplied path is a directory.");const a=e.substr(0,e.lastIndexOf("/"));if(void 0===await this.dbRequest("get",[a])){const e=a.indexOf("/",1);if(-1!==e){const i=a.substr(e);await this.mkdir({path:i,directory:t.directory,recursive:o})}}if(!(r||i instanceof Blob||(i=i.indexOf(",")>=0?i.split(",")[1]:i,this.isBase64String(i))))throw Error("The supplied data is not valid base64 content.");const n=Date.now(),c={path:e,folder:a,type:"file",size:i instanceof Blob?i.size:i.length,ctime:n,mtime:n,content:i};return await this.dbRequest("put",[c]),{uri:c.path}}async appendFile(t){const e=this.getPath(t.directory,t.path);let i=t.data;const r=t.encoding,o=e.substr(0,e.lastIndexOf("/")),s=Date.now();let a=s;const n=await this.dbRequest("get",[e]);if(n&&"directory"===n.type)throw Error("The supplied path is a directory.");if(void 0===await this.dbRequest("get",[o])){const e=o.indexOf("/",1);if(-1!==e){const i=o.substr(e);await this.mkdir({path:i,directory:t.directory,recursive:!0})}}if(!r&&!this.isBase64String(i))throw Error("The supplied data is not valid base64 content.");if(void 0!==n){if(n.content instanceof Blob)throw Error("The occupied entry contains a Blob object which cannot be appended to.");i=void 0===n.content||r?n.content+i:btoa(atob(n.content)+atob(i)),a=n.ctime}const c={path:e,folder:o,type:"file",size:i.length,ctime:a,mtime:s,content:i};await this.dbRequest("put",[c])}async deleteFile(t){const e=this.getPath(t.directory,t.path);if(void 0===await this.dbRequest("get",[e]))throw Error("File does not exist.");if(0!==(await this.dbIndexRequest("by_folder","getAllKeys",[IDBKeyRange.only(e)])).length)throw Error("Folder is not empty.");await this.dbRequest("delete",[e])}async mkdir(t){const e=this.getPath(t.directory,t.path),i=t.recursive,r=e.substr(0,e.lastIndexOf("/")),o=(e.match(/\//g)||[]).length,s=await this.dbRequest("get",[r]),a=await this.dbRequest("get",[e]);if(1===o)throw Error("Cannot create Root directory");if(void 0!==a)throw Error("Current directory does already exist.");if(!i&&2!==o&&void 0===s)throw Error("Parent directory must exist");if(i&&2!==o&&void 0===s){const e=r.substr(r.indexOf("/",1));await this.mkdir({path:e,directory:t.directory,recursive:i})}const n=Date.now(),c={path:e,folder:r,type:"directory",size:0,ctime:n,mtime:n};await this.dbRequest("put",[c])}async rmdir(t){const{path:e,directory:i,recursive:r}=t,o=this.getPath(i,e),s=await this.dbRequest("get",[o]);if(void 0===s)throw Error("Folder does not exist.");if("directory"!==s.type)throw Error("Requested path is not a directory");const a=await this.readdir({path:e,directory:i});if(0!==a.files.length&&!r)throw Error("Folder is not empty");for(const n of a.files){const t=`${e}/${n.name}`;"file"===(await this.stat({path:t,directory:i})).type?await this.deleteFile({path:t,directory:i}):await this.rmdir({path:t,directory:i,recursive:r})}await this.dbRequest("delete",[o])}async readdir(t){const e=this.getPath(t.directory,t.path),i=await this.dbRequest("get",[e]);if(""!==t.path&&void 0===i)throw Error("Folder does not exist.");const r=await this.dbIndexRequest("by_folder","getAllKeys",[IDBKeyRange.only(e)]);return{files:await Promise.all(r.map((async t=>{let i=await this.dbRequest("get",[t]);return void 0===i&&(i=await this.dbRequest("get",[t+"/"])),{name:t.substring(e.length+1),type:i.type,size:i.size,ctime:i.ctime,mtime:i.mtime,uri:i.path}})))}}async getUri(t){const e=this.getPath(t.directory,t.path);let i=await this.dbRequest("get",[e]);return void 0===i&&(i=await this.dbRequest("get",[e+"/"])),{uri:(null==i?void 0:i.path)||e}}async stat(t){const e=this.getPath(t.directory,t.path);let i=await this.dbRequest("get",[e]);if(void 0===i&&(i=await this.dbRequest("get",[e+"/"])),void 0===i)throw Error("Entry does not exist.");return{type:i.type,size:i.size,ctime:i.ctime,mtime:i.mtime,uri:i.path}}async rename(t){await this._copy(t,!0)}async copy(t){return this._copy(t,!1)}async requestPermissions(){return{publicStorage:"granted"}}async checkPermissions(){return{publicStorage:"granted"}}async _copy(t,i=!1){let{toDirectory:r}=t;const{to:s,from:a,directory:n}=t;if(!s||!a)throw Error("Both to and from must be provided");r||(r=n);const c=this.getPath(n,a),d=this.getPath(r,s);if(c===d)return{uri:d};if(function(t,i){t=e(t),i=e(i);const r=t.split("/"),o=i.split("/");return t!==i&&r.every(((t,e)=>t===o[e]))}(c,d))throw Error("To path cannot contain the from path");let h;try{h=await this.stat({path:s,directory:r})}catch(p){const t=s.split("/");t.pop();const e=t.join("/");if(t.length>0&&"directory"!==(await this.stat({path:e,directory:r})).type)throw new Error("Parent directory of the to path is a file")}if(h&&"directory"===h.type)throw new Error("Cannot overwrite a directory with a file");const l=await this.stat({path:a,directory:n}),u=async(t,e,i)=>{const o=this.getPath(r,t),s=await this.dbRequest("get",[o]);s.ctime=e,s.mtime=i,await this.dbRequest("put",[s])},y=l.ctime?l.ctime:Date.now();switch(l.type){case"file":{const t=await this.readFile({path:a,directory:n});let e;i&&await this.deleteFile({path:a,directory:n}),t.data instanceof Blob||this.isBase64String(t.data)||(e=o.UTF8);const c=await this.writeFile({path:s,directory:r,data:t.data,encoding:e});return i&&await u(s,y,l.mtime),c}case"directory":{if(h)throw Error("Cannot move a directory over an existing object");try{await this.mkdir({path:s,directory:r,recursive:!1}),i&&await u(s,y,l.mtime)}catch(p){}const t=(await this.readdir({path:a,directory:n})).files;for(const e of t)await this._copy({from:`${a}/${e.name}`,to:`${s}/${e.name}`,directory:n,toDirectory:r},i);i&&await this.rmdir({path:a,directory:n})}}return{uri:d}}isBase64String(t){try{return btoa(atob(t))==t}catch(e){return!1}}}t("FilesystemWeb",s),s._debug=!0}}}));
