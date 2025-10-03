import Image from 'next/image'

const RecentTransaction = () => {
  const list = [
    {
      id: 1,
      title: 'Netflix',
      date: new Date('2025-10-01'),
      amount: -15.99,
      category: 'entertainment',
    },
    {
      id: 2,
      title: 'Starbucks',
      date: new Date('2025-10-02'),
      amount: -4.75,
      category: 'groceries',
    },
    {
      id: 3,
      title: 'Salary',
      date: new Date('2025-10-03'),
      amount: 2500.0,
      category: 'income',
    },
  ]
  return (
    <div className="bg-background flex flex-col gap-2.5 rounded-3xl p-6">
      {list.map(item => (
        <div key={item.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`${item.category === 'entertainment' ? 'bg-[var(--chart-3)]' : item.category === 'shopping' ? 'bg-[var(--chart-4)]' : item.category === 'groceries' ? 'bg-[var(--chart-2)]' : item.category === 'education' ? 'bg-[var(--chart-1)]' : 'bg-[var(--chart-5)]'} flex items-center justify-center rounded-full p-3.5`}
            >
              <Image
                src={`/dash/transactions/${item.category}.png`}
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

export default RecentTransaction
