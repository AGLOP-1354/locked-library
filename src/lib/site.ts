export const site = {
  name: "Locked Library",
  nameKo: "잠긴 서재",
  description: "공포, 추리, 미스터리 소설을 영상으로 보고, 책으로 읽는 곳",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "ko_KR",
  youtube: {
    channelId: "UCVVokZDi8yuOx63ir-I2BBg",
    channelUrl: "https://www.youtube.com/channel/UCVVokZDi8yuOx63ir-I2BBg",
  },
} as const;
