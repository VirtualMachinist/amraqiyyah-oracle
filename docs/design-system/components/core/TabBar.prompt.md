# TabBar
Top-level pill navigation for switching product sections; the active pill is gold.

```jsx
<TabBar tabs={[{key:"now",label:"Now"},{key:"reading",label:"Reading"}]} active={tab} onChange={setTab}/>
```

`tabs` accepts strings or {key,label}. Scrolls horizontally on overflow.