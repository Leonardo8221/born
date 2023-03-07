"use strict";(self.webpackChunkdashboard_app=self.webpackChunkdashboard_app||[]).push([[9647],{"./node_modules/@babel/runtime/helpers/esm/defineProperty.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}__webpack_require__.d(__webpack_exports__,{Z:()=>_defineProperty})},"./node_modules/@babel/runtime/helpers/esm/extends.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}__webpack_require__.d(__webpack_exports__,{Z:()=>_extends})},"./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}__webpack_require__.d(__webpack_exports__,{Z:()=>_objectWithoutProperties})},"./node_modules/attr-accept/dist/es/index.js":(__unused_webpack_module,exports)=>{exports.Z=function(file,acceptedFiles){if(file&&acceptedFiles){var acceptedFilesArray=Array.isArray(acceptedFiles)?acceptedFiles:acceptedFiles.split(","),fileName=file.name||"",mimeType=(file.type||"").toLowerCase(),baseMimeType=mimeType.replace(/\/.*$/,"");return acceptedFilesArray.some((function(type){var validType=type.trim().toLowerCase();return"."===validType.charAt(0)?fileName.toLowerCase().endsWith(validType):validType.endsWith("/*")?baseMimeType===validType.replace(/\/.*$/,""):mimeType===validType}))}return!0}},"./node_modules/clsx/dist/clsx.m.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=function clsx(){for(var e,t,f=0,n="";f<arguments.length;)(e=arguments[f++])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}},"./node_modules/react-dropzone/dist/es/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{uI:()=>useDropzone});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types);function __awaiter(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){result.done?resolve(result.value):function adopt(value){return value instanceof P?value:new P((function(resolve){resolve(value)}))}(result.value).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))}function __generator(thisArg,body){var f,y,t,g,_={label:0,sent:function(){if(1&t[0])throw t[1];return t[1]},trys:[],ops:[]};return g={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return function step(op){if(f)throw new TypeError("Generator is already executing.");for(;g&&(g=0,op[0]&&(_=0)),_;)try{if(f=1,y&&(t=2&op[0]?y.return:op[0]?y.throw||((t=y.return)&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;switch(y=0,t&&(op=[2&op[0],t.value]),op[0]){case 0:case 1:t=op;break;case 4:return _.label++,{value:op[1],done:!1};case 5:_.label++,y=op[1],op=[0];continue;case 7:op=_.ops.pop(),_.trys.pop();continue;default:if(!(t=_.trys,(t=t.length>0&&t[t.length-1])||6!==op[0]&&2!==op[0])){_=0;continue}if(3===op[0]&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(6===op[0]&&_.label<t[1]){_.label=t[1],t=op;break}if(t&&_.label<t[2]){_.label=t[2],_.ops.push(op);break}t[2]&&_.ops.pop(),_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e],y=0}finally{f=t=0}if(5&op[0])throw op[1];return{value:op[0]?op[1]:void 0,done:!0}}([n,v])}}}Object.create;function __read(o,n){var m="function"==typeof Symbol&&o[Symbol.iterator];if(!m)return o;var r,e,i=m.call(o),ar=[];try{for(;(void 0===n||n-- >0)&&!(r=i.next()).done;)ar.push(r.value)}catch(error){e={error}}finally{try{r&&!r.done&&(m=i.return)&&m.call(i)}finally{if(e)throw e.error}}return ar}function __spreadArray(to,from,pack){if(pack||2===arguments.length)for(var ar,i=0,l=from.length;i<l;i++)!ar&&i in from||(ar||(ar=Array.prototype.slice.call(from,0,i)),ar[i]=from[i]);return to.concat(ar||Array.prototype.slice.call(from))}Object.create;var COMMON_MIME_TYPES=new Map([["aac","audio/aac"],["abw","application/x-abiword"],["arc","application/x-freearc"],["avif","image/avif"],["avi","video/x-msvideo"],["azw","application/vnd.amazon.ebook"],["bin","application/octet-stream"],["bmp","image/bmp"],["bz","application/x-bzip"],["bz2","application/x-bzip2"],["cda","application/x-cdf"],["csh","application/x-csh"],["css","text/css"],["csv","text/csv"],["doc","application/msword"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],["eot","application/vnd.ms-fontobject"],["epub","application/epub+zip"],["gz","application/gzip"],["gif","image/gif"],["heic","image/heic"],["heif","image/heif"],["htm","text/html"],["html","text/html"],["ico","image/vnd.microsoft.icon"],["ics","text/calendar"],["jar","application/java-archive"],["jpeg","image/jpeg"],["jpg","image/jpeg"],["js","text/javascript"],["json","application/json"],["jsonld","application/ld+json"],["mid","audio/midi"],["midi","audio/midi"],["mjs","text/javascript"],["mp3","audio/mpeg"],["mp4","video/mp4"],["mpeg","video/mpeg"],["mpkg","application/vnd.apple.installer+xml"],["odp","application/vnd.oasis.opendocument.presentation"],["ods","application/vnd.oasis.opendocument.spreadsheet"],["odt","application/vnd.oasis.opendocument.text"],["oga","audio/ogg"],["ogv","video/ogg"],["ogx","application/ogg"],["opus","audio/opus"],["otf","font/otf"],["png","image/png"],["pdf","application/pdf"],["php","application/x-httpd-php"],["ppt","application/vnd.ms-powerpoint"],["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],["rar","application/vnd.rar"],["rtf","application/rtf"],["sh","application/x-sh"],["svg","image/svg+xml"],["swf","application/x-shockwave-flash"],["tar","application/x-tar"],["tif","image/tiff"],["tiff","image/tiff"],["ts","video/mp2t"],["ttf","font/ttf"],["txt","text/plain"],["vsd","application/vnd.visio"],["wav","audio/wav"],["weba","audio/webm"],["webm","video/webm"],["webp","image/webp"],["woff","font/woff"],["woff2","font/woff2"],["xhtml","application/xhtml+xml"],["xls","application/vnd.ms-excel"],["xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],["xml","application/xml"],["xul","application/vnd.mozilla.xul+xml"],["zip","application/zip"],["7z","application/x-7z-compressed"],["mkv","video/x-matroska"],["mov","video/quicktime"],["msg","application/vnd.ms-outlook"]]);function toFileWithPath(file,path){var f=function withMimeType(file){var name=file.name;if(name&&-1!==name.lastIndexOf(".")&&!file.type){var ext=name.split(".").pop().toLowerCase(),type=COMMON_MIME_TYPES.get(ext);type&&Object.defineProperty(file,"type",{value:type,writable:!1,configurable:!1,enumerable:!0})}return file}(file);if("string"!=typeof f.path){var webkitRelativePath=file.webkitRelativePath;Object.defineProperty(f,"path",{value:"string"==typeof path?path:"string"==typeof webkitRelativePath&&webkitRelativePath.length>0?webkitRelativePath:file.name,writable:!1,configurable:!1,enumerable:!0})}return f}var FILES_TO_IGNORE=[".DS_Store","Thumbs.db"];function isObject(v){return"object"==typeof v&&null!==v}function getInputFiles(evt){return fromList(evt.target.files).map((function(file){return toFileWithPath(file)}))}function getFsHandleFiles(handles){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(_a){switch(_a.label){case 0:return[4,Promise.all(handles.map((function(h){return h.getFile()})))];case 1:return[2,_a.sent().map((function(file){return toFileWithPath(file)}))]}}))}))}function getDataTransferFiles(dt,type){return __awaiter(this,void 0,void 0,(function(){var items;return __generator(this,(function(_a){switch(_a.label){case 0:return dt.items?(items=fromList(dt.items).filter((function(item){return"file"===item.kind})),"drop"!==type?[2,items]:[4,Promise.all(items.map(toFilePromises))]):[3,2];case 1:return[2,noIgnoredFiles(flatten(_a.sent()))];case 2:return[2,noIgnoredFiles(fromList(dt.files).map((function(file){return toFileWithPath(file)})))]}}))}))}function noIgnoredFiles(files){return files.filter((function(file){return-1===FILES_TO_IGNORE.indexOf(file.name)}))}function fromList(items){if(null===items)return[];for(var files=[],i=0;i<items.length;i++){var file=items[i];files.push(file)}return files}function toFilePromises(item){if("function"!=typeof item.webkitGetAsEntry)return fromDataTransferItem(item);var entry=item.webkitGetAsEntry();return entry&&entry.isDirectory?fromDirEntry(entry):fromDataTransferItem(item)}function flatten(items){return items.reduce((function(acc,files){return __spreadArray(__spreadArray([],__read(acc),!1),__read(Array.isArray(files)?flatten(files):[files]),!1)}),[])}function fromDataTransferItem(item){var file=item.getAsFile();if(!file)return Promise.reject("".concat(item," is not a File"));var fwp=toFileWithPath(file);return Promise.resolve(fwp)}function fromEntry(entry){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(_a){return[2,entry.isDirectory?fromDirEntry(entry):fromFileEntry(entry)]}))}))}function fromDirEntry(entry){var reader=entry.createReader();return new Promise((function(resolve,reject){var entries=[];!function readEntries(){var _this=this;reader.readEntries((function(batch){return __awaiter(_this,void 0,void 0,(function(){var files,err_1,items;return __generator(this,(function(_a){switch(_a.label){case 0:if(batch.length)return[3,5];_a.label=1;case 1:return _a.trys.push([1,3,,4]),[4,Promise.all(entries)];case 2:return files=_a.sent(),resolve(files),[3,4];case 3:return err_1=_a.sent(),reject(err_1),[3,4];case 4:return[3,6];case 5:items=Promise.all(batch.map(fromEntry)),entries.push(items),readEntries(),_a.label=6;case 6:return[2]}}))}))}),(function(err){reject(err)}))}()}))}function fromFileEntry(entry){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(_a){return[2,new Promise((function(resolve,reject){entry.file((function(file){var fwp=toFileWithPath(file,entry.fullPath);resolve(fwp)}),(function(err){reject(err)}))}))]}))}))}var es=__webpack_require__("./node_modules/attr-accept/dist/es/index.js");function _toConsumableArray(arr){return function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr)}(arr)||function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}(arr)||_unsupportedIterableToArray(arr)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null==_i)return;var _s,_e,_arr=[],_n=!0,_d=!1;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||_unsupportedIterableToArray(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _unsupportedIterableToArray(o,minLen){if(o){if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}var getInvalidTypeRejectionErr=function getInvalidTypeRejectionErr(accept){accept=Array.isArray(accept)&&1===accept.length?accept[0]:accept;var messageSuffix=Array.isArray(accept)?"one of ".concat(accept.join(", ")):accept;return{code:"file-invalid-type",message:"File type must be ".concat(messageSuffix)}},getTooLargeRejectionErr=function getTooLargeRejectionErr(maxSize){return{code:"file-too-large",message:"File is larger than ".concat(maxSize," ").concat(1===maxSize?"byte":"bytes")}},getTooSmallRejectionErr=function getTooSmallRejectionErr(minSize){return{code:"file-too-small",message:"File is smaller than ".concat(minSize," ").concat(1===minSize?"byte":"bytes")}},TOO_MANY_FILES_REJECTION={code:"too-many-files",message:"Too many files"};function fileAccepted(file,accept){var isAcceptable="application/x-moz-file"===file.type||(0,es.Z)(file,accept);return[isAcceptable,isAcceptable?null:getInvalidTypeRejectionErr(accept)]}function fileMatchSize(file,minSize,maxSize){if(isDefined(file.size))if(isDefined(minSize)&&isDefined(maxSize)){if(file.size>maxSize)return[!1,getTooLargeRejectionErr(maxSize)];if(file.size<minSize)return[!1,getTooSmallRejectionErr(minSize)]}else{if(isDefined(minSize)&&file.size<minSize)return[!1,getTooSmallRejectionErr(minSize)];if(isDefined(maxSize)&&file.size>maxSize)return[!1,getTooLargeRejectionErr(maxSize)]}return[!0,null]}function isDefined(value){return null!=value}function isPropagationStopped(event){return"function"==typeof event.isPropagationStopped?event.isPropagationStopped():void 0!==event.cancelBubble&&event.cancelBubble}function isEvtWithFiles(event){return event.dataTransfer?Array.prototype.some.call(event.dataTransfer.types,(function(type){return"Files"===type||"application/x-moz-file"===type})):!!event.target&&!!event.target.files}function onDocumentDragOver(event){event.preventDefault()}function composeEventHandlers(){for(var _len=arguments.length,fns=new Array(_len),_key=0;_key<_len;_key++)fns[_key]=arguments[_key];return function(event){for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];return fns.some((function(fn){return!isPropagationStopped(event)&&fn&&fn.apply(void 0,[event].concat(args)),isPropagationStopped(event)}))}}function isMIMEType(v){return"audio/*"===v||"video/*"===v||"image/*"===v||"text/*"===v||/\w+\/[-+.\w]+/g.test(v)}function isExt(v){return/^.*\.[\w]+$/.test(v)}var _excluded=["children"],_excluded2=["open"],_excluded3=["refKey","role","onKeyDown","onFocus","onBlur","onClick","onDragEnter","onDragOver","onDragLeave","onDrop"],_excluded4=["refKey","onChange","onClick"];function es_toConsumableArray(arr){return function es_arrayWithoutHoles(arr){if(Array.isArray(arr))return es_arrayLikeToArray(arr)}(arr)||function es_iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}(arr)||es_unsupportedIterableToArray(arr)||function es_nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function es_slicedToArray(arr,i){return function es_arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function es_iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null==_i)return;var _s,_e,_arr=[],_n=!0,_d=!1;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||es_unsupportedIterableToArray(arr,i)||function es_nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function es_unsupportedIterableToArray(o,minLen){if(o){if("string"==typeof o)return es_arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?es_arrayLikeToArray(o,minLen):void 0}}function es_arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function es_ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function es_objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?es_ownKeys(Object(source),!0).forEach((function(key){es_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):es_ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function es_defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}var Dropzone=(0,react.forwardRef)((function(_ref,ref){var children=_ref.children,_useDropzone=useDropzone(_objectWithoutProperties(_ref,_excluded)),open=_useDropzone.open,props=_objectWithoutProperties(_useDropzone,_excluded2);return(0,react.useImperativeHandle)(ref,(function(){return{open}}),[open]),react.createElement(react.Fragment,null,children(es_objectSpread(es_objectSpread({},props),{},{open})))}));Dropzone.displayName="Dropzone";var defaultProps={disabled:!1,getFilesFromEvent:function fromEvent(evt){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(_a){return isObject(evt)&&function isDataTransfer(value){return isObject(value)}(evt.dataTransfer)?[2,getDataTransferFiles(evt.dataTransfer,evt.type)]:function isChangeEvt(value){return isObject(value)&&isObject(value.target)}(evt)?[2,getInputFiles(evt)]:Array.isArray(evt)&&evt.every((function(item){return"getFile"in item&&"function"==typeof item.getFile}))?[2,getFsHandleFiles(evt)]:[2,[]]}))}))},maxSize:1/0,minSize:0,multiple:!0,maxFiles:0,preventDropOnDocument:!0,noClick:!1,noKeyboard:!1,noDrag:!1,noDragEventsBubbling:!1,validator:null,useFsAccessApi:!0,autoFocus:!1};Dropzone.defaultProps=defaultProps,Dropzone.propTypes={children:prop_types_default().func,accept:prop_types_default().objectOf(prop_types_default().arrayOf(prop_types_default().string)),multiple:prop_types_default().bool,preventDropOnDocument:prop_types_default().bool,noClick:prop_types_default().bool,noKeyboard:prop_types_default().bool,noDrag:prop_types_default().bool,noDragEventsBubbling:prop_types_default().bool,minSize:prop_types_default().number,maxSize:prop_types_default().number,maxFiles:prop_types_default().number,disabled:prop_types_default().bool,getFilesFromEvent:prop_types_default().func,onFileDialogCancel:prop_types_default().func,onFileDialogOpen:prop_types_default().func,useFsAccessApi:prop_types_default().bool,autoFocus:prop_types_default().bool,onDragEnter:prop_types_default().func,onDragLeave:prop_types_default().func,onDragOver:prop_types_default().func,onDrop:prop_types_default().func,onDropAccepted:prop_types_default().func,onDropRejected:prop_types_default().func,onError:prop_types_default().func,validator:prop_types_default().func};var initialState={isFocused:!1,isFileDialogActive:!1,isDragActive:!1,isDragAccept:!1,isDragReject:!1,acceptedFiles:[],fileRejections:[]};function useDropzone(){var props=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},_defaultProps$props=es_objectSpread(es_objectSpread({},defaultProps),props),accept=_defaultProps$props.accept,disabled=_defaultProps$props.disabled,getFilesFromEvent=_defaultProps$props.getFilesFromEvent,maxSize=_defaultProps$props.maxSize,minSize=_defaultProps$props.minSize,multiple=_defaultProps$props.multiple,maxFiles=_defaultProps$props.maxFiles,onDragEnter=_defaultProps$props.onDragEnter,onDragLeave=_defaultProps$props.onDragLeave,onDragOver=_defaultProps$props.onDragOver,onDrop=_defaultProps$props.onDrop,onDropAccepted=_defaultProps$props.onDropAccepted,onDropRejected=_defaultProps$props.onDropRejected,onFileDialogCancel=_defaultProps$props.onFileDialogCancel,onFileDialogOpen=_defaultProps$props.onFileDialogOpen,useFsAccessApi=_defaultProps$props.useFsAccessApi,autoFocus=_defaultProps$props.autoFocus,preventDropOnDocument=_defaultProps$props.preventDropOnDocument,noClick=_defaultProps$props.noClick,noKeyboard=_defaultProps$props.noKeyboard,noDrag=_defaultProps$props.noDrag,noDragEventsBubbling=_defaultProps$props.noDragEventsBubbling,onError=_defaultProps$props.onError,validator=_defaultProps$props.validator,acceptAttr=(0,react.useMemo)((function(){return function acceptPropAsAcceptAttr(accept){if(isDefined(accept))return Object.entries(accept).reduce((function(a,_ref6){var _ref7=_slicedToArray(_ref6,2),mimeType=_ref7[0],ext=_ref7[1];return[].concat(_toConsumableArray(a),[mimeType],_toConsumableArray(ext))}),[]).filter((function(v){return isMIMEType(v)||isExt(v)})).join(",")}(accept)}),[accept]),pickerTypes=(0,react.useMemo)((function(){return function pickerOptionsFromAccept(accept){return isDefined(accept)?[{description:"Files",accept:Object.entries(accept).filter((function(_ref2){var _ref3=_slicedToArray(_ref2,2),mimeType=_ref3[0],ext=_ref3[1],ok=!0;return isMIMEType(mimeType)||(console.warn('Skipped "'.concat(mimeType,'" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.')),ok=!1),Array.isArray(ext)&&ext.every(isExt)||(console.warn('Skipped "'.concat(mimeType,'" because an invalid file extension was provided.')),ok=!1),ok})).reduce((function(agg,_ref4){var _ref5=_slicedToArray(_ref4,2),mimeType=_ref5[0],ext=_ref5[1];return _objectSpread(_objectSpread({},agg),{},_defineProperty({},mimeType,ext))}),{})}]:accept}(accept)}),[accept]),onFileDialogOpenCb=(0,react.useMemo)((function(){return"function"==typeof onFileDialogOpen?onFileDialogOpen:noop}),[onFileDialogOpen]),onFileDialogCancelCb=(0,react.useMemo)((function(){return"function"==typeof onFileDialogCancel?onFileDialogCancel:noop}),[onFileDialogCancel]),rootRef=(0,react.useRef)(null),inputRef=(0,react.useRef)(null),_useReducer2=es_slicedToArray((0,react.useReducer)(reducer,initialState),2),state=_useReducer2[0],dispatch=_useReducer2[1],isFocused=state.isFocused,isFileDialogActive=state.isFileDialogActive,fsAccessApiWorksRef=(0,react.useRef)("undefined"!=typeof window&&window.isSecureContext&&useFsAccessApi&&function canUseFileSystemAccessAPI(){return"showOpenFilePicker"in window}()),onWindowFocus=function onWindowFocus(){!fsAccessApiWorksRef.current&&isFileDialogActive&&setTimeout((function(){inputRef.current&&(inputRef.current.files.length||(dispatch({type:"closeDialog"}),onFileDialogCancelCb()))}),300)};(0,react.useEffect)((function(){return window.addEventListener("focus",onWindowFocus,!1),function(){window.removeEventListener("focus",onWindowFocus,!1)}}),[inputRef,isFileDialogActive,onFileDialogCancelCb,fsAccessApiWorksRef]);var dragTargetsRef=(0,react.useRef)([]),onDocumentDrop=function onDocumentDrop(event){rootRef.current&&rootRef.current.contains(event.target)||(event.preventDefault(),dragTargetsRef.current=[])};(0,react.useEffect)((function(){return preventDropOnDocument&&(document.addEventListener("dragover",onDocumentDragOver,!1),document.addEventListener("drop",onDocumentDrop,!1)),function(){preventDropOnDocument&&(document.removeEventListener("dragover",onDocumentDragOver),document.removeEventListener("drop",onDocumentDrop))}}),[rootRef,preventDropOnDocument]),(0,react.useEffect)((function(){return!disabled&&autoFocus&&rootRef.current&&rootRef.current.focus(),function(){}}),[rootRef,autoFocus,disabled]);var onErrCb=(0,react.useCallback)((function(e){onError?onError(e):console.error(e)}),[onError]),onDragEnterCb=(0,react.useCallback)((function(event){event.preventDefault(),event.persist(),stopPropagation(event),dragTargetsRef.current=[].concat(es_toConsumableArray(dragTargetsRef.current),[event.target]),isEvtWithFiles(event)&&Promise.resolve(getFilesFromEvent(event)).then((function(files){if(!isPropagationStopped(event)||noDragEventsBubbling){var fileCount=files.length,isDragAccept=fileCount>0&&function allFilesAccepted(_ref){var files=_ref.files,accept=_ref.accept,minSize=_ref.minSize,maxSize=_ref.maxSize,multiple=_ref.multiple,maxFiles=_ref.maxFiles,validator=_ref.validator;return!(!multiple&&files.length>1||multiple&&maxFiles>=1&&files.length>maxFiles)&&files.every((function(file){var accepted=_slicedToArray(fileAccepted(file,accept),1)[0],sizeMatch=_slicedToArray(fileMatchSize(file,minSize,maxSize),1)[0],customErrors=validator?validator(file):null;return accepted&&sizeMatch&&!customErrors}))}({files,accept:acceptAttr,minSize,maxSize,multiple,maxFiles,validator});dispatch({isDragAccept,isDragReject:fileCount>0&&!isDragAccept,isDragActive:!0,type:"setDraggedFiles"}),onDragEnter&&onDragEnter(event)}})).catch((function(e){return onErrCb(e)}))}),[getFilesFromEvent,onDragEnter,onErrCb,noDragEventsBubbling,acceptAttr,minSize,maxSize,multiple,maxFiles,validator]),onDragOverCb=(0,react.useCallback)((function(event){event.preventDefault(),event.persist(),stopPropagation(event);var hasFiles=isEvtWithFiles(event);if(hasFiles&&event.dataTransfer)try{event.dataTransfer.dropEffect="copy"}catch(_unused){}return hasFiles&&onDragOver&&onDragOver(event),!1}),[onDragOver,noDragEventsBubbling]),onDragLeaveCb=(0,react.useCallback)((function(event){event.preventDefault(),event.persist(),stopPropagation(event);var targets=dragTargetsRef.current.filter((function(target){return rootRef.current&&rootRef.current.contains(target)})),targetIdx=targets.indexOf(event.target);-1!==targetIdx&&targets.splice(targetIdx,1),dragTargetsRef.current=targets,targets.length>0||(dispatch({type:"setDraggedFiles",isDragActive:!1,isDragAccept:!1,isDragReject:!1}),isEvtWithFiles(event)&&onDragLeave&&onDragLeave(event))}),[rootRef,onDragLeave,noDragEventsBubbling]),setFiles=(0,react.useCallback)((function(files,event){var acceptedFiles=[],fileRejections=[];files.forEach((function(file){var _fileAccepted2=es_slicedToArray(fileAccepted(file,acceptAttr),2),accepted=_fileAccepted2[0],acceptError=_fileAccepted2[1],_fileMatchSize2=es_slicedToArray(fileMatchSize(file,minSize,maxSize),2),sizeMatch=_fileMatchSize2[0],sizeError=_fileMatchSize2[1],customErrors=validator?validator(file):null;if(accepted&&sizeMatch&&!customErrors)acceptedFiles.push(file);else{var errors=[acceptError,sizeError];customErrors&&(errors=errors.concat(customErrors)),fileRejections.push({file,errors:errors.filter((function(e){return e}))})}})),(!multiple&&acceptedFiles.length>1||multiple&&maxFiles>=1&&acceptedFiles.length>maxFiles)&&(acceptedFiles.forEach((function(file){fileRejections.push({file,errors:[TOO_MANY_FILES_REJECTION]})})),acceptedFiles.splice(0)),dispatch({acceptedFiles,fileRejections,type:"setFiles"}),onDrop&&onDrop(acceptedFiles,fileRejections,event),fileRejections.length>0&&onDropRejected&&onDropRejected(fileRejections,event),acceptedFiles.length>0&&onDropAccepted&&onDropAccepted(acceptedFiles,event)}),[dispatch,multiple,acceptAttr,minSize,maxSize,maxFiles,onDrop,onDropAccepted,onDropRejected,validator]),onDropCb=(0,react.useCallback)((function(event){event.preventDefault(),event.persist(),stopPropagation(event),dragTargetsRef.current=[],isEvtWithFiles(event)&&Promise.resolve(getFilesFromEvent(event)).then((function(files){isPropagationStopped(event)&&!noDragEventsBubbling||setFiles(files,event)})).catch((function(e){return onErrCb(e)})),dispatch({type:"reset"})}),[getFilesFromEvent,setFiles,onErrCb,noDragEventsBubbling]),openFileDialog=(0,react.useCallback)((function(){if(fsAccessApiWorksRef.current){dispatch({type:"openDialog"}),onFileDialogOpenCb();var opts={multiple,types:pickerTypes};window.showOpenFilePicker(opts).then((function(handles){return getFilesFromEvent(handles)})).then((function(files){setFiles(files,null),dispatch({type:"closeDialog"})})).catch((function(e){!function isAbort(v){return v instanceof DOMException&&("AbortError"===v.name||v.code===v.ABORT_ERR)}(e)?!function isSecurityError(v){return v instanceof DOMException&&("SecurityError"===v.name||v.code===v.SECURITY_ERR)}(e)?onErrCb(e):(fsAccessApiWorksRef.current=!1,inputRef.current?(inputRef.current.value=null,inputRef.current.click()):onErrCb(new Error("Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."))):(onFileDialogCancelCb(e),dispatch({type:"closeDialog"}))}))}else inputRef.current&&(dispatch({type:"openDialog"}),onFileDialogOpenCb(),inputRef.current.value=null,inputRef.current.click())}),[dispatch,onFileDialogOpenCb,onFileDialogCancelCb,useFsAccessApi,setFiles,onErrCb,pickerTypes,multiple]),onKeyDownCb=(0,react.useCallback)((function(event){rootRef.current&&rootRef.current.isEqualNode(event.target)&&(" "!==event.key&&"Enter"!==event.key&&32!==event.keyCode&&13!==event.keyCode||(event.preventDefault(),openFileDialog()))}),[rootRef,openFileDialog]),onFocusCb=(0,react.useCallback)((function(){dispatch({type:"focus"})}),[]),onBlurCb=(0,react.useCallback)((function(){dispatch({type:"blur"})}),[]),onClickCb=(0,react.useCallback)((function(){noClick||(!function isIeOrEdge(){var userAgent=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.navigator.userAgent;return function isIe(userAgent){return-1!==userAgent.indexOf("MSIE")||-1!==userAgent.indexOf("Trident/")}(userAgent)||function isEdge(userAgent){return-1!==userAgent.indexOf("Edge/")}(userAgent)}()?openFileDialog():setTimeout(openFileDialog,0))}),[noClick,openFileDialog]),composeHandler=function composeHandler(fn){return disabled?null:fn},composeKeyboardHandler=function composeKeyboardHandler(fn){return noKeyboard?null:composeHandler(fn)},composeDragHandler=function composeDragHandler(fn){return noDrag?null:composeHandler(fn)},stopPropagation=function stopPropagation(event){noDragEventsBubbling&&event.stopPropagation()},getRootProps=(0,react.useMemo)((function(){return function(){var _ref2=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},_ref2$refKey=_ref2.refKey,refKey=void 0===_ref2$refKey?"ref":_ref2$refKey,role=_ref2.role,onKeyDown=_ref2.onKeyDown,onFocus=_ref2.onFocus,onBlur=_ref2.onBlur,onClick=_ref2.onClick,onDragEnter=_ref2.onDragEnter,onDragOver=_ref2.onDragOver,onDragLeave=_ref2.onDragLeave,onDrop=_ref2.onDrop,rest=_objectWithoutProperties(_ref2,_excluded3);return es_objectSpread(es_objectSpread(es_defineProperty({onKeyDown:composeKeyboardHandler(composeEventHandlers(onKeyDown,onKeyDownCb)),onFocus:composeKeyboardHandler(composeEventHandlers(onFocus,onFocusCb)),onBlur:composeKeyboardHandler(composeEventHandlers(onBlur,onBlurCb)),onClick:composeHandler(composeEventHandlers(onClick,onClickCb)),onDragEnter:composeDragHandler(composeEventHandlers(onDragEnter,onDragEnterCb)),onDragOver:composeDragHandler(composeEventHandlers(onDragOver,onDragOverCb)),onDragLeave:composeDragHandler(composeEventHandlers(onDragLeave,onDragLeaveCb)),onDrop:composeDragHandler(composeEventHandlers(onDrop,onDropCb)),role:"string"==typeof role&&""!==role?role:"presentation"},refKey,rootRef),disabled||noKeyboard?{}:{tabIndex:0}),rest)}}),[rootRef,onKeyDownCb,onFocusCb,onBlurCb,onClickCb,onDragEnterCb,onDragOverCb,onDragLeaveCb,onDropCb,noKeyboard,noDrag,disabled]),onInputElementClick=(0,react.useCallback)((function(event){event.stopPropagation()}),[]),getInputProps=(0,react.useMemo)((function(){return function(){var _ref3=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},_ref3$refKey=_ref3.refKey,refKey=void 0===_ref3$refKey?"ref":_ref3$refKey,onChange=_ref3.onChange,onClick=_ref3.onClick,rest=_objectWithoutProperties(_ref3,_excluded4);return es_objectSpread(es_objectSpread({},es_defineProperty({accept:acceptAttr,multiple,type:"file",style:{display:"none"},onChange:composeHandler(composeEventHandlers(onChange,onDropCb)),onClick:composeHandler(composeEventHandlers(onClick,onInputElementClick)),tabIndex:-1},refKey,inputRef)),rest)}}),[inputRef,accept,multiple,onDropCb,disabled]);return es_objectSpread(es_objectSpread({},state),{},{isFocused:isFocused&&!disabled,getRootProps,getInputProps,rootRef,inputRef,open:composeHandler(openFileDialog)})}function reducer(state,action){switch(action.type){case"focus":return es_objectSpread(es_objectSpread({},state),{},{isFocused:!0});case"blur":return es_objectSpread(es_objectSpread({},state),{},{isFocused:!1});case"openDialog":return es_objectSpread(es_objectSpread({},initialState),{},{isFileDialogActive:!0});case"closeDialog":return es_objectSpread(es_objectSpread({},state),{},{isFileDialogActive:!1});case"setDraggedFiles":return es_objectSpread(es_objectSpread({},state),{},{isDragActive:action.isDragActive,isDragAccept:action.isDragAccept,isDragReject:action.isDragReject});case"setFiles":return es_objectSpread(es_objectSpread({},state),{},{acceptedFiles:action.acceptedFiles,fileRejections:action.fileRejections});case"reset":return es_objectSpread({},initialState);default:return state}}function noop(){}}}]);