export const environment = {
  dev: {
    hostUrl: import.meta.env.VITE_HOST_URL ?? "http://localhost:3000",
    serviceRole: import.meta.env.VITE_SERVICE_ROLE ?? "service",
    jwtSecret: import.meta.env.VITE_JWT_SECRET ?? "jwtSecret",
    anonKey: import.meta.env.VITE_ANON_KEY ?? "anonKey",
  },
};
