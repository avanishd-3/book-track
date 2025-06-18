"use client";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted">
      <h1 className="text-4xl font-bold mb-4">About Me</h1>
      <p className="text-lg text-center max-w-xl mb-50">
        Welcome to my application! I designed this app to learn how to use Drizzle and Better Auth.
      </p>
    </div>
  );
}