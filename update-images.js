const { initializeApp } = require('firebase/app');
const { getFirestore, doc, updateDoc, writeBatch } = require('firebase/firestore');

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

const BASE = 'https://raw.githubusercontent.com/hegemony84/specialty-order/main/public/images';

const imgUrls = [
  { id:'americano',          file:'americano.png' },
  { id:'decaf',              file:'decaf.png' },
  { id:'affogato',           file:'affogato.png' },
  { id:'caffe-latte',        file:'caffe-latte.png' },
  { id:'grape-ade',          file:'grape-ade.png' },
  { id:'grapefruit-ade',     file:'grapefruit-ade.png' },
  { id:'strawberry-smoothie',file:'strawberry-smoothie.png' },
  { id:'kiwi-smoothie',      file:'kiwi-smoothie.png' },
  { id:'berry-smoothie',     file:'berry-smoothie.png' },
  { id:'herbtea',            file:'herbtea.png' },
  { id:'patbingsu',          file:'patbingsu.png' },
];

async function updateImgUrls() {
  console.log('🖼️  이미지 URL 업데이트 시작...');
  const batch = writeBatch(db);

  imgUrls.forEach(({ id, file }) => {
    const url = `${BASE}/${file}`;
    batch.update(doc(db, 'menus', id), { imgUrl: url });
    console.log(`   ${id} → ${url}`);
  });

  await batch.commit();
  console.log('🎉 이미지 URL 업데이트 완료!');
  process.exit(0);
}

updateImgUrls().catch(e => { console.error('❌ 실패:', e.message); process.exit(1); });
