import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
const TrendingStock = () => {
  const stock = [
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 194.0,
      change: '+2.74%',
    },
    {
      symbol: 'DAL',
      name: 'Delta Air Lines, Inc.',
      price: 60.23,
      change: '+5.44%',
    },
    {
      symbol: 'TLRY',
      name: 'Tilray Brands, Inc.',
      price: 2.2,
      change: '+25.65%',
    },
    {
      symbol: 'AMD',
      name: 'Advanced Micro Devices',
      price: 234.61,
      change: '-0.06%',
    },
    {
      symbol: 'PEP',
      name: 'PepsiCo, Inc.',
      price: 142.15,
      change: '+2.23%',
    },
  ]

  return (
    <Table>
      <TableCaption>
        A list of Finance&apos;s list of trending stocks
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Symbol</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Return</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stock.map(item => (
          <TableRow key={item.symbol} className="text-base">
            <TableCell className="font-medium">{item.symbol}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>${item.price}</TableCell>
            <TableCell
              className={`${item.change.charAt(0) === '-' ? 'text-red-500' : 'text-green-500'} text-right`}
            >
              {item.change}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TrendingStock
