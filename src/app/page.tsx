import Header from '@/components/Header/header';

export default function Page() {
  return (
    <div className="flex flex-col border-2-white min-w-[1200px]  gap-2 font-[family-name:var(--font-geist-sans)] ">
      <header>
       <Header/>
      </header>
      <main className="bg-red-500">
       main
      </main>
      <footer className="bg-red-500">
       footer
      </footer>
    </div>
  );
}
