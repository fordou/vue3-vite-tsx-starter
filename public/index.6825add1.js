import{g as a,a as t,r as n,o as i,j as e,T as o,b as r}from"./index.a953caf7.js";const d=[{title:"title",dataIndex:"title"},{title:"description",dataIndex:"description"},{title:"author",dataIndex:"author"},{title:"datetime",dataIndex:"datetime"}];var s=t({setup(){const t=n({data:[],pagination:{showLessItems:!0,showQuickJumper:!0,showSizeChanger:!0,current:1,pageSize:20,total:20},query:{},loading:!1,columns:d});function s({current:a}){t.pagination={...t.pagination,current:a},u()}async function u(){t.loading=!0;const[n]=await r(function(t){return a("/table/list",{data:t})}({pageSize:t.pagination.pageSize,current:t.pagination.current})),{data:i,total:e}=n,o={...t.pagination};o.total=e,t.loading=!1,t.data=i,t.pagination=o}return i(u),()=>e(o,{columns:d,rowKey:a=>a.uuid,dataSource:t.data,pagination:t.pagination,loading:t.loading,onChange:s})}});export default s;
