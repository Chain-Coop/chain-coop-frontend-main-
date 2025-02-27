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
  <div className="mt-[1em] flex h-auto w-full flex-col gap-[1em] rounded-lg bg-text2 px-2 py-[3em] text-center">
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
