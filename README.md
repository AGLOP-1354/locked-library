# Locked Library (잠긴 서재)

유튜브 채널 [잠긴 서재](https://www.youtube.com/channel/UCVVokZDi8yuOx63ir-I2BBg)의 공포·추리·미스터리 책을 무료/유료로 나눠 보여주는 정적 사이트.

```bash
cp .env.example .env.local   # NEXT_PUBLIC_GA_ID 입력
pnpm install
pnpm dev                     # http://localhost:3000
pnpm build                   # 정적 결과물 → out/
pnpm preview                 # out/ 로컬 서빙 (:4173)
pnpm deploy:pages            # Cloudflare Pages 배포 → https://lockedlibrary.pages.dev
```

AI 작업 규칙은 [CLAUDE.md](CLAUDE.md)와 `.claude/`를 참고.
