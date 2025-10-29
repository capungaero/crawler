# YouTube Stats Next.js

This project is a Next.js 15 application built with TypeScript that provides YouTube channel statistics. It allows users to input various YouTube channel link formats and displays key statistics such as subscriber count, total views, total video count, and video recaps based on different time frames.

## Features

- **Channel Input**: Users can input different formats of YouTube channel links.
- **Statistics Display**: Shows subscriber count, total views, and total video count.
- **Video Recap**: Provides a recap of videos based on selected time frames.
- **Responsive Design**: Built with Tailwind CSS for a modern and responsive interface.
- **Smooth Transitions**: Enhanced user experience with smooth transitions.
- **Error Handling**: Robust error handling for user inputs and API responses.

## Technologies Used

- **Next.js 15**: Framework for building the application.
- **TypeScript**: For type safety and better development experience.
- **Tailwind CSS**: For styling and responsive design.
- **shadcn/ui**: UI components for a modern look.
- **ZAI SDK**: For fetching YouTube channel statistics.
- **Prisma**: For database interactions with SQLite.
- **Lucide React**: For icons.

## Project Structure

```
youtube-stats-nextjs
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── youtube
│   │   │   ├── page.tsx
│   │   │   └── [channel]
│   │   │       └── page.tsx
│   │   └── api
│   │       └── zai
│   │           └── youtube
│   │               └── route.ts
│   ├── components
│   │   ├── ui
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Spinner.tsx
│   │   │   └── Toast.tsx
│   │   └── youtube
│   │       ├── ChannelForm.tsx
│   │       ├── ChannelStats.tsx
│   │       ├── VideoRecap.tsx
│   │       └── TimeframeSelector.tsx
│   ├── lib
│   │   ├── zai.ts
│   │   ├── youtube.ts
│   │   ├── prisma.ts
│   │   └── cache.ts
│   └── styles
│       └── tailwind.css
├── prisma
│   ├── schema.prisma
│   └── seed.ts
├── public
│   └── favicon.svg
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   cd youtube-stats-nextjs
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the environment variables:
   - Copy `.env.example` to `.env` and fill in the required values.

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## License

This project is licensed under the MIT License. See the LICENSE file for details.