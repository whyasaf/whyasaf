function Bone({ className = "", width }: { className?: string; width?: number }) {
  return <div className={`skeleton rounded-md ${className}`} style={{ width }} aria-hidden="true" />;
}

export function AboutSkeleton() {
  return (
    <div className="max-w-4xl mx-auto pt-[21px] pb-6 space-y-8">
      <div className="max-w-3xl mx-auto space-y-3">
        <Bone className="h-5 w-full" />
        <Bone className="h-5 w-4/5 mx-auto" />
      </div>
      {[0, 1].map((i) => (
        <div
          key={i}
          className="border border-zinc-200 dark:border-zinc-900 rounded-3xl p-4 md:p-6 space-y-6"
        >
          <Bone className="aspect-[16/9] w-full rounded-2xl" />
          <div className="space-y-3 px-1">
            <div className="flex items-end justify-between gap-4">
              <Bone className="h-8 w-1/2" />
              <Bone className="h-4 w-20" />
            </div>
            <Bone className="h-3 w-2/3" />
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProjectsSkeleton() {
  return (
    <div className="max-w-5xl mx-auto pt-[21px] pb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-zinc-100 dark:bg-[#131315] border border-zinc-200 dark:border-zinc-900/80 rounded-[20px] md:rounded-[28px] p-1.5"
          >
            <Bone className="aspect-[4/3] w-full rounded-2xl" />
            <div className="px-3 pb-3 pt-4 space-y-2">
              <Bone className="h-4 w-1/2" />
              <Bone className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BlogSkeleton() {
  return (
    <div className="max-w-5xl mx-auto pt-[21px] pb-6">
      <div className="max-w-4xl mx-auto space-y-[34px]">
        <div className="flex flex-wrap gap-[8px]">
          {[56, 72, 88, 80, 72].map((width) => (
            <Bone key={width} className="h-[30px] rounded-full" width={width} />
          ))}
        </div>
        <div className="grid md:grid-cols-8 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl overflow-hidden">
          <Bone className="md:col-span-3 aspect-[1.618/1] md:aspect-auto md:min-h-[280px] rounded-none" />
          <div className="md:col-span-5 p-[21px] md:p-[34px] space-y-[13px]">
            <Bone className="h-5 w-20" />
            <Bone className="h-8 w-5/6" />
            <Bone className="h-8 w-1/2" />
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-4/5" />
          </div>
        </div>
        <div className="divide-y divide-zinc-100 dark:divide-zinc-900 border-y border-zinc-100 dark:border-zinc-900">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-[13px] md:gap-[21px] py-[21px]">
              <Bone className="w-[55px] h-[55px] md:w-[89px] md:h-[89px] rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <Bone className="h-3 w-16" />
                <Bone className="h-5 w-3/4" />
                <Bone className="h-3 w-40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PostSkeleton() {
  return (
    <div className="py-6">
      <div className="blog-article max-w-[618px] mx-auto space-y-[34px]">
        <div className="flex items-center justify-between">
          <Bone className="h-4 w-28" />
          <Bone className="h-8 w-20 rounded-lg" />
        </div>
        <div className="space-y-[21px] border-b border-zinc-200 dark:border-zinc-900 pb-[34px]">
          <Bone className="h-4 w-52" />
          <Bone className="h-9 w-11/12" />
          <Bone className="h-9 w-2/3" />
          <Bone className="h-4 w-full" />
          <Bone className="h-4 w-full" />
          <Bone className="h-4 w-3/4" />
        </div>
        <Bone className="aspect-[1.618/1] w-full rounded-2xl" />
      </div>
    </div>
  );
}
