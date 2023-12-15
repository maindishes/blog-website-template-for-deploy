# 블로그 개발 스터디

이 저장소는 42서울 교육생들이 모여 개인 블로그를 만드는 데 사용되는 보일러플레이트입니다.\
누구나 자유롭게 가져가서 개선하고 블로그용으로 사용하셔도 됩니다.

기간: 23.11.27 ~ 23.12.22

참여자 목록

- [강지호(jihkang)](https://profile.intra.42.fr/users/jihkang)
- [김동현(donghyk2)](https://profile.intra.42.fr/users/donghyk2)
- [김성욱(sungwook)](https://profile.intra.42.fr/users/sungwook)
- [김한결(hakim)](https://profile.intra.42.fr/users/hakim)
- [이소현(sohlee)](https://profile.intra.42.fr/users/sohlee)
- [황성준(sunhwang)](https://profile.intra.42.fr/users/sunhwang)

## 깃허브 블로그용 저장소 생성
깃허브 계정으로 로그인한 뒤, Public 저장소를 하나 생성해야 합니다.\
저장소 이름은 `{사용자명}.github.io`로 만들어야 합니다.\
Settings -> General -> Default branch는 dev(개발 브랜치)로 변경합니다(main 브랜치는 깃허브 액션으로 만들어진 빌드 파일들이 저장될 예정입니다).\
그리고 이 저장소를 만들어진 블로그 원격 저장소로 올립니다.

blog-website-template가 연결된 원격 저장소를 지우고 블로그 원격 저장소와 연결해야 합니다.
```sh
git remote remove origin
git remote add origin git@github.com:{사용자명}/{사용자명}.github.io.git
git branch -M dev
git push -u origin dev
```

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## 블로그 개발 환경

초기 세팅이 어떻게 설정되어 있는지 알려드립니다. 큰 틀에서 봤을 때 아래와 같이 구성되어 있습니다.

pnpm과 next.js 명령어를 통해 빌드, 개발용 또는 프로덕션용으로 실행이 가능합니다.\
react를 통해 만들고 싶은 화면과 이벤트를 구현할 수 있고 tailwind css로 원하는 대로 스타일을 줄 수 있습니다.\
ESLint와 Prettier는 개발을 할 때 코드 퀄리티를 높이고 가독성이 좋은 코드를 만들 수 있도록 도와줍니다.

- 패키지 매니저: [pnpm](https://pnpm.io/)
- 풀스택 웹 애플리케이션: [Next.js](https://nextjs.org/)
- 프론트앤드 라이브러리: [React](https://react.dev/)
- 개발 언어: [TypeScript](https://www.typescriptlang.org/)
- CSS 스타일: [Tailwind CSS](https://tailwindcss.com/)
- 코드 정적 분석: [ESLint](https://eslint.org/)
- 코드 포맷터: [Prettier](https://prettier.io/)
- 게시글 서식 언어: [Markdown](https://ko.wikipedia.org/wiki/%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4)
- ⭐️ SSG 설정 방식 참고: [Contentlayer](https://contentlayer.dev/docs/getting-started-cddd76b7#typescript-configuration)

### Contentlayer 설정하는 법
⭐️ Contentlayer를 개인 repo에 추가하고 싶은 경우 해야 하는 게 있습니다.\
각 파일을 직접 확인하고 비교해서 추가하시기 바랍니다!

- `pnpm install contentlayer next-contentlayer date-fns` 로 deps 추가
- next.config.js에서 설정 추가
- tsconfig.json 설정 변경
- .gitignore에 .conentlayer를 Git에서 제외
- contentlayer.config.ts 파일 추가
- app/page.tsx 참고해서 allPost나 Post 사용법 확인


Next.js를 pnpm 명령을 통해 설치했고 설치 과정 중에 옵션으로 Typescript, ESLint, Tailwind CSS를 사용하겠다고 설정했습니다.\
VS Code에서 개발을 할 때, 저장 시 Prettier가 적용되면 코드 라인을 통일할 수 있어서 Prettier를 추가했습니다.\
그래서 VS Code를 사용하실 때는 아래에 나온 Extension을 설치하시길 바랍니다. 이 extensions을 설치하면 개발을 할 때 많은 도움을 줍니다.

- Tailwind CSS IntelliSense
- Prettier - Code formatter
- PostCSS Language Support
- ESLint

클러스터 맥으로 개발하는 경우에는 몇가지 extensions이 더 필요합니다.
- Dev Containers
- Docker
- YAML

### settings.json

VS Code에서 커맨드 팔레트(command + shift + p)를 통해 `Preferences: Open User Settings (JSON)`를 입력하면 파일이 하나 열립니다.\
저장할때마다 Prettier가 동작할 수 있도록 formatter 지정과 저장 시 foramt을 한다는 옵션을 설정하기 위해 아래 내용을 복사합니다.

```json
{
    // ...[기존 설정들에서 추가],
    "typescript.preferences.importModuleSpecifier": "non-relative",
    "editor.codeActionsOnSave": {
        "source.organizeImports": true
    },
    "[typescriptreact]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascriptreact]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
    },
    "[typescript]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```
