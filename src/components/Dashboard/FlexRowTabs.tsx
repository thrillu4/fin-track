import Image from 'next/image'

interface Data {
  src: string
  title: string
  amount?: number
  color: string
  percent?: number
}

const FlexRowTabs = async ({ data }: { data: Data[] }) => {
  return (
    <div className="bg-sidebar flex flex-wrap justify-between gap-5 gap-y-5 rounded-3xl px-2 py-5 pl-5 tracking-wide sm:flex-row sm:items-center sm:px-9 md:py-6 lg:col-span-6">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-4">
          <div
            style={{ backgroundColor: item.color }}
            className={`flex items-center justify-center rounded-full p-1 sm:p-5`}
          >
            <Image src={item.src} alt={item.title} width={30} height={30} />
          </div>
          <div>
            <div className="text-xs text-gray-500 sm:text-base">
              {item.title}
            </div>
            <div className="font-bold sm:text-2xl">
              {item.percent
                ? `${item.percent.toFixed(2)}%`
                : `$${item.amount ? item.amount.toFixed(2) : '0.00'}`}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FlexRowTabs
