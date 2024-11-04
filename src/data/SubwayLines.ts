export type subwayLine = {
  line: string
  bgColor: string
  textColor: string
}

export const SUBWAY_LINES = [
  [
    { line: '1', bgColor: 'bg-red-700', textColor: 'text-white' },
    { line: '2', bgColor: 'bg-red-700', textColor: 'text-white' },
    { line: '3', bgColor: 'bg-red-700', textColor: 'text-white' },
  ],
  [
    { line: '4', bgColor: 'bg-green-700', textColor: 'text-white' },
    { line: '5', bgColor: 'bg-green-700', textColor: 'text-white' },
    { line: '6', bgColor: 'bg-green-700', textColor: 'text-white' },
  ],
  [{ line: '7', bgColor: 'bg-purple-700', textColor: 'text-white' }],
  [
    { line: 'A', bgColor: 'bg-blue-700', textColor: 'text-white' },
    { line: 'C', bgColor: 'bg-blue-700', textColor: 'text-white' },
    { line: 'E', bgColor: 'bg-blue-700', textColor: 'text-white' },
  ],
  [
    { line: 'B', bgColor: 'bg-orange-700', textColor: 'text-white' },
    { line: 'D', bgColor: 'bg-orange-700', textColor: 'text-white' },
    { line: 'F', bgColor: 'bg-orange-700', textColor: 'text-white' },
    { line: 'M', bgColor: 'bg-orange-700', textColor: 'text-white' },
  ],
  [{ line: 'G', bgColor: 'bg-green-600', textColor: 'text-white' }],
  [
    { line: 'N', bgColor: 'bg-yellow-500', textColor: 'text-black' },
    { line: 'Q', bgColor: 'bg-yellow-500', textColor: 'text-black' },
    { line: 'R', bgColor: 'bg-yellow-500', textColor: 'text-black' },
  ],
  [
    { line: 'J', bgColor: 'bg-amber-800', textColor: 'text-white' },
    { line: 'Z', bgColor: 'bg-amber-800', textColor: 'text-white' },
  ],
  [{ line: 'L', bgColor: 'bg-gray-500', textColor: 'text-white' }],
  [{ line: 'S', bgColor: 'bg-gray-700', textColor: 'text-white' }],
]
