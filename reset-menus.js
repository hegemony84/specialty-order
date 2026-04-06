const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc,
        getDocs, setDoc, deleteDoc, writeBatch } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBSv0AWNRGxhyq97MvI3Kc2S-cM8kXNdj4",
  authDomain: "tfp-with-ai.firebaseapp.com",
  projectId: "tfp-with-ai",
  storageBucket: "tfp-with-ai.firebasestorage.app",
  messagingSenderId: "667927194187",
  appId: "1:667927194187:web:e93bcb20fa80c438e2bbce"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ── 새 메뉴 데이터 (ID를 메뉴명 기반으로 정리) ──
const newMenus = [
  // 커피
  { id:'americano',     name:'아메리카노',        price:1000, type:'hot-ice', category:'coffee',   order:1, visible:true, imgUrl:'' },
  { id:'decaf',         name:'디카페인 아메리카노', price:1000, type:'hot-ice', category:'coffee',   order:2, visible:true, imgUrl:'' },
  { id:'affogato',      name:'아포카토',           price:2000, type:'single',  category:'coffee',   order:3, visible:true, imgUrl:'' },
  // 에이드
  { id:'grape-ade',     name:'청포도 에이드',      price:1000, type:'single',  category:'ade',      order:1, visible:true, imgUrl:'' },
  { id:'grapefruit-ade',name:'자몽 에이드',        price:1000, type:'single',  category:'ade',      order:2, visible:true, imgUrl:'' },
  // 스무디
  { id:'strawberry-smoothie', name:'딸기 스무디',   price:2000, type:'single', category:'smoothie', order:1, visible:true, imgUrl:'',
    topping:{ name:'🧀 치즈 큐브', price:500 } },
  { id:'kiwi-smoothie',       name:'키위 스무디',   price:2000, type:'single', category:'smoothie', order:2, visible:true, imgUrl:'',
    topping:{ name:'🧀 치즈 큐브', price:500 } },
  { id:'berry-smoothie',      name:'베리믹스 스무디',price:2000, type:'single', category:'smoothie', order:3, visible:true, imgUrl:'',
    topping:{ name:'🧀 치즈 큐브', price:500 } },
  // 차
  { id:'herbtea',       name:'허브티',            price:1000, type:'hot-ice', category:'tea',      order:1, visible:true, imgUrl:'' },
  // 기타
  { id:'patbingsu',     name:'팥빙수',            price:3000, type:'single',  category:'etc',      order:1, visible:true, imgUrl:'',
    limited:'7월 한정' },
];

async function resetMenus() {
  console.log('🗑️  기존 menus 컬렉션 삭제 중...');

  // 기존 문서 전체 삭제
  const snap = await getDocs(collection(db, 'menus'));
  const deleteBatch = writeBatch(db);
  snap.docs.forEach(d => deleteBatch.delete(doc(db, 'menus', d.id)));
  await deleteBatch.commit();
  console.log(`   ${snap.docs.length}개 문서 삭제 완료`);

  // 새 데이터 업로드
  console.log('📦 새 메뉴 데이터 업로드 중...');
  const addBatch = writeBatch(db);
  newMenus.forEach(m => {
    const { id, ...data } = m;
    addBatch.set(doc(db, 'menus', id), data);
  });
  await addBatch.commit();

  console.log(`✅ ${newMenus.length}개 메뉴 업로드 완료!`);
  newMenus.forEach(m => console.log(`   ${m.category} | ${m.order}. ${m.name} (${m.id})`));
  console.log('🎉 메뉴 전면 재정리 완료!');
  process.exit(0);
}

resetMenus().catch(e => { console.error('❌ 실패:', e.message); process.exit(1); });
