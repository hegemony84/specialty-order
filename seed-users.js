const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');

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
const auth = getAuth(app);

// ── 초기 사용자 데이터 ──
// 실제 운영 시 학생 이름/학번으로 교체
const users = [
  { email:'student01@tfp.school', password:'tfp1234!', name:'김지수', role:'student', coin:20000 },
  { email:'student02@tfp.school', password:'tfp1234!', name:'박민준', role:'student', coin:20000 },
  { email:'student03@tfp.school', password:'tfp1234!', name:'이서연', role:'student', coin:20000 },
  { email:'teacher01@tfp.school', password:'tfpAdmin!', name:'이형준', role:'teacher', coin:50000 },
];

async function seedUsers() {
  console.log('👤 사용자 생성 시작...');

  for (const u of users) {
    try {
      // Firebase Auth에 계정 생성
      const cred = await createUserWithEmailAndPassword(auth, u.email, u.password);
      const uid  = cred.user.uid;

      // Firestore users 컬렉션에 프로필 + 잔액 저장
      await setDoc(doc(db, 'users', uid), {
        name:      u.name,
        email:     u.email,
        role:      u.role,
        coin:      u.coin,
        createdAt: new Date().toISOString(),
      });

      console.log(`✅ ${u.name} (${u.email}) 생성 완료`);

    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        console.log(`⚠️  ${u.email} 이미 존재 — 건너뜀`);
      } else {
        console.error(`❌ ${u.email} 실패:`, err.message);
      }
    }
  }

  console.log('🎉 사용자 생성 완료!');
  process.exit(0);
}

seedUsers();