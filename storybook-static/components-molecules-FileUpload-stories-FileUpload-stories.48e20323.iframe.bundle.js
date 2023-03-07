"use strict";(self.webpackChunkdashboard_app=self.webpackChunkdashboard_app||[]).push([[4270],{"./src/components/molecules/FileUpload/stories/FileUpload.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Banner:()=>Banner,Logo:()=>Logo,ProductPage:()=>ProductPage,default:()=>FileUpload_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react=__webpack_require__("./node_modules/react/index.js"),esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),clsx_m=__webpack_require__("./node_modules/clsx/dist/clsx.m.js"),es=__webpack_require__("./node_modules/react-dropzone/dist/es/index.js"),FileCard=__webpack_require__("./src/components/molecules/FileCard/index.tsx"),Button=__webpack_require__("./src/components/molecules/Button/index.tsx"),fonts=__webpack_require__("./src/config/fonts.ts"),clsVariants={rectangle:{clsContainer:"border border-neutral-600 w-full max-w-[351px] rounded-[4px] relative",clsWrapper:"flex flex-col items-center py-6 px-7",clsDropzone:"w-[295px] h-[145px] border-[3px] rounded-[4px] border-neutral-200 flex justify-center items-center cursor-pointer"},circle:{clsContainer:"",clsWrapper:"",clsDropzone:""},product:{clsContainer:"",clsWrapper:"",clsDropzone:"w-[304px] h-[304px] relative bg-neutral-200 rounded-[4px] flex flex-col justify-center items-center"}},__jsx=react.createElement,ProductIcon=function ProductIcon(){return __jsx("svg",{width:"32",height:"32",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg"},__jsx("rect",{x:"2.66663",y:"2.66669",width:"26.6667",height:"26.6667",rx:"5",stroke:"#999999","stroke-width":"1.5"}),__jsx("path",{d:"M3.33325 23.3334L6.75911 20.8863C7.47513 20.3749 8.45594 20.456 9.07814 21.0782L11.1514 23.1515C11.62 23.6201 12.3798 23.6201 12.8484 23.1515L20.1709 15.829C20.8292 15.1707 21.8809 15.123 22.596 15.719L29.3333 21.3334",stroke:"#999999","stroke-width":"1.5","stroke-linecap":"round"}),__jsx("circle",{cx:"2.66667",cy:"2.66667",r:"2.66667",transform:"matrix(-1 0 0 1 13.3333 8)",stroke:"#999999","stroke-width":"1.5"}))};ProductIcon.displayName="ProductIcon",ProductIcon.__docgenInfo={description:"",methods:[],displayName:"ProductIcon"};const FileUpload_ProductIcon=ProductIcon;var FileUpload_jsx=react.createElement,FileUpload=function FileUpload(_ref){var _ref$variant=_ref.variant,variant=void 0===_ref$variant?"rectangle":_ref$variant,_ref$acceptedFileType=_ref.acceptedFileTypes,acceptedFileTypes=void 0===_ref$acceptedFileType?["image/jpeg","image/png","image/heic","application/pdf"]:_ref$acceptedFileType,_ref$hasFilePreview=_ref.hasFilePreview,hasFilePreview=void 0===_ref$hasFilePreview||_ref$hasFilePreview,_ref$labelText=_ref.labelText,labelText=void 0===_ref$labelText?"":_ref$labelText,icon=_ref.icon,_ref$handleAcceptedFi=_ref.handleAcceptedFiles,handleAcceptedFiles=void 0===_ref$handleAcceptedFi?function(){}:_ref$handleAcceptedFi,_ref$handleFilePrevie=_ref.handleFilePreviewClick,handleFilePreviewClick=void 0===_ref$handleFilePrevie?function(){}:_ref$handleFilePrevie,_ref$handleUpload=_ref.handleUpload,handleUpload=void 0===_ref$handleUpload?function(){}:_ref$handleUpload,_useState=(0,react.useState)(null),file=_useState[0],setFile=_useState[1],_useState2=(0,react.useState)(null),previewUrl=_useState2[0],setPreviewUrl=_useState2[1],renderButton=function renderButton(){return FileUpload_jsx(Button.z,{variant:"outlined",className:(0,clsx_m.Z)("!max-w-[216px] mt-6",fonts.R.fontWeights.regular,fonts.R.text.md),onClick:function onClick(){var _document,_document$querySelect,_document$querySelect2,_document$querySelect3;file?handleUpload(file):null===(_document=document)||void 0===_document||null===(_document$querySelect=_document.querySelector)||void 0===_document$querySelect||null===(_document$querySelect2=_document$querySelect.call(_document,'input[type="file"]'))||void 0===_document$querySelect2||null===(_document$querySelect3=_document$querySelect2.click)||void 0===_document$querySelect3||_document$querySelect3.call(_document$querySelect2)}},file?"Upload":"Select")},onDrop=(0,react.useCallback)((function(acceptedFiles){handleAcceptedFiles(acceptedFiles),setFile(acceptedFiles[0]),setPreviewUrl(URL.createObjectURL(acceptedFiles[0]))}),[]),_useDropzone=(0,es.uI)({onDrop,accept:acceptedFileTypes,maxFiles:1}),getRootProps=_useDropzone.getRootProps,getInputProps=_useDropzone.getInputProps;return FileUpload_jsx("div",{className:clsVariants[variant].clsContainer},!!labelText&&FileUpload_jsx("p",{className:(0,clsx_m.Z)(fonts.R.fontWeights.light,fonts.R.text.md,"text-shades-black tracking-[.06em] absolute bg-shades-white top-[-10px] left-5 px-2")},labelText),FileUpload_jsx("div",{className:clsVariants[variant].clsWrapper},FileUpload_jsx("div",(0,esm_extends.Z)({},getRootProps(),{className:clsVariants[variant].clsDropzone}),FileUpload_jsx("input",getInputProps()),!!hasFilePreview&&previewUrl&&FileUpload_jsx(react.Fragment,null,FileUpload_jsx(FileCard.s,{src:previewUrl,variant,icon,onClick:handleFilePreviewClick})),"product"===variant&&FileUpload_jsx(react.Fragment,null,(!file||!hasFilePreview)&&FileUpload_jsx("div",null,FileUpload_jsx(FileUpload_ProductIcon,null)),renderButton())),"product"!==variant&&renderButton()))};FileUpload.displayName="FileUpload",FileUpload.__docgenInfo={description:"",methods:[],displayName:"FileUpload",props:{variant:{defaultValue:{value:'"rectangle"',computed:!1},required:!1},acceptedFileTypes:{defaultValue:{value:'[\n  "image/jpeg",\n  "image/png",\n  "image/heic",\n  "application/pdf",\n]',computed:!1},required:!1},hasFilePreview:{defaultValue:{value:"true",computed:!1},required:!1},labelText:{defaultValue:{value:'""',computed:!1},required:!1},handleAcceptedFiles:{defaultValue:{value:"() => {}",computed:!1},required:!1},handleFilePreviewClick:{defaultValue:{value:"() => {}",computed:!1},required:!1},handleUpload:{defaultValue:{value:"() => {}",computed:!1},required:!1}}};try{FileUpload.displayName="FileUpload",FileUpload.__docgenInfo={description:"",displayName:"FileUpload",props:{acceptedFileTypes:{defaultValue:{value:'[\n    "image/jpeg",\n    "image/png",\n    "image/heic",\n    "application/pdf",\n  ]'},description:"",name:"acceptedFileTypes",required:!1,type:{name:"string[]"}},variant:{defaultValue:{value:"rectangle"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"circle"'},{value:'"product"'},{value:'"rectangle"'}]}},labelText:{defaultValue:{value:""},description:"",name:"labelText",required:!1,type:{name:"string"}},handleUpload:{defaultValue:{value:"() => {}"},description:"",name:"handleUpload",required:!1,type:{name:"((file: any) => void)"}},handleAcceptedFiles:{defaultValue:{value:"() => {}"},description:"",name:"handleAcceptedFiles",required:!1,type:{name:"((acceptedFiles: any) => void)"}},hasFilePreview:{defaultValue:{value:"true"},description:"",name:"hasFilePreview",required:!1,type:{name:"boolean"}},handleFilePreviewClick:{defaultValue:{value:"() => {}"},description:"",name:"handleFilePreviewClick",required:!1,type:{name:"((event: any) => void)"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/molecules/FileUpload/index.tsx#FileUpload"]={docgenInfo:FileUpload.__docgenInfo,name:"FileUpload",path:"src/components/molecules/FileUpload/index.tsx#FileUpload"})}catch(__react_docgen_typescript_loader_error){}var _Banner$parameters,_Banner$parameters2,_Banner$parameters2$d,_Logo$parameters,_Logo$parameters2,_Logo$parameters2$doc,_ProductPage$paramete,_ProductPage$paramete2,_ProductPage$paramete3,Icon=__webpack_require__("./src/components/molecules/Icon/index.tsx"),FileUpload_stories_jsx=react.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}var storyParameters={};const FileUpload_stories={title:"Molecules/File Upload",component:FileUpload,decorators:[function(Story){return FileUpload_stories_jsx("div",{className:"flex justify-center"},FileUpload_stories_jsx(Story,null))}]};var argTypes={src:{control:{type:"text"},defaultValue:""}},Template=function Template(args){return FileUpload_stories_jsx(FileUpload,args)};Template.displayName="Template";var Banner=Template.bind({});Banner.argTypes=argTypes,Banner.args={variant:"rectangle"},Banner.parameters=storyParameters;var Logo=Template.bind({});Logo.argTypes=argTypes,Logo.args={variant:"circle",icon:FileUpload_stories_jsx(Icon.J,{name:"icon-file-upload"})},Logo.parameters=storyParameters;var ProductPage=Template.bind({});ProductPage.argTypes=argTypes,ProductPage.args={hasFilePreview:!1,variant:"product"},ProductPage.parameters=storyParameters,Banner.parameters=_objectSpread(_objectSpread({},Banner.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Banner$parameters=Banner.parameters)||void 0===_Banner$parameters?void 0:_Banner$parameters.docs),{},{source:_objectSpread({originalSource:"(args: FileUploadProps) => <FileUpload {...args} />"},null===(_Banner$parameters2=Banner.parameters)||void 0===_Banner$parameters2||null===(_Banner$parameters2$d=_Banner$parameters2.docs)||void 0===_Banner$parameters2$d?void 0:_Banner$parameters2$d.source)})}),Logo.parameters=_objectSpread(_objectSpread({},Logo.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Logo$parameters=Logo.parameters)||void 0===_Logo$parameters?void 0:_Logo$parameters.docs),{},{source:_objectSpread({originalSource:"(args: FileUploadProps) => <FileUpload {...args} />"},null===(_Logo$parameters2=Logo.parameters)||void 0===_Logo$parameters2||null===(_Logo$parameters2$doc=_Logo$parameters2.docs)||void 0===_Logo$parameters2$doc?void 0:_Logo$parameters2$doc.source)})}),ProductPage.parameters=_objectSpread(_objectSpread({},ProductPage.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_ProductPage$paramete=ProductPage.parameters)||void 0===_ProductPage$paramete?void 0:_ProductPage$paramete.docs),{},{source:_objectSpread({originalSource:"(args: FileUploadProps) => <FileUpload {...args} />"},null===(_ProductPage$paramete2=ProductPage.parameters)||void 0===_ProductPage$paramete2||null===(_ProductPage$paramete3=_ProductPage$paramete2.docs)||void 0===_ProductPage$paramete3?void 0:_ProductPage$paramete3.source)})})},"./src/components/molecules/Button/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z:()=>Button});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),react=__webpack_require__("./node_modules/react/index.js"),clsx_m=__webpack_require__("./node_modules/clsx/dist/clsx.m.js"),buttonVariants={black:"bg-shades-black text-shades-white",white:"bg-shades-white text-shades-black",accent:"bg-accent-a-200 text-shades-white",neutral:"bg-neutral-400 text-shades-white"},outlinedButtonVariants={black:"border-[1px] border-shades-black text-shades-black hover:bg-shades-black hover:text-shades-white",white:"border-[1px] !border-shades-white !text-shades-white",accent:"border-[1px] !border-accent-a-200 !text-accent-a-200",neutral:"border-[1px] !border-neutral-400 !text-neutral-400"},buttonSize={sm:"text-xs py-0 px-4 h-8",md:"text-sm py-0 px-5 h-9",lg:"text-base py-0 px-6 h-10"},_excluded=["as","rounded","variant","color","size","children","className","label"],__jsx=react.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}var Button=function Button(_ref){var as=_ref.as,rounded=_ref.rounded,variant=_ref.variant,color=_ref.color,size=_ref.size,children=_ref.children,_ref$className=_ref.className,className=void 0===_ref$className?"":_ref$className,_ref$label=_ref.label,label=void 0===_ref$label?"":_ref$label,props=(0,objectWithoutProperties.Z)(_ref,_excluded);return(0,react.createElement)(as||"button",function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}({className:(0,clsx_m.Z)("flex w-full max-w-[352px] font-normal cursor-pointer items-center justify-center border-0 mx-auto my-0 gap-x-2","outlined"!==variant?buttonVariants[color||"black"]:outlinedButtonVariants[color||"black"],buttonSize[size||"lg"],rounded?"rounded-[3rem]":"rounded",className)},props),__jsx(react.Fragment,null,label,children))};Button.__docgenInfo={description:"",methods:[],displayName:"Button",props:{className:{defaultValue:{value:'""',computed:!1},required:!1},label:{defaultValue:{value:'""',computed:!1},required:!1}}};try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"a"'},{value:'"button"'}]}},rounded:{defaultValue:null,description:"",name:"rounded",required:!1,type:{name:"boolean"}},href:{defaultValue:null,description:"",name:"href",required:!1,type:{name:"string"}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"link"'},{value:'"outlined"'}]}},color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"enum",value:[{value:'"neutral"'},{value:'"black"'},{value:'"white"'},{value:'"accent"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"lg"'},{value:'"sm"'},{value:'"md"'}]}},label:{defaultValue:{value:""},description:"",name:"label",required:!1,type:{name:"string"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"((e: any) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/molecules/Button/index.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/components/molecules/Button/index.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/molecules/FileCard/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{s:()=>FileCard});var react=__webpack_require__("./node_modules/react/index.js"),next_image=__webpack_require__("./node_modules/next/image.js"),image_default=__webpack_require__.n(next_image),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),FileCard_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js!./src/components/molecules/FileCard/FileCard.module.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(FileCard_module.Z,options);const FileCard_FileCard_module=FileCard_module.Z&&FileCard_module.Z.locals?FileCard_module.Z.locals:void 0;var variants={circle:{clsWrapper:"group relative cursor-pointer h-[140px] w-[140px] rounded-full bg-neutral-200 flex items-center justify-center",clsContainer:"relative w-[122px] h-[122px] rounded-full flex items-center justify-center",clsOverlay:FileCard_FileCard_module.circleVariant,clsFilledOverlay:"absolute w-full h-full z-[1] transition rounded-full group-hover:bg-shades-black group-hover:bg-opacity-20",clsImage:"h-full w-full object-cover rounded-[4px] rounded-full"},rectangle:{clsWrapper:"group relative cursor-pointer",clsContainer:"relative w-[268px] h-[117px]",clsOverlay:FileCard_FileCard_module.bannerVariant,clsFilledOverlay:"absolute w-full h-full z-[1] transition rounded-[4px] group-hover:bg-shades-black group-hover:bg-opacity-20",clsImage:"h-full w-full object-cover rounded-[4px]"},product:{clsWrapper:"group relative cursor-pointer",clsContainer:"relative w-[120px] h-[77px]",clsOverlay:FileCard_FileCard_module.bannerVariant,clsFilledOverlay:"absolute w-full h-full z-[1] transition rounded-[4px] group-hover:bg-shades-black group-hover:bg-opacity-20",clsImage:"h-full w-full object-cover rounded-[4px]"}},__jsx=react.createElement,FileCard=function FileCard(_ref){var _variants$variant,_variants$variant2,_variants$variant3,_variants$variant4,_variants$variant5,src=_ref.src,onClick=_ref.onClick,_ref$variant=_ref.variant,variant=void 0===_ref$variant?"rectangle":_ref$variant,icon=_ref.icon;return __jsx("div",{className:null===(_variants$variant=variants[variant])||void 0===_variants$variant?void 0:_variants$variant.clsWrapper,onClick},__jsx("div",{className:null===(_variants$variant2=variants[variant])||void 0===_variants$variant2?void 0:_variants$variant2.clsContainer},__jsx("div",{className:src?null===(_variants$variant4=variants[variant])||void 0===_variants$variant4?void 0:_variants$variant4.clsFilledOverlay:null===(_variants$variant3=variants[variant])||void 0===_variants$variant3?void 0:_variants$variant3.clsOverlay}),!src&&icon&&__jsx("div",{className:"absolute z-[2]"},icon),!!src&&__jsx(image_default(),{src,alt:"File",className:null===(_variants$variant5=variants[variant])||void 0===_variants$variant5?void 0:_variants$variant5.clsImage,fill:!0})))};FileCard.displayName="FileCard",FileCard.__docgenInfo={description:"",methods:[],displayName:"FileCard",props:{variant:{defaultValue:{value:'"rectangle"',computed:!1},required:!1}}};try{FileCard.displayName="FileCard",FileCard.__docgenInfo={description:"",displayName:"FileCard",props:{src:{defaultValue:null,description:"",name:"src",required:!0,type:{name:"string | StaticImageData"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!0,type:{name:"(event: SyntheticEvent<Element, Event>) => void"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"any"}},variant:{defaultValue:{value:"rectangle"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"circle"'},{value:'"product"'},{value:'"rectangle"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/molecules/FileCard/index.tsx#FileCard"]={docgenInfo:FileCard.__docgenInfo,name:"FileCard",path:"src/components/molecules/FileCard/index.tsx#FileCard"})}catch(__react_docgen_typescript_loader_error){}},"./src/config/fonts.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{R:()=>fonts});var fonts={text:{xs:"text-[8px] leading-[16px]",sm:"text-[10px] leading-[16px]",md:"text-[12px] leading-[16px]",base:"text-[14px] leading-[24px]",lg:"text-[16px] leading-[24px]",xl:"text-[18px] leading-[24px]","2xl":"text-[24px] leading-[40px]"},headings:{lg:"text-[64px] leading-[80px]",base:"text-[40px] leading-[56px]",md:"text-[40px] leading-[48px]",sm:"text-[32px] leading-[48px]"},fontWeights:{light:"font-light",regular:"font-normal"}}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js!./src/components/molecules/FileCard/FileCard.module.css":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".FileCard_bannerVariant__hVqet {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  background: radial-gradient(#ffffff, rgba(71, 68, 68, 0.5));\n\n  border-radius: 4px\n}\n\n.FileCard_circleVariant__QOiw7 {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  border-radius: 9999px;\n  --tw-bg-opacity: 1 !important;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity)) !important;\n  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.04)\n}\n","",{version:3,sources:["webpack://./src/components/molecules/FileCard/FileCard.module.css"],names:[],mappings:"AACE;EAAA,kBAA6B;EAA7B,YAA6B;EAA7B,WAA6B;EAC7B,2DAA2D;;EAE3D;AAH6B;;AAO7B;EAAA,kBAA2D;EAA3D,YAA2D;EAA3D,WAA2D;EAA3D,qBAA2D;EAA3D,6BAA2D;EAA3D,oEAA2D;EAC3D;AAD2D",sourcesContent:[".bannerVariant {\n  @apply h-full w-full absolute;\n  background: radial-gradient(#ffffff, rgba(71, 68, 68, 0.5));\n\n  border-radius: 4px;\n}\n\n.circleVariant {\n  @apply rounded-full !bg-shades-white absolute w-full h-full;\n  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.04);\n}\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={bannerVariant:"FileCard_bannerVariant__hVqet",circleVariant:"FileCard_circleVariant__QOiw7"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);