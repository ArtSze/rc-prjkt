(this["webpackJsonprc-prjkt-client"]=this["webpackJsonprc-prjkt-client"]||[]).push([[0],{239:function(e,t){},360:function(e,t,a){"use strict";a.r(t),a.d(t,"queryClient",(function(){return ft}));var n,r=a(1),c=a.n(r),i=a(19),s=a.n(i),l=a(198),o=a(22),u=a(423),j=a(411),d=a(200),b=a(119),p=a(400),h=Object(d.a)({palette:{primary:{main:b.a[300]},secondary:{main:p.a[300]}}}),m=a(23),x=a(403),O=a(67),f=a(40),g=a(188);!function(e){e["Last Updated"]="last updated",e["First Updated"]="first updated",e["Last Created"]="last created",e["First Created"]="first created",e["Latest Batch"]="latest batch",e["Oldest Batch"]="oldest batch"}(n||(n={}));var v=Object(g.a)((function(e){return{sortFilter:n["Last Updated"],tagFilter:void 0,ownerFilter:void 0,addForm:!1,setSortFilter:function(t){return e({sortFilter:t})},setTagFilter:function(t){return e({tagFilter:t})},setOwnerFilter:function(t){e({ownerFilter:t})}}})),F=a(17),C=a(433),y=a(429),w=a(10),S=a(37),D=a(189),k=a(3),L=function(e){return Object(k.jsx)(w.l.Option,Object(F.a)(Object(F.a)({},e),{},{children:Object(k.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Object(k.jsx)(C.a,{alt:e.label,src:e.value.image_path,variant:"circle",style:{width:"24px",height:"24px",marginLeft:"2px",marginRight:"5px"}}),Object(k.jsx)(O.a,{variant:"body2",children:e.children})]})}))},_=function(e){return Object(k.jsx)(w.l.Menu,Object(F.a)(Object(F.a)({},e),{},{children:Object(k.jsx)(O.a,{variant:"body2",children:e.children})}))},N=function(e){return Object(k.jsx)(w.l.SingleValue,Object(F.a)(Object(F.a)({},e),{},{children:Object(k.jsx)(O.a,{variant:"body2",children:e.children})}))},B=function(e){return Object(k.jsx)(w.l.Placeholder,Object(F.a)(Object(F.a)({},e),{},{children:Object(k.jsx)(O.a,{variant:"body2",children:e.selectProps.placeholder})}))},P=function(e){return Object(k.jsxs)(w.l.Control,Object(F.a)(Object(F.a)({},e),{},{children:[Object(k.jsx)("span",{style:{height:"16px",alignSelf:"center",marginLeft:"10px",cursor:"pointer"},children:Object(k.jsx)(D.a,{})}),e.children]}))},R=function(e){return Object(k.jsxs)(w.l.Control,Object(F.a)(Object(F.a)({},e),{},{children:[Object(k.jsx)(y.a,{xsDown:!0,children:Object(k.jsx)("span",{style:{height:"16px",alignSelf:"center",marginLeft:"10px",cursor:"pointer"},children:Object(k.jsx)(S.g,{})})}),e.children]}))},A=function(e){return Object(k.jsxs)(w.l.Control,Object(F.a)(Object(F.a)({},e),{},{children:[Object(k.jsx)(y.a,{xsDown:!0,children:Object(k.jsx)("span",{style:{height:"16px",alignSelf:"center",marginLeft:"10px",cursor:"pointer"},children:Object(k.jsx)(S.f,{})})}),e.children]}))},I=function(e){return Object(k.jsx)(w.l.SingleValue,Object(F.a)(Object(F.a)({},e),{},{children:Object(k.jsxs)("div",{style:{margin:"3px",padding:"3px",borderRadius:"16px",backgroundColor:"rgb(230, 230, 230)",display:"flex",alignItems:"center"},children:[Object(k.jsx)(C.a,{alt:e.data.value.first_name,src:e.data.value.image_path,variant:"circle",style:{width:"24px",height:"24px",marginLeft:"2px",marginRight:"3px"}}),Object(k.jsx)(O.a,{style:{marginRight:"5px",padding:"1px"},variant:"body2",children:e.children})]})}))},z=function(e){return Object(k.jsx)(w.l.MultiValueLabel,Object(F.a)(Object(F.a)({},e),{},{children:Object(k.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Object(k.jsx)(C.a,{alt:e.data.value.first_name,src:e.data.value.image_path,variant:"circle",style:{width:"24px",height:"24px",marginLeft:"2px",marginRight:"3px"}}),Object(k.jsx)(O.a,{style:{padding:"1px"},variant:"body2",children:e.data.label})]})}))},T=function(e){return Object(k.jsx)(w.l.MultiValueLabel,Object(F.a)(Object(F.a)({},e),{},{children:Object(k.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Object(k.jsx)(S.e,{style:{padding:"1px",marginLeft:"2px",marginRight:"5px"}}),Object(k.jsx)(O.a,{style:{padding:"1px"},variant:"body2",children:e.data.label})]})}))},V={multiValue:function(e){return Object(F.a)(Object(F.a)({},e),{},{borderRadius:"16px"})},multiValueRemove:function(e){return Object(F.a)(Object(F.a)({},e),{},{borderBottomRightRadius:"16px",borderTopRightRadius:"16px"})}},M=function(){var e=v((function(e){return e.sortFilter})),t=v((function(e){return e.setSortFilter})),a=[{value:n["Last Updated"],label:"Last Updated"},{value:n["First Updated"],label:"First Updated"},{value:n["Last Created"],label:"Last Created"},{value:n["First Created"],label:"First Created"},{value:n["Latest Batch"],label:"Latest Batch"},{value:n["Oldest Batch"],label:"Oldest Batch"}];return Object(k.jsxs)(x.a,{item:!0,xs:12,sm:6,md:4,children:[Object(k.jsx)(O.a,{variant:"subtitle2",children:"Sort"}),Object(k.jsx)(f.a,{options:a,components:{Control:P,Menu:_,SingleValue:N},value:a.filter((function(t){return null===e||void 0===e?void 0:e.includes(t.value)})),onChange:function(e){e&&t(e.value)}})]})},E=function(e){var t=e.setStatusFilter,a=[{value:oe.Active,label:"Active"},{value:oe.Inactive,label:"Inactive"},{value:oe.All,label:"All"}];return Object(k.jsxs)(x.a,{item:!0,xs:12,sm:6,md:4,children:[Object(k.jsx)(O.a,{variant:"subtitle2",children:"Status"}),Object(k.jsx)(f.a,{defaultValue:a[0],components:{Menu:_,SingleValue:N},options:a,name:"status-filter",onChange:function(e){console.log(null===e||void 0===e?void 0:e.value),t(null===e||void 0===e?void 0:e.value)}})]})},G=a(190),W=a.n(G);function U(e){return W.a.stringify(e,{arrayFormat:"repeat"})}var q=a(405),H=a(35),Q=a.n(H),$=a(55),J=a(428),K=a(110),X=a(191),Y="http://localhost:4000",Z=Y+"/auth",ee={baseURL:Y},te=a.n(X).a.create(ee),ae="users",ne="tags",re="projects",ce=function(){var e=Object($.a)(Q.a.mark((function e(t){var a,n,r,c;return Q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=[],e.next=3,te.get("/users/",{params:t,withCredentials:!0});case 3:return n=e.sent,r=n.data,c=void 0===r?a:r,e.abrupt("return",c);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();var ie=function(e){return Object(J.a)([ae,e],(function(){return ce(e)}),{keepPreviousData:!0})},se=function(){var e=v((function(e){return e.setOwnerFilter})),t=v((function(e){return e.ownerFilter})),a=ie({omitSelf:"false"}),n=a.data,r=a.isSuccess;if(r&&n){var c=n.map((function(e){return{value:e,label:"".concat(e.first_name," ").concat(e.last_name)}}));return Object(k.jsxs)(x.a,{item:!0,xs:12,sm:6,md:8,children:[Object(k.jsx)(O.a,{variant:"subtitle2",children:"Owner Filter"}),Object(k.jsx)(f.a,{value:function(){var e=c.filter((function(e){return e.value.rcId===t}));return e.length>0?e[0]:null}(),components:{Control:R,Option:L,Menu:_,Placeholder:B,SingleValue:I},options:c,name:"user-filter",onChange:function(t){var a;e((a=t)?a.value.rcId:void 0)},placeholder:"Select user...",isClearable:!0,isSearchable:!0})]})}return Object(k.jsxs)(x.a,{item:!0,xs:12,sm:12,md:8,children:[Object(k.jsx)(O.a,{variant:"subtitle2",children:"Owner Filter"}),Object(k.jsx)(f.a,{components:{Control:R,Option:L,Menu:_,Placeholder:B,SingleValue:I},name:"user-filter",placeholder:"Select user...",isClearable:!0,isSearchable:!0})]})},le=function(){var e=Object($.a)(Q.a.mark((function e(){var t,a,n,r;return Q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],e.next=3,te.get("/tags/",{withCredentials:!0});case 3:return a=e.sent,n=a.data,r=void 0===n?t:n,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();var oe,ue=function(){return Object(J.a)(ne,le)},je=function(){var e=v((function(e){return e.setTagFilter})),t=v((function(e){return e.tagFilter})),a=ue(),n=a.data,r=a.isSuccess;if(r&&n){var c=n.map((function(e){return{value:e,label:e.value}}));return Object(k.jsxs)(x.a,{item:!0,xs:12,sm:6,md:8,children:[Object(k.jsx)(O.a,{variant:"subtitle2",children:"Tag Filter"}),Object(k.jsx)(f.a,{value:c.filter((function(e){return null===t||void 0===t?void 0:t.includes(e.value.value)})),components:{Control:A,Menu:_,MultiValueLabel:T,Placeholder:B},options:c,name:"tag-filter",onChange:function(t){return function(t){var a=t.map((function(e){return e.value.value}));a.length>0?e(a):e(void 0)}(t)},placeholder:"Select tags...",isMulti:!0,isClearable:!0,isSearchable:!0,styles:V})]})}return Object(k.jsxs)(x.a,{item:!0,xs:12,sm:6,md:8,children:[Object(k.jsx)(O.a,{variant:"subtitle2",children:"Tag Filter"}),Object(k.jsx)(f.a,{components:{Control:A,Menu:_,MultiValueLabel:T,Placeholder:B},name:"tag-filter",placeholder:"Select tags...",isMulti:!0,isClearable:!0,isSearchable:!0,styles:V})]})},de=a(201),be=a(48),pe=a(404),he=Object(pe.a)((function(e){var t;return{root:{width:"100%",height:"100%",overflow:"hidden",position:"relative",margin:"80px 0",minHeight:"100vh"},footer:{padding:e.spacing(1),background:e.palette.primary.main,position:"fixed",bottom:0,width:"100%"},appBar:{flexDirection:"row",alignContent:"center",justifyContent:"space-between",backgroundColor:e.palette.primary.main},appBarLeft:{display:"flex",flexDirection:"row",alignItems:"center",marginLeft:e.spacing(3),gap:e.spacing(2)},appBarRight:{display:"flex",flexDirection:"row",alignItems:"center",gap:e.spacing(3),marginRight:e.spacing(3)},tallIndicator:{backgroundColor:e.palette.secondary.main,height:"5px"},filter:{padding:e.spacing(1.5)},cardHeader:Object(be.a)({},e.breakpoints.down("xs"),{flexDirection:"column",alignItems:"flex-start",gap:e.spacing(1)}),button:{marginLeft:e.spacing(2.5),marginRight:e.spacing(2.5)},projectFormContainer:{marginBottom:e.spacing(1),padding:e.spacing(.5)},projectForm:{},projectFormRow:{alignItems:"center"},projectFormEditFields:{marginBottom:e.spacing(1.45),width:"100%"},titleGridItem:{marginRight:e.spacing(3)},projectFormCheckFields:{paddingBottom:e.spacing(1.5)},formSubmitRow:{justifyContent:"center",marginTop:e.spacing(2.5)},ownerDeleteConfirmationButton:{color:e.palette.error.main,borderColor:e.palette.error.main},ownerDeleteButton:{color:e.palette.error.main,borderColor:e.palette.error.main,marginLeft:e.spacing(1),marginRight:e.spacing(2)},staticProject:{margin:e.spacing(1),marginBottom:e.spacing(2),padding:e.spacing(.5),paddingTop:e.spacing(1.5)},projectPhoto:{boxShadow:".05rem .05rem .2rem gray",marginRight:e.spacing(.75)},marginBottom:{marginBottom:e.spacing(.5)},chip:{margin:e.spacing(.25),"& > svg":{paddingLeft:e.spacing(.5)}},bigGridGap:{gap:e.spacing(1.5)},cursorPointer:{cursor:"pointer"},staticProjectDetails:Object(be.a)({paddingLeft:e.spacing(8)},e.breakpoints.down("xs"),{paddingLeft:0}),staticProjectDivider:{marginTop:e.spacing(-3),marginBottom:e.spacing(1.5)},auth:(t={width:"unset",border:"solid",borderWidth:e.spacing(2),borderColor:e.palette.primary.dark,backgroundColor:e.palette.primary.light},Object(be.a)(t,e.breakpoints.down("xs"),{margin:e.spacing(2)}),Object(be.a)(t,"marginTop",e.spacing(10)),Object(be.a)(t,"display","flex"),Object(be.a)(t,"flexDirection","column"),Object(be.a)(t,"alignItems","center"),Object(be.a)(t,"padding",e.spacing(3)),Object(be.a)(t,"gap",e.spacing(4)),t),navButton:{margin:e.spacing(.75)},notFound:{alignSelf:"center",display:"flex",justifyItems:"center",alignItems:"center",flexDirection:"column",gap:e.spacing(2),marginTop:e.spacing(8)},notFoundButton:{width:e.spacing(24)},noProjects:{display:"flex",justifyContent:"center",marginTop:e.spacing(8)},selectTitles:{color:"rgba(0, 0, 0, 0.54)",fontSize:"12px",fontWeight:400,marginBottom:e.spacing(.5)}}}),{index:1});!function(e){e.Active="active",e.Inactive="inactive",e.All="all"}(oe||(oe={}));var me=function(e){var t=e.setParams,a=he(),n=Object(de.a)(oe.Active),c=Object(m.a)(n,2),i=c[0],s=c[1],l=v((function(e){return e.tagFilter})),o=v((function(e){return e.ownerFilter})),u=v((function(e){return e.sortFilter}));return Object(r.useEffect)((function(){var e=function(e,t,a,n){var r={};switch(e){case"active":r.status=!0;break;case"inactive":r.status=!1;break;default:r.status=void 0}return t&&(r.tags=t),a&&(r.user=a),r.sort=n,r}(i,l,o,u);t(e)}),[i,l,o,u]),Object(k.jsxs)(k.Fragment,{children:[Object(k.jsxs)(x.a,{className:a.filter,container:!0,spacing:1,children:[Object(k.jsx)(je,{}),Object(k.jsx)(E,{statusFilter:i,setStatusFilter:s}),Object(k.jsx)(se,{}),Object(k.jsx)(M,{})]}),Object(k.jsx)(q.a,{variant:"fullWidth",style:{marginTop:"20px",marginBottom:"20px"}})]})},xe=function(){var e=he();return Object(k.jsx)("div",{className:e.noProjects,children:Object(k.jsx)(O.a,{variant:"h5",color:"textSecondary",children:"No projects matching your search criteria have been found."})})},Oe=a(32),fe=a(410),ge=a(430),ve=a(412),Fe=a(413),Ce=a(432),ye=a(21),we=a(82),Se=a(142),De=a(408),ke=function(e){var t=e.label,a=e.field,n=e.multiline,r=void 0!==n&&n,c=he();return Object(k.jsx)(ye.b,{name:a.name,value:a.value,label:t,component:Se.b,multiline:r,className:c.projectFormEditFields})},Le=function(e){var t=e.field,a=he();return Object(k.jsx)("div",{className:a.projectFormCheckFields,children:Object(k.jsx)(De.a,{control:Object(k.jsx)(ye.b,{component:Se.a,color:"primary",name:t.name,type:"checkbox",checked:t.value}),label:!0===t.value?"Active":"Inactive"})})},_e=function(e){var t=e.placeholder,a=e.field,n=e.form,r=e.options,c=e.isMulti,i=void 0===c||c,s=e.initSelections;return Object(k.jsx)(f.a,{components:{Control:R,Menu:_,MultiValueLabel:z,Placeholder:B,Option:L},name:a.name,defaultValue:s,value:a.value?s:function(){if(!a.value)return i?[]:""}(),onChange:function(e){n.setFieldValue(a.name,e.map((function(e){return e.value})))},placeholder:t,options:r,isMulti:i,styles:V,isOptionSelected:function(e){return a.value.map((function(e){return e._id})).includes(e.value._id)},hideSelectedOptions:!0})},Ne=a(409),Be=function(){return Object(k.jsx)(Ne.a,{})},Pe=function(e){var t=e.label,a=e.field,n=ie({omitSelf:"true"}),r=n.data,c=n.isSuccess,i=he(),s=function(e){return e.map((function(e){return{label:"".concat(e.first_name," ").concat(e.last_name),value:{_id:e._id,first_name:e.first_name,last_name:e.last_name,rcId:e.rcId,image_path:e.image_path}}}))};if(c&&r){var l=s(r),o=s(a.value);return Object(k.jsxs)("div",{children:[Object(k.jsx)("label",{htmlFor:a.name,children:Object(k.jsx)(O.a,{className:i.selectTitles,children:t})}),Object(k.jsx)(ye.b,{name:a.name,value:a.value,component:_e,options:l,initSelections:o}),Object(k.jsx)(ye.a,{name:a.name})]})}return Object(k.jsx)(Be,{})},Re=a(197),Ae=function(e){var t=e.placeholder,a=e.field,n=e.form,c=e.options,i=e.isMulti,s=void 0===i||i,l=e.initSelections,o=Object(r.useState)(c),u=Object(m.a)(o,2),j=u[0],d=u[1];return Object(k.jsx)(Re.a,{components:{Control:A,Menu:_,MultiValueLabel:T,Placeholder:B},name:a.name,defaultValue:l,value:a.value?l:function(){if(!a.value)return s?[]:""}(),onChange:function(e){n.setFieldValue(a.name,e.map((function(e){return e.value})))},onCreateOption:function(e){var t={label:e,value:{value:e}};d([].concat(Object(Oe.a)(j),[t])),n.setFieldValue(a.name,[].concat(Object(Oe.a)(a.value),[t.value]))},placeholder:t,options:j,isMulti:s,isClearable:!0,styles:V,hideSelectedOptions:!0,isOptionSelected:function(e){return a.value.map((function(e){return e._id})).includes(e.value._id)}})},Ie=function(e){var t=e.label,a=e.field,n=ue(),r=n.data,c=n.isSuccess,i=he(),s=function(e){return e.map((function(e){return{label:"".concat(e.value),value:{_id:"".concat(e._id),value:"".concat(e.value)}}}))};if(c&&r){var l=s(r),o=s(a.value);return Object(k.jsxs)("div",{children:[Object(k.jsx)("label",{htmlFor:a.name,children:Object(k.jsx)(O.a,{className:i.selectTitles,children:t})}),Object(k.jsx)(ye.b,{name:a.name,value:a.value,component:Ae,options:l,initSelections:o}),Object(k.jsx)(ye.a,{name:a.name})]})}return Object(k.jsx)(Be,{})},ze=function(e){var t=e.onSubmit,a=e.onCancel,n=e.initialValues,r=he();return Object(k.jsx)(ye.d,{enableReinitialize:!0,initialValues:n,onSubmit:t,validationSchema:we.b({title:we.c().max(160,"must be 160 characters or less").required("title is required"),description:we.c().min(20,"must be 20 characters or longer").max(480,"must be 480 characters or less").notRequired(),githubLink:we.c().matches(/^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,"enter a valid url").notRequired(),active:we.a().notRequired()}),children:Object(k.jsx)(ye.c,{className:r.projectForm,children:Object(k.jsxs)(x.a,{container:!0,direction:"column",children:[Object(k.jsxs)(x.a,{item:!0,container:!0,className:r.projectFormRow,children:[Object(k.jsx)(x.a,{item:!0,xs:12,sm:10,className:r.titleGridItem,children:Object(k.jsx)(ye.b,{name:"title",label:"Title",component:ke})}),Object(k.jsx)(x.a,{item:!0,xs:12,sm:1,children:Object(k.jsx)(ye.b,{name:"active",component:Le})})]}),Object(k.jsx)(x.a,{item:!0,xs:12,children:Object(k.jsx)(ye.b,{name:"description",label:"Description",multiline:!0,component:ke})}),Object(k.jsx)(x.a,{item:!0,xs:12,children:Object(k.jsx)(ye.b,{name:"githubLink",label:"GitHub Link",component:ke})}),Object(k.jsxs)(x.a,{container:!0,direction:"row",spacing:2,children:[Object(k.jsx)(x.a,{item:!0,xs:12,children:Object(k.jsx)(ye.b,{name:"collaborators",label:"Collaborators",component:Pe})}),Object(k.jsx)(x.a,{item:!0,xs:12,children:Object(k.jsx)(ye.b,{name:"tags",label:"Tags",component:Ie})})]}),Object(k.jsxs)(x.a,{container:!0,className:r.formSubmitRow,children:[Object(k.jsx)(fe.a,{type:"submit",size:"small",color:"primary",variant:"outlined",className:r.button,children:"Submit"}),Object(k.jsx)(fe.a,{type:"button",onClick:a,size:"small",color:"primary",variant:"outlined",style:{color:"red",borderColor:"red"},className:r.button,children:"Cancel"})]})]})})})},Te=function(e){var t=e.projectToEdit,a=e.setOpen,n=he(),r=Object(K.b)(),c=Object(Ce.a)((function(e){return te.put("/projects/".concat(t._id),e,{withCredentials:!0})}),{onSuccess:function(){r.invalidateQueries(re),r.invalidateQueries(ne)}}),i=function(){var e=Object($.a)(Q.a.mark((function e(n){return Q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c.mutate(Object(F.a)(Object(F.a)({},t),{},{title:n.title,description:n.description,githubLink:n.githubLink,collaborators:n.collaborators,tags:n.tags,active:n.active})),a((function(e){return!e}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),s={title:t.title||"",description:t.description||"",githubLink:t.githubLink||"",collaborators:t.collaborators||[],tags:t.tags||[],active:t.active||!0};return Object(k.jsx)("div",{children:Object(k.jsx)(j.a,{disableGutters:!0,className:n.projectFormContainer,children:Object(k.jsx)(ze,{onSubmit:i,initialValues:s,onCancel:function(){a((function(e){return!e}))}})})})},Ve=function(e){var t=Object(r.useState)(!1),a=Object(m.a)(t,2),n=a[0],c=a[1];return Object(k.jsxs)("div",{children:[Object(k.jsx)(fe.a,{onClick:function(){return c(!0)},size:"small",color:"primary",variant:"outlined",children:"Edit"}),Object(k.jsxs)(ge.a,{open:n,onClose:function(){return c(!1)},maxWidth:"md",fullWidth:!0,children:[Object(k.jsx)(ve.a,{children:"Edit Project"}),Object(k.jsx)(Fe.a,{children:Object(k.jsx)(Te,{projectToEdit:e,setOpen:c})})]})]})},Me=a(414),Ee=a(415),Ge=function(e){var t=he(),a=Object(r.useState)(!1),n=Object(m.a)(a,2),c=n[0],i=n[1],s=Object(K.b)(),l=Object(Ce.a)((function(e){return te.delete("projects/".concat(e._id),{data:e,withCredentials:!0})}),{onSuccess:function(){s.invalidateQueries(re),s.invalidateQueries(ne)}}),o=function(){i(!1)};return Object(k.jsxs)("div",{children:[Object(k.jsx)(fe.a,{className:t.ownerDeleteButton,size:"small",variant:"outlined",onClick:function(){i(!0)},children:"Delete"}),Object(k.jsxs)(ge.a,{open:c,onClose:o,children:[Object(k.jsx)(ve.a,{children:"Delete Project"}),Object(k.jsx)(Fe.a,{children:Object(k.jsx)(Me.a,{children:"Are you sure you would like to delete this project listing? This action cannot be undone and this listing will be gone forever."})}),Object(k.jsxs)(Ee.a,{children:[Object(k.jsx)(fe.a,{onClick:o,color:"primary",children:"Cancel"}),Object(k.jsx)(fe.a,{className:t.ownerDeleteConfirmationButton,onClick:function(){o(),l.mutate(e)},variant:"outlined",autoFocus:!0,children:"Confirm Deletion"})]})]})]})},We=function(e){var t=e.project,a=he();return Object(k.jsx)(C.a,{className:a.projectPhoto,variant:"rounded",alt:t.owner.first_name+" "+t.owner.last_name,src:t.owner.image_path})},Ue=a(139),qe=a(434),He=a(416),Qe=a(417),$e=a(407),Je=a(418),Ke=a(419),Xe=function(e){var t,a=he(),n=v((function(e){return e.setOwnerFilter})),r=v((function(e){return e.setTagFilter})),c=v((function(e){return e.tagFilter})),i=e,s=Object(k.jsxs)(j.a,{disableGutters:!0,className:a.marginBottom,children:[Object(k.jsx)(O.a,{variant:"subtitle2",gutterBottom:!0,children:"Tags"}),e.tags.length?Object(k.jsx)(x.a,{children:e.tags.map((function(e){return Object(k.jsx)(qe.a,{className:a.chip,icon:Object(k.jsx)(S.e,{}),label:"".concat(e.value),onClick:function(){r(c?[].concat(Object(Oe.a)(c),[e.value]):[e.value])}},e._id.toString())}))}):Object(k.jsx)(O.a,{variant:"body2",color:"textSecondary",children:"No Tags"})]}),l=Object(k.jsxs)(j.a,{disableGutters:!0,className:a.marginBottom,children:[Object(k.jsx)(O.a,{variant:"subtitle2",gutterBottom:!0,children:"Collaborators"}),e.collaborators.length?Object(k.jsx)(x.a,{children:e.collaborators.map((function(e){return Object(k.jsx)(qe.a,{className:a.chip,avatar:Object(k.jsx)(C.a,{alt:"".concat(e.first_name," ").concat(e.last_name),src:e.image_path}),label:"".concat(e.first_name," ").concat(e.last_name),onClick:function(){n(e.rcId)}},e._id.toString())}))}):Object(k.jsx)(O.a,{variant:"body2",color:"textSecondary",children:"No Collaborators"})]});return Object(k.jsxs)(He.a,{className:a.staticProject,children:[Object(k.jsx)(Qe.a,{className:a.cardHeader,disableTypography:!0,title:Object(k.jsxs)(x.a,{container:!0,alignItems:"center",className:a.bigGridGap,children:[Object(k.jsx)(x.a,{item:!0,children:Object(k.jsx)(O.a,{variant:"h6",children:e.title})}),Object(k.jsx)(x.a,{item:!0,children:e.active?Object(k.jsx)(O.a,{variant:"button",color:"primary",children:"active"}):Object(k.jsx)(O.a,{variant:"button",color:"error",children:"inactive"})})]}),avatar:Object(k.jsx)(y.a,{xsDown:!0,children:Object(k.jsx)(We,{project:e})}),action:Object(k.jsxs)(x.a,{container:!0,alignItems:"center",children:[i.isOwner&&Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)(Ve,Object(F.a)({},e)),Object(k.jsx)(Ge,Object(F.a)({},e))]}),Object(k.jsx)($e.a,{href:(t=e.githubLink,/^((http|https|ftp):\/\/)/.test(t)?t:"http://".concat(t)),rel:"noreferrer",target:"_blank",children:Object(k.jsx)(Ue.a,{})}),Object(k.jsx)($e.a,{rel:"noreferrer",target:"_blank",href:"https://recurse.zulipchat.com/#narrow/pm-with/"+e.owner.zulip_id,children:Object(k.jsx)(Ue.b,{})})]}),subheader:Object(k.jsx)(k.Fragment,{children:Object(k.jsx)(Je.a,{className:a.cursorPointer,onClick:function(){return n(e.owner.rcId)},children:Object(k.jsx)(O.a,{variant:"body2",color:"textSecondary",children:"".concat(e.owner.first_name," ").concat(e.owner.last_name," (").concat(e.owner.batch,")")})})})}),Object(k.jsx)(Ke.a,{children:Object(k.jsxs)(j.a,{className:a.staticProjectDetails,children:[Object(k.jsx)(q.a,{className:a.staticProjectDivider}),Object(k.jsx)(O.a,{variant:"body1",component:"p",paragraph:!0,children:e.description}),Object(k.jsxs)(x.a,{container:!0,children:[Object(k.jsx)(x.a,{xs:12,lg:4,item:!0,children:l}),Object(k.jsx)(x.a,{xs:12,lg:8,item:!0,children:s})]})]})})]})},Ye=function(e){var t=e.projects;return t.length<1?Object(k.jsx)(xe,{}):Object(k.jsx)("main",{className:"project-list",children:t.map((function(e){return Object(k.jsx)(Xe,Object(F.a)({},e),e._id.toString())}))})},Ze=function(){var e=Object($.a)(Q.a.mark((function e(t){var a,n,r,c;return Q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=[],e.next=3,te.get("/projects/",{params:t,paramsSerializer:U,withCredentials:!0});case 3:return n=e.sent,r=n.data,c=void 0===r?a:r,e.abrupt("return",c);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),et=function(e){return Object(J.a)([re,e],(function(){return Ze(e)}),{keepPreviousData:!0})},tt=a(420),at=a.p+"static/media/rc-logo.d6168d48.png",nt=function(){var e=he();return Object(k.jsxs)(k.Fragment,{children:[Object(k.jsxs)(tt.a,{className:e.appBar,position:"fixed",children:[Object(k.jsxs)("div",{className:e.appBarLeft,children:[Object(k.jsx)(C.a,{variant:"square",alt:"logo",src:at}),Object(k.jsx)(y.a,{xsDown:!0,children:Object(k.jsx)(O.a,{component:"h1",variant:"h6",children:"RC-Prjkt"})})]}),Object(k.jsx)("div",{className:e.appBarRight,children:Object(k.jsx)(fe.a,{className:e.navButton,variant:"contained",color:"secondary",href:Z,children:"Authorize"})})]}),Object(k.jsxs)(j.a,{className:e.auth,maxWidth:"sm",children:[Object(k.jsx)("img",{alt:"logo",src:at}),Object(k.jsx)(O.a,{component:"h2",variant:"h5",children:"Welcome to RC Projects!"}),Object(k.jsx)(O.a,{variant:"body2",children:"Please authorize using your Recurse Center data to continue"}),Object(k.jsx)(fe.a,{href:Z,fullWidth:!0,variant:"contained",color:"secondary",children:"Authorize"})]})]})},rt=a(424),ct=a(421),it=a(402),st=function(e){var t=e.setOpen,a=Object(K.b)(),n=he(),r=Object(Ce.a)((function(e){return te.post("/projects/",e,{withCredentials:!0})}),{onSuccess:function(){a.invalidateQueries(re),a.invalidateQueries(ne)}}),c=function(){var e=Object($.a)(Q.a.mark((function e(a){return Q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r.mutate({title:a.title,description:a.description,githubLink:a.githubLink,collaborators:a.collaborators,tags:a.tags,active:a.active}),t((function(e){return!e}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(k.jsx)("div",{children:Object(k.jsx)(j.a,{disableGutters:!0,className:n.projectFormContainer,children:Object(k.jsx)(ze,{onSubmit:c,initialValues:{title:"",description:"",githubLink:"",collaborators:[],tags:[],active:!0},onCancel:function(){t((function(e){return!e}))}})})})},lt=function(){var e=Object(r.useState)(!1),t=Object(m.a)(e,2),a=t[0],n=t[1],c=Object(it.a)("(max-width: 650px)");return Object(k.jsxs)("div",{children:[Object(k.jsx)(fe.a,{variant:"contained",color:"secondary",onClick:function(){return n(!0)},children:c?Object(k.jsx)(S.d,{}):"Add Project"}),Object(k.jsxs)(ge.a,{open:a,onClose:function(){return n(!1)},maxWidth:"md",fullWidth:!0,children:[Object(k.jsx)(ve.a,{children:"Add Project"}),Object(k.jsx)(Fe.a,{children:Object(k.jsx)(st,{setOpen:n})})]})]})},ot=function(e){var t=e.allProjects,a=e.setAllProjects,r=e.setParams,c=v((function(e){return e.setOwnerFilter})),i=v((function(e){return e.setTagFilter})),s=Object(it.a)("(max-width: 650px)"),l=he();return Object(k.jsxs)(tt.a,{className:l.appBar,position:"fixed",children:[Object(k.jsxs)("div",{className:l.appBarLeft,children:[Object(k.jsx)(C.a,{variant:"square",alt:"logo",src:at}),Object(k.jsx)(y.a,{xsDown:!0,children:Object(k.jsx)(O.a,{component:"h1",variant:"h6",children:"RC-Prjkt"})})]}),Object(k.jsxs)("div",{className:l.appBarRight,children:[Object(k.jsx)(lt,{}),Object(k.jsxs)(rt.a,{value:t?0:1,classes:{indicator:l.tallIndicator},children:[Object(k.jsx)(ct.a,{label:!s&&"All Projects",icon:s?Object(k.jsx)(S.c,{}):"",onClick:function(){a(!0),r({status:!0,sort:n["Last Updated"]}),c(void 0),i(void 0)}}),Object(k.jsx)(ct.a,{label:!s&&"My Projects",icon:s?Object(k.jsx)(S.g,{}):"",onClick:function(){a(!1),r({me:!0,sort:n["Last Updated"]})}})]})]})]})},ut=a(422),jt=a(431),dt=a(425),bt=function(){var e,t=Object(r.useState)({sort:n["Last Updated"]}),a=Object(m.a)(t,2),c=a[0],i=a[1],s=Object(r.useState)(!0),l=Object(m.a)(s,2),o=l[0],u=l[1],j=Object(r.useState)(!1),d=Object(m.a)(j,2),b=d[0],p=d[1],h=et(c),x=h.data,O=h.isLoading,f=h.isSuccess,g=h.error,v=he();return O?Object(k.jsx)(k.Fragment,{}):g&&401===(null===(e=g.response)||void 0===e?void 0:e.status)?Object(k.jsx)(nt,{}):Object(k.jsxs)("div",{className:v.root,children:[Object(k.jsx)(ot,{setParams:i,allProjects:o,setAllProjects:u}),Object(k.jsx)(ut.a,{in:o,children:Object(k.jsx)(me,{setParams:i})}),Object(k.jsx)(jt.a,{anchorOrigin:{vertical:"top",horizontal:"center"},open:b,children:Object(k.jsx)(dt.a,{severity:"error",onClose:function(){return p(!1)},children:"An unexpected error has occurred"})}),f&&x?Object(k.jsx)(Ye,{projects:x}):Object(k.jsx)(Be,{})]})};function pt(){var e=he();return Object(k.jsxs)(x.a,{container:!0,direction:"column",alignItems:"center",className:e.footer,children:[Object(k.jsx)(O.a,{variant:"body1",children:Object(k.jsxs)(Je.a,{title:"Recurse Center Logo",color:"textSecondary",href:"https://recurse.com",target:"_blank",rel:"noreferrer",children:["Made with ",Object(k.jsx)(S.b,{})," at the Recurse Center"]})}),Object(k.jsx)(O.a,{variant:"body1",children:Object(k.jsxs)(Je.a,{color:"textSecondary",title:"GitHub Repo Link",href:"https://github.com/ArtSze/rc-prjkt-client",target:"_blank",rel:"noreferrer",children:[Object(k.jsx)(S.a,{})," View source code"]})})]})}var ht=function(){var e=he();return Object(k.jsxs)(j.a,{children:[Object(k.jsxs)(tt.a,{className:e.appBar,position:"fixed",children:[Object(k.jsxs)("div",{className:e.appBarLeft,children:[Object(k.jsx)(C.a,{variant:"square",alt:"logo",src:at}),Object(k.jsx)(y.a,{xsDown:!0,children:Object(k.jsx)(O.a,{component:"h1",variant:"h6",children:"RC-Prjkt"})})]}),Object(k.jsx)("div",{className:e.appBarRight,children:Object(k.jsx)(fe.a,{className:e.navButton,variant:"contained",color:"secondary",href:"/",children:"Home"})})]}),Object(k.jsxs)(j.a,{maxWidth:"md",className:e.notFound,children:[Object(k.jsx)(O.a,{variant:"h2",component:"h1",children:"404: Not Found"}),Object(k.jsx)(fe.a,{href:"/",variant:"contained",color:"secondary",className:e.notFoundButton,children:"Home"})]})]})},mt=function(){return Object(k.jsxs)(u.a,{theme:h,children:[Object(k.jsx)(j.a,{disableGutters:!0,maxWidth:"md",children:Object(k.jsx)(l.a,{children:Object(k.jsxs)(o.c,{children:[Object(k.jsx)(o.a,{exact:!0,path:"/",children:Object(k.jsx)(bt,{})}),Object(k.jsx)(o.a,{component:ht})]})})}),Object(k.jsx)(pt,{})]})},xt=a(426),Ot=a(199),ft=new xt.a;s.a.render(Object(k.jsx)(c.a.StrictMode,{children:Object(k.jsxs)(K.a,{client:ft,children:[Object(k.jsx)(mt,{}),Object(k.jsx)(Ot.ReactQueryDevtools,{initialIsOpen:!0})]})}),document.getElementById("root"))}},[[360,1,2]]]);
//# sourceMappingURL=main.3438b688.chunk.js.map