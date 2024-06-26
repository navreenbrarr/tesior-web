import { processUserPaymentQueue, processAdminEscrowQueue } from "./process";
import Queue from "bull";

export const userPayoutQueue = new Queue("user-payout-queue", {
  redis: {
    port: 6379,
    host: "relative-poodle-38122.upstash.io",
    password: "AZTqAAIncDE2Njc2NTFmYTQxYTI0ZjQwOWFhYTM0MGIyYzQyNDNlY3AxMzgxMjI",
    tls: { rejectUnauthorized: false } // If your service uses self-signed certificates
  },
});
export const adminEscrowQueue = new Queue("admin-escrow-queue", {
  redis: {
    port: 6379,
    host: "relative-poodle-38122.upstash.io",
    password: "AZTqAAIncDE2Njc2NTFmYTQxYTI0ZjQwOWFhYTM0MGIyYzQyNDNlY3AxMzgxMjI",
    tls: { rejectUnauthorized: false } // If your service uses self-signed certificates
  },
});

// Register job processors
userPayoutQueue.process(processUserPaymentQueue);
adminEscrowQueue.process(processAdminEscrowQueue);
