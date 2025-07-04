export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className='w-full h-[calc(100dvh-80px)]'>
      <div className='max-w-screen-xl w-full h-full px-4 mx-auto'>
        {children}
      </div>
    </main>
  );
}
