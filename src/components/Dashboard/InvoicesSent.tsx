import Image from 'next/image'

const InvoicesSent = () => {
  const invoices = [
    {
      src: '/dash/invoices/apple.png',
      title: 'Apple Store',
      amount: 455,
      color: '#aee9c9',
      time: '5h ago',
    },
    {
      src: '/dash/invoices/user2.png',
      title: 'Michael',
      amount: 150,
      color: '#f8f2d2',
      time: '2 days ago',
    },
    {
      src: '/dash/invoices/ps.png',
      title: 'Playstation',
      amount: 1087,
      color: '#a8baee',
      time: '5 days ago',
    },
    {
      src: '/dash/invoices/user3.png',
      title: 'William',
      amount: 90,
      color: '#e5a8f1',
      time: '10 days ago',
    },
  ]
  return (
    <div className="bg-sidebar flex flex-col gap-6 rounded-3xl px-6 py-8">
      {invoices.map((inv, i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              style={{
                backgroundColor: inv.color,
              }}
              className={`flex items-center justify-center rounded-full p-3.5`}
            >
              <Image src={inv.src} alt={inv.title} width={25} height={25} />
            </div>
            <div>
              <div>{inv.title}</div>
              <div className="opacity-60">{inv.time}</div>
            </div>
          </div>
          <div>${inv.amount}</div>
        </div>
      ))}
    </div>
  )
}

export default InvoicesSent
