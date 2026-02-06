# 🎵 Vibe Coding Radio

> Pomodoro timer + music player for vibe coding sessions

코딩할 때 집중력을 높여주는 뽀모도로 타이머와 YouTube 음악 플레이어를 결합한 웹 앱입니다.  
세션 기록과 주간 바이브 리포트로 코딩 습관을 트래킹하세요.

![Vibe Coding Radio](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ Features

### 🍅 Pomodoro Timer

- Focus / Short Break / Long Break 모드
- 커스텀 시간 설정 (기본 25/5/15분)
- 브라우저 탭에 남은 시간 표시
- 데스크탑 알림 지원
- 세션 자동 전환

### 🎵 Music Player

- YouTube 음악 검색 및 재생
- 코딩용 음악 프리셋 (Lofi, Synthwave, Ambient 등)
- 재생 대기열 관리
- 즐겨찾기 저장
- 타이머 연동 자동 재생/일시정지

### 📋 Session Tracking

- 프로젝트명, 언어, 기분 기록
- 세션 뽀모도로 카운트
- 검색 및 필터링
- LocalStorage 영구 저장

### 📊 Dashboard

- 주간 바이브 리포트
- 요일별 집중 시간 차트
- 기분 분포 도넛 차트
- 언어/프로젝트별 통계
- 🔥 스트릭 (연속 코딩 일수)
- GitHub 스타일 활동 히트맵

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand (with persist)
- **Charts**: Chart.js + react-chartjs-2
- **Music**: YouTube IFrame API
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- YouTube Data API Key ([Google Cloud Console](https://console.cloud.google.com/)에서 발급)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Dev-2A/vibe-coding-radio.git
cd vibe-coding-radio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# .env.local 파일을 열어 YouTube API 키 입력

# 4. Run development server
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### Environment Variables

```env
# YouTube Data API v3
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key_here

# App URL (배표 시 변경)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📁 Project Structure

```text
vibe-coding-radio/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 홈 (타이머)
│   ├── music/             # 음악 페이지
│   ├── sessions/          # 세션 히스토리
│   ├── dashboard/         # 주간 리포트
│   └── settings/          # 설정
├── src/
│   ├── components/        # React 컴포넌트
│   │   ├── dashboard/     # 차트, 통계 카드
│   │   ├── layout/        # Header, Sidebar
│   │   ├── music/         # 플레이어, 검색
│   │   ├── session/       # 세션 폼, 카드
│   │   ├── timer/         # 타이머 위젯
│   │   └── ui/            # 공통 UI
│   ├── hooks/             # 커스텀 훅
│   ├── stores/            # Zustand 스토어
│   ├── lib/               # 유틸리티
│   └── types/             # TypeScript 타입
└── public/                # 정적 파일
```

## 🌐 Deployment

### Vercel (권장)

1. [Vercel](https://vercel.com)에 GitHub 레포 연결
2. Environment Variables 설정
3. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/vibe-coding-radio)

### 수동 빌드

```bash
npm run build
npm start
```

## 📝 Usage Tips

1. **세션 시작**: 홈에서 프로젝트명 입력 → Start Session
2. **타이머 실행**: 중앙 ▶ 버튼 클릭
3. **음악 재생**: Music 페이지에서 검색 또는 프리셋 선택
4. **자동 연동**: Settings에서 "Focus 시작 시 음악 자동 재생" 활성화
5. **세션 종료**: 코딩 끝나면 기분 선택 → Complete Session
6. **리포트 확인**: Dashboard에서 주간 통계 확인

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

- [Lucide Icons](https://lucide.dev/)
- [Chart.js](https://www.chartjs.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)

---

Made with 🎵 and ☕ by Dev-2A
