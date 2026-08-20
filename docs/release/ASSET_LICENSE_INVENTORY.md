# 배포 자산 라이선스 인벤토리

이 문서는 ZIP에 포함하는 모든 이미지·폰트·아이콘의 권한을 출시에 앞서 확인하기 위한 목록입니다. 권한이 확인되지 않은 자산은 배포 패키지에 넣지 않습니다.

기존 데모 템플릿의 이미지 주소는 출력 시 현재 설치된 테마 주소로 변환됩니다. 이 변환은 설치 위치 문제만 해결하며, 이미지의 상업 사용·재배포 권한을 대신 확인하지는 않습니다.

| 자산 위치 | 용도 | 권리 상태 | 출시 판단 |
| --- | --- | --- | --- |
| `assets/images/generated/` | 이전 교회 데모 이미지 | 출처 기록 없음 | ZIP 제외 |
| `assets/images/logos/` | 이전 로고 시안 | 고객·브랜드 권리 기록 없음 | ZIP 제외 |
| `assets/images/style1/` | 초기 디자인 참고 이미지 | 원본·재배포 권리 기록 없음 | ZIP 제외 |
| `assets/images/ktheme-demo-community-01.png` ~ `04.png` | 기본 데모 이미지 | 2026-08-20, Codex Image Generation으로 새 생성. 사람·브랜드·문자·외부 이미지 참조 없이 생성했고 생성물 사용 조건을 검토함 | 포함 가능 |
| Pretendard CDN v1.3.9 | 기본 글꼴(외부 로드) | SIL Open Font License 1.1, 공식 저장소의 라이선스 원문 확인 | 외부 로드 유지; 버전과 라이선스 URL을 릴리스 노트에 기록 |
| WordPress core icons/blocks | 편집기 UI | WordPress 배포 정책 따름 | 포함 가능 여부를 패키지 정책에서 확인 |

## 완료 조건

포함하는 각 행에는 원저작자, 라이선스, 상업 사용 가능 여부, 재배포 가능 여부, 표기 필요 여부, 포함 위치를 채웁니다. 출처가 없는 기존 자산은 반드시 ZIP 제외로 남깁니다.

## 확인한 공개 구성요소

- Pretendard v1.3.9: [공식 라이선스 원문](https://github.com/orioncactus/pretendard/blob/main/LICENSE) 기준 SIL Open Font License 1.1입니다. 현재 테마는 글꼴 파일을 ZIP에 넣지 않고 고정 버전 CDN을 외부에서 불러옵니다.
- KTheme 데모 이미지: [OpenAI 공식 이용약관](https://openai.com/policies/terms-of-use/)의 Output 소유 조항과 사용 전 사람 검토 의무를 기준으로, 생성 프롬프트·생성일·포함 파일을 이 문서에 기록했습니다. 실제 고객 로고·인물·장소를 입력으로 사용하지 않았습니다.
