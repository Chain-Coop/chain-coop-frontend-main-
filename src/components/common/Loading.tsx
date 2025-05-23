import { motion } from "framer-motion";
import React from "react";

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

export const SkeletonTransactionCard = () => {
  return (
    <div className="flex animate-pulse flex-col gap-[10px] rounded-lg border border-gray-300 px-3 py-[1em] shadow-md md:px-[1.5em]">
      <div className="flex flex-col gap-1 md:flex-row md:justify-between md:gap-0">
        <div className="flex items-center justify-between md:justify-start md:gap-4">
          <div className="h-4 w-20 rounded bg-gray-200"></div>
          <div className="h-4 w-16 rounded bg-gray-200"></div>
        </div>
        <div className="flex items-center justify-between md:justify-start md:gap-4">
          <div className="h-4 w-24 rounded bg-gray-200"></div>
          <div className="h-4 w-20 rounded bg-gray-200"></div>
        </div>
      </div>
      <hr className="mt-2 h-[1px] rounded-md bg-gray-200" />
      <div className="flex items-center justify-between">
        <div className="h-4 w-32 rounded bg-gray-200"></div>
        <div className="h-4 w-24 rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

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

export const ContributionListSkeleton: React.FC = () => (
  <div className="mt-[1em] flex h-auto w-full flex-col items-center justify-center gap-[1em] rounded-lg bg-text2 px-2 py-[3em] text-center">
    {Array.from({ length: 3 }).map((_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="flex w-[90%] animate-pulse flex-col gap-2 rounded-full bg-white px-[1.5em] py-2"
      >
        <div className="flex justify-between">
          <div className="h-4 w-1/4 rounded bg-gray-200"></div>
          <div className="h-4 w-1/4 rounded bg-gray-200"></div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            <div className="h-6 w-24 rounded bg-gray-200"></div>
          </div>
          <div className="h-6 w-32 rounded bg-gray-200"></div>
        </div>
      </motion.div>
    ))}
  </div>
);

export const ProjectsSkeleton = React.memo(() => (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
    <div className="animate-pulse">
      <div className="h-48 rounded-xl bg-gray-200"></div>
    </div>
    <div className="animate-pulse">
      <div className="h-48 rounded-xl bg-gray-200"></div>
    </div>
  </div>
));

export const NotificationSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="flex flex-col gap-[1em] rounded-lg bg-gray-100 px-[1em] py-[1em]">
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-gray-300"></div>
        <div className="h-4 w-3/4 rounded bg-gray-300"></div>
      </div>
      <div className="flex justify-between">
        <div className="h-3 w-16 rounded bg-gray-300"></div>
        <div className="h-3 w-24 rounded bg-gray-300"></div>
      </div>
    </div>
  </div>
);

export const TokenListItemSkeleton: React.FC = () => (
  <div className="flex animate-pulse flex-col gap-2 rounded-lg border-2 border-gray-300 p-4 lg:py-8">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-200"></div>
        <div className="flex flex-col gap-1">
          <div className="h-4 w-16 rounded bg-gray-200"></div>
          <div className="h-5 w-24 rounded bg-gray-200"></div>
        </div>
      </div>
      <div className="h-6 w-20 rounded bg-gray-200"></div>
    </div>
  </div>
);

export const TokenListSkeleton: React.FC<{ count?: number }> = ({
  count = 5,
}) => (
  <div className="mt-[1em] flex flex-col gap-[1em]">
    {Array.from({ length: count }).map((_, index) => (
      <TokenListItemSkeleton key={index} />
    ))}
  </div>
);

export const SingleTransactionItemSkeleton: React.FC = () => (
  <div className="flex animate-pulse flex-col gap-3 rounded-md border border-gray-200 p-4">
    <div className="mb-1 flex items-center justify-between">
      <div className="h-4 w-16 rounded bg-gray-200"></div>
      <div className="h-5 w-24 rounded bg-gray-200"></div>
    </div>
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <div className="h-3 w-10 rounded bg-gray-200"></div>
        <div className="h-4 w-36 rounded bg-gray-200"></div>
      </div>
      <div className="flex items-center gap-1">
        <div className="h-3 w-8 rounded bg-gray-200"></div>
        <div className="h-4 w-28 rounded bg-gray-200"></div>
      </div>
      <div className="flex flex-col justify-between gap-1 md:flex-row md:gap-0">
        <div className="flex items-center">
          <div className="mr-1 h-3 w-16 rounded bg-gray-200"></div>
          <div className="h-4 w-14 rounded bg-gray-200"></div>
        </div>
        <div className="flex items-center">
          <div className="mr-1 h-3 w-24 rounded bg-gray-200"></div>
          <div className="h-4 w-16 rounded bg-gray-200"></div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <div className="h-3 w-16 rounded bg-gray-200"></div>
        <div className="h-4 w-20 rounded bg-gray-200"></div>
      </div>
    </div>
  </div>
);

export const TransactionHistorySkeleton: React.FC<{
  dateGroups?: number;
  itemsPerGroup?: number;
}> = ({ dateGroups = 2, itemsPerGroup = 2 }) => (
  <div className="my-8 animate-pulse">
    <div className="mt-6 flex flex-col gap-6">
      {Array.from({ length: dateGroups }).map((_, groupIndex) => (
        <div key={groupIndex} className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <div className="h-4 w-32 rounded bg-gray-200"></div>
            <div className="h-4 w-24 rounded bg-gray-200"></div>
          </div>
          {Array.from({ length: itemsPerGroup }).map((_, itemIndex) => (
            <SingleTransactionItemSkeleton key={itemIndex} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const GroupCardSkeleton = () => (
  <div className="flex h-fit w-full flex-shrink-0 animate-pulse flex-col rounded-3xl border-[2px] border-gray-200 bg-white shadow-md sm:h-[234px] sm:flex-row lg:h-fit lg:flex-col xl:h-fit xl:flex-row xl:gap-1">
    <div className="relative h-[150px] w-[100%] flex-shrink-0 rounded-l-xl bg-gray-200 sm:h-full sm:w-[158px] lg:h-fit lg:w-[100%] xl:h-full xl:w-[158px]">
      <div className="absolute right-2 top-2 h-[30px] w-[30px] rounded-full bg-gray-300"></div>
    </div>

    <div className="flex w-[96%] flex-col justify-between gap-1 py-2 pl-4 pr-2 lg:py-4 xl:py-2">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-6 w-32 rounded bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-24 rounded bg-gray-300"></div>
            <div className="h-[10px] w-[10px] rounded-full bg-gray-300"></div>
            <div className="h-4 w-16 rounded bg-gray-300"></div>
          </div>
          <div className="h-4 w-40 rounded bg-gray-300"></div>
          <div className="h-4 w-32 rounded bg-gray-300"></div>
        </div>
        <div className="h-12 w-12 rounded-full bg-gray-300"></div>
      </div>

      <div className="mt-3 flex w-full justify-between pb-3 xl:mt-0">
        <div className="h-[35px] w-20 rounded-md bg-gray-300"></div>
        <div className="h-[35px] w-20 rounded-md bg-gray-300"></div>
      </div>
    </div>
  </div>
);

export const GroupCardSkeletonRow = ({ count = 3 }) => (
  <div className="scrollbar-hide flex w-[100%] gap-4 overflow-x-auto py-2">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="min-w-[280px] flex-shrink-0">
        <GroupCardSkeleton />
      </div>
    ))}
  </div>
);

export const GroupHistorySkeleton = () => (
  <div className="w-[100%] flex-shrink-0 animate-pulse rounded-xl bg-[#C5B0D833] px-2 pt-3">
    <div className="p-4">
      <div className="mb-2 h-6 w-36 rounded-md bg-gray-300"></div>
      <div className="mb-4 h-4 w-64 rounded-md bg-gray-300"></div>

      <div className="my-3 h-5 w-48 rounded-md bg-gray-300"></div>

      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-3 rounded-lg bg-white p-3 sm:flex-row"
          >
            <div className="h-16 w-16 rounded-md bg-gray-200"></div>

            <div className="flex w-full flex-1 items-center justify-between">
              <div className="space-y-2">
                <div className="h-5 w-32 rounded bg-gray-200"></div>
                <div className="h-4 w-24 rounded bg-gray-200"></div>
                <div className="h-4 w-40 rounded bg-gray-200"></div>
              </div>

              <div className="flex space-x-2">
                <div className="h-10 w-24 rounded-md bg-gray-200"></div>
                <div className="h-10 w-24 rounded-md bg-gray-200"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
