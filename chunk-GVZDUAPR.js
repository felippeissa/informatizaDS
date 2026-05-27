import{Ba as b,Ca as C,Ce as r,De as N,Fa as T,Fb as M,Ga as I,Ha as p,L as m,M as y,O as h,Oa as _,Q as a,Wa as o,Xa as g,Ya as u,Za as A,bb as P,cb as V,ec as q,ee as K,fe as c,ha as s,hb as k,ib as D,jb as x,kb as R,mb as w,me as S,nb as F,oc as G,ra as l,rc as $,tc as J,ub as Q,vb as d,wb as H,wc as B,xb as O,ye as z,ze as E}from"./chunk-EYSUCDVA.js";var L=`
    .p-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: dt('tag.primary.background');
        color: dt('tag.primary.color');
        font-size: dt('tag.font.size');
        font-weight: dt('tag.font.weight');
        padding: dt('tag.padding');
        border-radius: dt('tag.border.radius');
        gap: dt('tag.gap');
    }

    .p-tag-icon {
        font-size: dt('tag.icon.size');
        width: dt('tag.icon.size');
        height: dt('tag.icon.size');
    }

    .p-tag-rounded {
        border-radius: dt('tag.rounded.border.radius');
    }

    .p-tag-success {
        background: dt('tag.success.background');
        color: dt('tag.success.color');
    }

    .p-tag-info {
        background: dt('tag.info.background');
        color: dt('tag.info.color');
    }

    .p-tag-warn {
        background: dt('tag.warn.background');
        color: dt('tag.warn.color');
    }

    .p-tag-danger {
        background: dt('tag.danger.background');
        color: dt('tag.danger.color');
    }

    .p-tag-secondary {
        background: dt('tag.secondary.background');
        color: dt('tag.secondary.color');
    }

    .p-tag-contrast {
        background: dt('tag.contrast.background');
        color: dt('tag.contrast.color');
    }
`;var nt=["icon"],it=["*"];function ot(t,f){if(t&1&&A(0,"span",4),t&2){let n=k(2);d(n.cx("icon")),o("ngClass",n.icon)("pBind",n.ptm("icon"))}}function rt(t,f){if(t&1&&(P(0),p(1,ot,1,4,"span",3),V()),t&2){let n=k();l(),o("ngIf",n.icon)}}function at(t,f){}function dt(t,f){t&1&&p(0,at,0,0,"ng-template")}function lt(t,f){if(t&1&&(g(0,"span",2),p(1,dt,1,0,null,5),u()),t&2){let n=k();d(n.cx("icon")),o("pBind",n.ptm("icon")),l(),o("ngTemplateOutlet",n.iconTemplate||n._iconTemplate)}}var st={root:({instance:t})=>["p-tag p-component",{"p-tag-info":t.severity==="info","p-tag-success":t.severity==="success","p-tag-warn":t.severity==="warn","p-tag-danger":t.severity==="danger","p-tag-secondary":t.severity==="secondary","p-tag-contrast":t.severity==="contrast","p-tag-rounded":t.rounded}],icon:"p-tag-icon",label:"p-tag-label"},U=(()=>{class t extends S{name="tag";style=L;classes=st;static \u0275fac=(()=>{let n;return function(e){return(n||(n=s(t)))(e||t)}})();static \u0275prov=m({token:t,factory:t.\u0275fac})}return t})();var W=new h("TAG_INSTANCE"),ct=(()=>{class t extends E{$pcTag=a(W,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=a(r,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;severity;value;icon;rounded;iconTemplate;templates;_iconTemplate;_componentStyle=a(U);onAfterContentInit(){this.templates?.forEach(n=>{switch(n.getType()){case"icon":this._iconTemplate=n.template;break}})}get dataP(){return this.cn({rounded:this.rounded,[this.severity]:this.severity})}static \u0275fac=(()=>{let n;return function(e){return(n||(n=s(t)))(e||t)}})();static \u0275cmp=b({type:t,selectors:[["p-tag"]],contentQueries:function(i,e,j){if(i&1&&R(j,nt,4)(j,K,4),i&2){let v;w(v=F())&&(e.iconTemplate=v.first),w(v=F())&&(e.templates=v)}},hostVars:3,hostBindings:function(i,e){i&2&&(_("data-p",e.dataP),d(e.cn(e.cx("root"),e.styleClass)))},inputs:{styleClass:"styleClass",severity:"severity",value:"value",icon:"icon",rounded:[2,"rounded","rounded",q]},features:[M([U,{provide:W,useExisting:t},{provide:z,useExisting:t}]),T([r]),I],ngContentSelectors:it,decls:5,vars:6,consts:[[4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"pBind"],[3,"class","ngClass","pBind",4,"ngIf"],[3,"ngClass","pBind"],[4,"ngTemplateOutlet"]],template:function(i,e){i&1&&(D(),x(0),p(1,rt,2,1,"ng-container",0)(2,lt,2,4,"span",1),g(3,"span",2),H(4),u()),i&2&&(l(),o("ngIf",!e.iconTemplate&&!e._iconTemplate),l(),o("ngIf",e.iconTemplate||e._iconTemplate),l(),d(e.cx("label")),o("pBind",e.ptm("label")),l(),O(e.value))},dependencies:[B,G,$,J,c,r],encapsulation:2,changeDetection:0})}return t})(),Nt=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=C({type:t});static \u0275inj=y({imports:[ct,c,c]})}return t})();var X=`
    .p-divider-horizontal {
        display: flex;
        width: 100%;
        position: relative;
        align-items: center;
        margin: dt('divider.horizontal.margin');
        padding: dt('divider.horizontal.padding');
    }

    .p-divider-horizontal:before {
        position: absolute;
        display: block;
        inset-block-start: 50%;
        inset-inline-start: 0;
        width: 100%;
        content: '';
        border-block-start: 1px solid dt('divider.border.color');
    }

    .p-divider-horizontal .p-divider-content {
        padding: dt('divider.horizontal.content.padding');
    }

    .p-divider-vertical {
        min-height: 100%;
        display: flex;
        position: relative;
        justify-content: center;
        margin: dt('divider.vertical.margin');
        padding: dt('divider.vertical.padding');
    }

    .p-divider-vertical:before {
        position: absolute;
        display: block;
        inset-block-start: 0;
        inset-inline-start: 50%;
        height: 100%;
        content: '';
        border-inline-start: 1px solid dt('divider.border.color');
    }

    .p-divider.p-divider-vertical .p-divider-content {
        padding: dt('divider.vertical.content.padding');
    }

    .p-divider-content {
        z-index: 1;
        background: dt('divider.content.background');
        color: dt('divider.content.color');
    }

    .p-divider-solid.p-divider-horizontal:before {
        border-block-start-style: solid;
    }

    .p-divider-solid.p-divider-vertical:before {
        border-inline-start-style: solid;
    }

    .p-divider-dashed.p-divider-horizontal:before {
        border-block-start-style: dashed;
    }

    .p-divider-dashed.p-divider-vertical:before {
        border-inline-start-style: dashed;
    }

    .p-divider-dotted.p-divider-horizontal:before {
        border-block-start-style: dotted;
    }

    .p-divider-dotted.p-divider-vertical:before {
        border-inline-start-style: dotted;
    }

    .p-divider-left:dir(rtl),
    .p-divider-right:dir(rtl) {
        flex-direction: row-reverse;
    }
`;var pt=["*"],gt={root:({instance:t})=>({justifyContent:t.layout==="horizontal"?t.align==="center"||t.align==null?"center":t.align==="left"?"flex-start":t.align==="right"?"flex-end":null:null,alignItems:t.layout==="vertical"?t.align==="center"||t.align==null?"center":t.align==="top"?"flex-start":t.align==="bottom"?"flex-end":null:null})},ut={root:({instance:t})=>["p-divider p-component","p-divider-"+t.layout,"p-divider-"+t.type,{"p-divider-left":t.layout==="horizontal"&&(!t.align||t.align==="left")},{"p-divider-center":t.layout==="horizontal"&&t.align==="center"},{"p-divider-right":t.layout==="horizontal"&&t.align==="right"},{"p-divider-top":t.layout==="vertical"&&t.align==="top"},{"p-divider-center":t.layout==="vertical"&&(!t.align||t.align==="center")},{"p-divider-bottom":t.layout==="vertical"&&t.align==="bottom"}],content:"p-divider-content"},Y=(()=>{class t extends S{name="divider";style=X;classes=ut;inlineStyles=gt;static \u0275fac=(()=>{let n;return function(e){return(n||(n=s(t)))(e||t)}})();static \u0275prov=m({token:t,factory:t.\u0275fac})}return t})();var Z=new h("DIVIDER_INSTANCE"),ft=(()=>{class t extends E{$pcDivider=a(Z,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=a(r,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;layout="horizontal";type="solid";align;_componentStyle=a(Y);get dataP(){return this.cn({[this.align]:this.align,[this.layout]:this.layout,[this.type]:this.type})}static \u0275fac=(()=>{let n;return function(e){return(n||(n=s(t)))(e||t)}})();static \u0275cmp=b({type:t,selectors:[["p-divider"]],hostAttrs:["role","separator"],hostVars:6,hostBindings:function(i,e){i&2&&(_("aria-orientation",e.layout)("data-p",e.dataP),Q(e.sx("root")),d(e.cn(e.cx("root"),e.styleClass)))},inputs:{styleClass:"styleClass",layout:"layout",type:"type",align:"align"},features:[M([Y,{provide:Z,useExisting:t},{provide:z,useExisting:t}]),T([r]),I],ngContentSelectors:pt,decls:2,vars:3,consts:[[3,"pBind"]],template:function(i,e){i&1&&(D(),g(0,"div",0),x(1),u()),i&2&&(d(e.cx("content")),o("pBind",e.ptm("content")))},dependencies:[B,c,N,r],encapsulation:2,changeDetection:0})}return t})(),Ut=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=C({type:t});static \u0275inj=y({imports:[ft,N,N]})}return t})();export{ct as a,Nt as b,ft as c,Ut as d};
