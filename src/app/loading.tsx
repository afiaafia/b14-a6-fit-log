export default function Loading() {
  return (
    <main className="min-h-screen bg-[#08090B] px-4 pb-16 pt-10 text-white sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 animate-pulse">
          <div className="h-3 w-28 rounded bg-[#1F242D]" />

          <div className="mt-3 h-8 w-52 rounded bg-[#1F242D]" />

          <div className="mt-3 h-4 w-72 max-w-full rounded bg-[#1F242D]" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-[#1F242D] bg-[#121316]"
            >
              <div className="aspect-4/3 animate-pulse bg-[#1A1D21]" />

              <div className="space-y-3 p-4">
                <div className="h-3 w-20 animate-pulse rounded bg-[#1F242D]" />

                <div className="h-5 w-3/4 animate-pulse rounded bg-[#1F242D]" />

                <div className="h-3 w-1/2 animate-pulse rounded bg-[#1F242D]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
