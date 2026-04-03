const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, writeBatch } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBSv0AWNRGxhyq97MvI3Kc2S-cM8kXNdj4",
  authDomain: "tfp-with-ai.firebaseapp.com",
  projectId: "tfp-with-ai",
  storageBucket: "tfp-with-ai.firebasestorage.app",
  messagingSenderId: "667927194187",
  appId: "1:667927194187:web:e93bcb20fa80c438e2bbce"
};

const app  = initializeApp(firebaseConfig);
const db   = getFirestore(app);

// ── 메뉴 데이터 ──
const menus = [
  // 커피
  { id:'coffee-1', name:'아메리카노',      price:1000, type:'hot-ice', category:'coffee',   visible:true, order:1 },
  { id:'coffee-2', name:'아포가토',        price:2000, type:'single',  category:'coffee',   visible:true, order:2 },
  // 에이드
  { id:'ade-1',    name:'청포도 에이드',   price:1000, type:'single',  category:'ade',      visible:true, order:1 },
  { id:'ade-2',    name:'자몽 에이드',     price:1000, type:'single',  category:'ade',      visible:true, order:2 },
  // 스무디
  { id:'smo-1',    name:'딸기 스무디',     price:2000, type:'single',  category:'smoothie', visible:true, order:1,
    topping: { name:'🧀 치즈 큐브', price:500 } },
  { id:'smo-2',    name:'키위 스무디',     price:2000, type:'single',  category:'smoothie', visible:true, order:2,
    topping: { name:'🧀 치즈 큐브', price:500 } },
  { id:'smo-3',    name:'베리믹스 스무디', price:2000, type:'single',  category:'smoothie', visible:true, order:3,
    topping: { name:'🧀 치즈 큐브', price:500 } },
  // 차
  { id:'tea-1',    name:'다즐링',          price:1000, type:'hot-ice', category:'tea',      visible:true, order:1 },
  { id:'tea-2',    name:'얼그레이',        price:1000, type:'hot-ice', category:'tea',      visible:true, order:2 },
  { id:'tea-3',    name:'허브티',          price:1000, type:'hot-ice', category:'tea',      visible:true, order:3 },
  { id:'tea-4',    name:'국화차',          price:1000, type:'hot-ice', category:'tea',      visible:true, order:4 },
  // 기타
  { id:'etc-1',    name:'팥빙수',          price:3000, type:'single',  category:'etc',      visible:true, order:1,
    limited:'7월 한정' },
];

// ── 관리자 설정 초기값 ──
const settings = {
  coinEnabled: false,
};

async function seed() {
  try {
    console.log('📦 메뉴 업로드 시작...');

    const batch = writeBatch(db);

    // 메뉴 일괄 업로드
    menus.forEach(m => {
      const ref = doc(db, 'menus', m.id);
      batch.set(ref, m);
    });

    // 관리자 설정 업로드
    const settingsRef = doc(db, 'settings', 'admin');
    batch.set(settingsRef, settings);

    await batch.commit();

    console.log(`✅ 메뉴 ${menus.length}개 업로드 완료!`);
    console.log('✅ 관리자 설정 업로드 완료!');
    console.log('🎉 모든 초기 데이터 업로드 완료!');
    process.exit(0);

  } catch (err) {
    console.error('❌ 업로드 실패:', err.message);
    process.exit(1);
  }
}

seed();