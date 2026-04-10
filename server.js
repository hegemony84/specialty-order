const express = require('express');
const path    = require('path');
const app     = express();
const PORT    = process.env.PORT || 3000;

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'public')));

// 주문 페이지
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 관리자 PC 페이지
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// 관리자 모바일 페이지
app.get('/admin/mobile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-mobile.html'));
});

// 통계 페이지
app.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'stats.html'));
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
