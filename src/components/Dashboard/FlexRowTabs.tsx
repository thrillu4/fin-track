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
    <div className="bg-sidebar col-span-6 flex items-center justify-between rounded-3xl px-9 py-6 tracking-wide">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-4">
          <div
            style={{ backgroundColor: item.color }}
            className={`flex items-center justify-center rounded-full p-5`}
          >
            <Image src={item.src} alt={item.title} width={30} height={30} />
          </div>
          <div>
            <div className="text-gray-500">{item.title}</div>
            <div className="text-2xl font-bold">
              {item.percent
                ? `${item.percent.toFixed(2)}%`
                : `$${item.amount!.toFixed(2)}`}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FlexRowTabs
