export const DetailsSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="flex justify-center">
      <div className="h-6 w-48 rounded-full bg-gray-200"></div>
    </div>
    <div className="mt-6 rounded-3xl py-8 shadow-md">
      <div className="flex justify-center gap-4">
        <div className="h-5 w-40 rounded bg-gray-200"></div>
        <div className="h-5 w-8 rounded bg-gray-200"></div>
      </div>
      <div className="mx-auto mt-6 w-60 rounded-md">
        <div className="h-8 rounded bg-gray-200"></div>
        <hr className="mt-4 h-1 rounded-md bg-gray-200" />
      </div>
    </div>
  </div>
);

export const StatsSkeleton: React.FC = () => (
  <div className="mt-6 flex animate-pulse justify-between rounded-2xl bg-text2 py-4">
    <div className="m-auto w-[35%] rounded-full border-2 border-gray-500 bg-white py-2">
      <div className="mx-auto h-5 w-24 rounded bg-gray-200"></div>
      <div className="mx-auto mt-2 h-4 w-20 rounded bg-gray-200"></div>
    </div>
    <div className="m-auto w-[35%] rounded-full border-2 border-gray-500 bg-white py-2">
      <div className="mx-auto h-5 w-24 rounded bg-gray-200"></div>
      <div className="mx-auto mt-2 h-4 w-20 rounded bg-gray-200"></div>
    </div>
  </div>
);

export const TrackerSkeleton: React.FC = () => (
  <div className="mt-8 animate-pulse">
    <div className="mb-4">
      <div className="h-6 w-48 rounded bg-gray-200"></div>
      <div className="mt-2 h-4 w-72 rounded bg-gray-200"></div>
    </div>
    <div className="space-y-8">
      {[1, 2, 3].map((index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="h-6 w-6 rounded-full bg-gray-200"></div>
          <div className="flex-1">
            <div className="h-5 w-36 rounded bg-gray-200"></div>
            <div className="mt-2 h-4 w-48 rounded bg-gray-200"></div>
            <div className="mt-2 h-4 w-32 rounded bg-gray-200"></div>
          </div>
          <div className="h-8 w-24 rounded-full bg-gray-200"></div>
        </div>
      ))}
    </div>
  </div>
);
