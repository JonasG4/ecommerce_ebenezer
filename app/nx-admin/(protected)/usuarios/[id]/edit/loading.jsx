export default function Loading() {
  return (
    <section className="animate-pulse grid grid-cols-2 gap-x-4 gap-y-6 w-full md:col-span-2 mb-4">
      {Array(6)
        .fill()
        .map((_, i) => (
          <article key={i} className="flex flex-col gap-2">
            <div className="relative w-[200px] h-[15px] bg-gray-200 rounded-sm skeleton"></div>
            <div className="relative w-[400px] h-[10px] bg-gray-200 rounded-sm skeleton"></div>
            <div className="relative w-full h-[30px] bg-gray-200 rounded-md skeleton"></div>
          </article>
        ))}
      
      <article className="flex gap-2">
        <div className="relative w-[200px] h-[30px] bg-gray-200 rounded-md skeleton"></div>
        <div className="relative w-[200px] h-[30px] bg-gray-200 rounded-md skeleton"></div>
      </article>
    </section>
  );
}
