export type subwayLine = {
  line: string
  bgColor: string
  textColor: string
}

export const SUBWAY_LINES_JSON: { [key: string]: subwayLine } = {
  '1': { line: '1', bgColor: 'bg-red-600', textColor: 'text-white' },
  '2': { line: '2', bgColor: 'bg-red-600', textColor: 'text-white' },
  '3': { line: '3', bgColor: 'bg-red-600', textColor: 'text-white' },
  '4': { line: '4', bgColor: 'bg-green-700', textColor: 'text-white' },
  '5': { line: '5', bgColor: 'bg-green-700', textColor: 'text-white' },
  '6': { line: '6', bgColor: 'bg-green-700', textColor: 'text-white' },
  '7': { line: '7', bgColor: 'bg-purple-700', textColor: 'text-white' },
  A: { line: 'A', bgColor: 'bg-blue-600', textColor: 'text-white' },
  C: { line: 'C', bgColor: 'bg-blue-600', textColor: 'text-white' },
  E: { line: 'E', bgColor: 'bg-blue-600', textColor: 'text-white' },
  B: { line: 'B', bgColor: 'bg-orange-600', textColor: 'text-white' },
  D: { line: 'D', bgColor: 'bg-orange-600', textColor: 'text-white' },
  F: { line: 'F', bgColor: 'bg-orange-600', textColor: 'text-white' },
  M: { line: 'M', bgColor: 'bg-orange-600', textColor: 'text-white' },
  G: { line: 'G', bgColor: 'bg-green-500', textColor: 'text-white' },
  N: { line: 'N', bgColor: 'bg-yellow-400', textColor: 'text-black' },
  Q: { line: 'Q', bgColor: 'bg-yellow-400', textColor: 'text-black' },
  R: { line: 'R', bgColor: 'bg-yellow-400', textColor: 'text-black' },
  W: { line: 'W', bgColor: 'bg-yellow-400', textColor: 'text-black' },
  J: { line: 'J', bgColor: 'bg-amber-800', textColor: 'text-white' },
  Z: { line: 'Z', bgColor: 'bg-amber-800', textColor: 'text-white' },
  L: { line: 'L', bgColor: 'bg-gray-400', textColor: 'text-white' },
  S: { line: 'S', bgColor: 'bg-gray-600', textColor: 'text-white' },
}

export const SUBWAY_LINES = [
  [SUBWAY_LINES_JSON['1'], SUBWAY_LINES_JSON['2'], SUBWAY_LINES_JSON['3']],
  [SUBWAY_LINES_JSON['4'], SUBWAY_LINES_JSON['5'], SUBWAY_LINES_JSON['6']],
  [SUBWAY_LINES_JSON['7']],
  [SUBWAY_LINES_JSON['A'], SUBWAY_LINES_JSON['C'], SUBWAY_LINES_JSON['E']],
  [
    SUBWAY_LINES_JSON['B'],
    SUBWAY_LINES_JSON['D'],
    SUBWAY_LINES_JSON['F'],
    SUBWAY_LINES_JSON['M'],
  ],
  [SUBWAY_LINES_JSON['G']],
  [
    SUBWAY_LINES_JSON['N'],
    SUBWAY_LINES_JSON['Q'],
    SUBWAY_LINES_JSON['R'],
    SUBWAY_LINES_JSON['W'],
  ],
  [SUBWAY_LINES_JSON['J'], SUBWAY_LINES_JSON['Z']],
  [SUBWAY_LINES_JSON['L']],
  [SUBWAY_LINES_JSON['S']],
]
