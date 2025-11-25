'use client'

import { useEffect, useRef } from 'react'
import ApexCharts from 'apexcharts'
import { ChevronRight } from 'lucide-react'

const CreatorVisitorChart = () => {
  const chartRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const data = [12, 50, 120, 100, 100, 20]
    const categories = [
      'Apr 21',
      'May 21',
      'Jun 21',
      'Jul 21',
      'Jun 21',
      'Apr 21'
    ]

    const chart = new ApexCharts(chartRef.current, {
      chart: {
        type: 'bar',
        height: 260,
        animations: { enabled: false },
        toolbar: { show: false },
        sparkline: { enabled: false }
      },
      series: [{ name: 'Visitors', data }],
      colors: ['#CFFAF2', '#327468'],
      plotOptions: {
        bar: {
          columnWidth: '40%',
          borderRadius: 10,
          distributed: true
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => (val >= 100 ? `${val}k` : ''),
        offsetY: -10,
        style: { colors: ['#737679'] }
      },
      xaxis: {
        categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: '#737679' } }
      },
      yaxis: {
        min: 0,
        max: 160,
        tickAmount: 4,
        labels: {
          formatter: (val: number) => `${Math.round(val)}k`,
          style: { colors: '#737679' }
        }
      },
      grid: {
        borderColor: '#EFEFEF',
        strokeDashArray: 3
      },
      legend: { show: false },
      tooltip: { enabled: false }
    })

    chart.render()

    return () => {
      chart.destroy()
    }
  }, [])

  return (
    <div className='rounded-[12px] min-w-[500px]  border border-[#EFEFEF] bg-white p-4 md:p-6 '>
      <div className='flex items-center justify-between'>
        <h3 className='text-[16px] md:text-[18px] font-semibold'>Visitor</h3>
        <button className='text-text-color-200 text-[12px] md:text-[14px] flex items-center gap-1'>
          More <ChevronRight className='h-3 w-3' />
        </button>
      </div>
      <div className='mt-4'>
        <div ref={chartRef} />
      </div>
    </div>
  )
}

export default CreatorVisitorChart
