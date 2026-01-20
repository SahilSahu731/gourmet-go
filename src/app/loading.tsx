export default function Loading() {
  return (
    <div className="flex h-[70vh] items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
        <p className="animate-pulse text-lg font-medium text-orange-500">
          Loading deliciousness...
        </p>
      </div>
    </div>
  );
}
