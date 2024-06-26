import { QueueOptions } from "bull";
import { Redis } from "ioredis";
import { REDIS_CONNECTION_URL } from "./config";
import { processUserPaymentQueue, processAdminEscrowQueue } from "./process";
import Queue from "bull";

const queueOptions: QueueOptions = {
  redis: REDIS_CONNECTION_URL,
  defaultJobOptions: {
    attempts: 2,
    backoff: {
      type: "exponential",
      delay: 50000,
    },
  },
};

export const userPayoutQueue = new Queue("user-payout-queue", queueOptions);
export const adminEscrowQueue = new Queue("admin-escrow-queue", queueOptions);

// Register job processors
userPayoutQueue.process(processUserPaymentQueue);
adminEscrowQueue.process(processAdminEscrowQueue);

// Optional: Listening to job events for logging
userPayoutQueue.on("waiting", (jobId: any) => {
  console.log("Waiting user payout", jobId);
});
userPayoutQueue.on("completed", (job: { id: any; }) => {
  console.log("Completed user payout", job.id);
});
userPayoutQueue.on("failed", (job: { id: any; }, error: any) => {
  console.error("Error in user payout", job.id, error);
});

adminEscrowQueue.on("waiting", (jobId: any) => {
  console.log("Waiting admin escrow", jobId);
});
adminEscrowQueue.on("completed", (job: { id: any; }) => {
  console.log("Completed admin escrow", job.id);
});
adminEscrowQueue.on("failed", (job: { id: any; }, error: any) => {
  console.error("Error in admin escrow", job.id, error);
});