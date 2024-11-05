import { subwayLine } from '@/data/SubwayLines'
import { Dispatch, SetStateAction } from 'react'

export default function SubwayLineButton({
  subwayLine,
  setSelectedSubwayLine,
}: {
  subwayLine: subwayLine
  setSelectedSubwayLine: Dispatch<SetStateAction<subwayLine | null>>
}) {
  return (
    <button
      className={`rounded-full ${subwayLine.bgColor} w-6 h-6 grid place-items-center`}
      onClick={() => {
        setSelectedSubwayLine(subwayLine)
      }}
    >
      <div
        className={`leading-4 h-4 ${subwayLine.textColor} font-sans font-semibold text-center`}
      >
        {subwayLine.line}
      </div>
    </button>
  )
}

export function SubwayLineLogo({ subwayLine }: { subwayLine: subwayLine }) {
  return (
    <div
      className={`rounded-full ${subwayLine.bgColor} w-6 h-6 grid place-items-center`}
    >
      <div className={` ${subwayLine.textColor} font-sans font-semibold`}>
        {subwayLine.line}
      </div>
    </div>
  )
}
