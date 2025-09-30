export default function HowItWorks() {
  const steps = [
    {
      title: 'Create an Account',
      desc: 'Sign up in just a few clicks to start using your personal dashboard.',
      icon: '📝',
    },
    {
      title: 'Sign In or Try Demo',
      desc: 'Log in with your existing account or enter as a demo user to test all features.',
      icon: '🔑',
    },
    {
      title: 'Explore Dashboard',
      desc: 'Access smart analytics, charts, and tools to manage your finances effectively.',
      icon: '📊',
    },
    {
      title: 'Manage Your Finances',
      desc: 'Track your expenses, monitor statistics, and plan ahead with ease.',
      icon: '💰',
    },
  ]

  return (
    <section className="min-h-[80vh] bg-white py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="mb-4 text-4xl font-bold">How It Works</h2>
        <p className="mb-12 text-lg text-gray-600 dark:text-gray-300">
          Just a few simple steps to start exploring your personal finance
          dashboard.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative flex flex-col items-center rounded-2xl bg-gray-50 p-6 text-center shadow dark:bg-gray-800"
            >
              <div className="mb-4 text-5xl">{step.icon}</div>
              <span className="absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <button className="rounded-xl bg-blue-600 px-6 py-3 text-white shadow transition hover:bg-blue-700">
            Get Started
          </button>
          <button className="rounded-xl bg-gray-200 px-6 py-3 text-gray-800 shadow transition hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            Try Demo
          </button>
        </div>
      </div>
    </section>
  )
}
