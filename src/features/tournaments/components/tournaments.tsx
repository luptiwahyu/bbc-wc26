import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'
import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'

interface Tournament {
  id: string
  name: string
  winner: string[]
  url: string
}

const tournaments: Tournament[] = [
  {
    id: '1',
    name: 'FIFA World Cup 2026',
    winner: ['Wahyu'],
    url: '/match',
  },
]

const TournamentList = () => {
  return (
    <div className="overflow-hidden rounded-sm border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Turnamen</TableHead>
            <TableHead>Juara</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tournaments.map((tour, tourIdx) => (
            <TableRow
              key={tour.id}
              className={tourIdx % 2 === 1 ? 'bg-muted/50' : ''}
            >
              <TableCell>
                <Link
                  href={tour.url}
                  className="hover:underline flex items-center space-x-2"
                >
                  <span>{tour.name}</span>
                  <ExternalLinkIcon size={12} />
                </Link>
              </TableCell>
              <TableCell>{tour.winner.join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TournamentList
