const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, deleteDoc, writeBatch } = require('firebase/firestore');

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

async function updateMenus() {
  console.log('📦 메뉴 업데이트 시작...');
  const batch = writeBatch(db);

  // 1. 아포가토 → 아포카토 수정
  batch.update(doc(db, 'menus', 'coffee-2'), { name: '아포카토' });
  console.log('✅ 아포카토 이름 수정');

  // 2. 디카페인 아메리카노 추가
  batch.set(doc(db, 'menus', 'coffee-3'), {
    name: '디카페인 아메리카노', price: 1000,
    type: 'hot-ice', category: 'coffee',
    visible: true, order: 3
  });
  console.log('✅ 디카페인 아메리카노 추가');

  // 3. 차 메뉴 - 허브티만 남기고 나머지 삭제
  batch.delete(doc(db, 'menus', 'tea-1')); // 다즐링
  batch.delete(doc(db, 'menus', 'tea-2')); // 얼그레이
  batch.delete(doc(db, 'menus', 'tea-4')); // 국화차
  // tea-3 허브티는 유지
  console.log('✅ 다즐링, 얼그레이, 국화차 삭제');

  await batch.commit();
  console.log('🎉 메뉴 업데이트 완료!');
  process.exit(0);
}

updateMenus().catch(e => { console.error('❌ 실패:', e.message); process.exit(1); });
