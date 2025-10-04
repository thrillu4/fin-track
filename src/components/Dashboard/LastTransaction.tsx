import Image from 'next/image'

const LastTransaction = () => {
  const list = [
    {
      id: 1,
      title: 'Spotify Subscription',
      date: new Date('2025-10-01'),
      amount: -15.99,
      category: 'Shopping',
      card: '1234456712337891',
      src: '/dash/transactions/bell.png',
    },
    {
      id: 2,
      title: 'Mobile Service',
      date: new Date('2025-10-02'),
      amount: -340,
      category: 'Service',
      card: '1234456712337891',
      src: '/dash/transactions/service.png',
    },
    {
      id: 3,
      title: 'Emilly Wilson',
      date: new Date('2025-10-03'),
      amount: 789.0,
      category: 'income',
      card: '1234456712337891',
      src: '/dash/transactions/user.png',
    },
  ]
  return (
    <div className="bg-sidebar flex min-h-[280px] flex-col gap-6 rounded-3xl p-7">
      {list.map(item => (
        <div
          key={item.id}
          className="grid grid-cols-4 items-center justify-center text-center"
        >
          <div className="flex items-center gap-4 text-left">
            <div
              className={`${item.category === 'entertainment' ? 'bg-[var(--chart-3)]' : item.category === 'Shopping' ? 'bg-[var(--chart-4)]' : item.category === 'groceries' ? 'bg-[var(--chart-2)]' : item.category === 'education' ? 'bg-[var(--chart-1)]' : 'bg-[var(--chart-5)]'} flex items-center justify-center rounded-full p-3.5`}
            >
              <Image
                src={item.src}
                alt={item.category}
                width={25}
                height={25}
              />
            </div>
            <div>
              <div>{item.title}</div>
              <div className="opacity-60">{item.date.toLocaleDateString()}</div>
            </div>
          </div>
          <div>{item.category}</div>
          <div>{item.card.slice(-8)}</div>
          <div
            className={`${item.amount > 0 ? 'text-green-500' : 'text-red-500'} font-medium`}
          >
            {item.amount}$
          </div>
        </div>
      ))}
    </div>
  )
}

export default LastTransaction
