export const register = async () => {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // we do get a warning - Import trace for requested module:
    try {

      console.log("Workers ready!");
    } catch (error) {
      console.error("Failed to initialize admin workers:", error);
    }
  }
};
