주요 액션을 위한 알약형 버튼. CTA, 폼 제출, 링크 버튼에 사용.

```jsx
<Button variant="brand" size="lg">이번 주 설교 보기</Button>
<Button variant="outline">새가족 등록</Button>
<Button variant="dark" iconRight={<Arrow/>}>다시보기</Button>
```

- `variant`: `dark`(기본, 잉크) · `brand`(블루) · `outline`(테두리, hover 반전) · `ghost`(연한 면)
- `size`: `sm`(36) · `md`(44) · `lg`(48)
- 어두운 배경 위에서는 흰 버튼이 필요할 수 있음 — `style`로 배경/색 오버라이드.
