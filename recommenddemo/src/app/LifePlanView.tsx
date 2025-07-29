"use client";

import { useState } from "react";

type LifePlanData = {
  ageRange: string;
  mainLifeEvents: string;
  minimumRequired: string;
  emergencyRequired: string;
  expectedIncome: string;
  gap: string;
};

const lifePlanTableData: LifePlanData[] = [
  {
    ageRange: "20代",
    mainLifeEvents: "就職／独立／結婚準備",
    minimumRequired: "10-20",
    emergencyRequired: "50-100",
    expectedIncome: "350-500",
    gap: "70-80"
  },
  {
    ageRange: "30代",
    mainLifeEvents: "結婚・出産・住宅購入",
    minimumRequired: "20-40",
    emergencyRequired: "100-150",
    expectedIncome: "700-900",
    gap: "100-110"
  },
  {
    ageRange: "40代",
    mainLifeEvents: "教育費ピーク・ローン返済",
    minimumRequired: "30-50",
    emergencyRequired: "150-200",
    expectedIncome: "800-1,000",
    gap: "160-170"
  },
  {
    ageRange: "50代",
    mainLifeEvents: "親介護・自身の疾病リスク上昇",
    minimumRequired: "40-60",
    emergencyRequired: "200-250",
    expectedIncome: "800-900",
    gap: "190-200"
  },
  {
    ageRange: "60代",
    mainLifeEvents: "定年・退職",
    minimumRequired: "30-50",
    emergencyRequired: "150-200",
    expectedIncome: "250-400（年金等）",
    gap: "140-160"
  },
  {
    ageRange: "70代",
    mainLifeEvents: "老後医療／介護準備",
    minimumRequired: "30-50",
    emergencyRequired: "200-300",
    expectedIncome: "200-350",
    gap: "210-230"
  },
  {
    ageRange: "80代",
    mainLifeEvents: "介護中心・資産取り崩し",
    minimumRequired: "30-50",
    emergencyRequired: "200-300",
    expectedIncome: "200-300",
    gap: "210-230"
  },
  {
    ageRange: "90代",
    mainLifeEvents: "個別差大（要個別設計）",
    minimumRequired: "30-50",
    emergencyRequired: "200-300",
    expectedIncome: "200-300",
    gap: "210-230"
  }
];

interface LifePlanViewProps {
  formData: any;
  onBack: () => void;
  onNext?: () => void;
}

export default function LifePlanView({ formData, onBack, onNext }: LifePlanViewProps) {
  const [showMinimumAmount, setShowMinimumAmount] = useState(true);
  const [activeTableTab, setActiveTableTab] = useState<"lifeEvents" | "sixMonths" | "threeMonths">("lifeEvents");
  const [activeChartTab, setActiveChartTab] = useState<"incomeExpense" | "planA" | "planB">("incomeExpense");
  
  // サンプルケース①かどうかを判定
  const isSampleCase1 = formData.gender === "female" && formData.age === 28 && formData.birthDate === "1996-03-15";

  // サンプルケース①用のテーブルデータ
  const sampleCase1Tables = {
    lifeEvents: [
      { ageRange: "20代", event: "結婚", income: "30", expense: "25", singleCost: "100" },
      { ageRange: "30代", event: "出産・子育て・住宅購入", income: "35", expense: "34", singleCost: "220" },
      { ageRange: "40代", event: "子供の教育費", income: "38", expense: "32", singleCost: "50" },
      { ageRange: "50代", event: "子供の教育費", income: "40", expense: "30", singleCost: "50" },
      { ageRange: "60代", event: "定年・退職", income: "27", expense: "26", singleCost: "なし" },
      { ageRange: "70代", event: "医療・介護", income: "24", expense: "25", singleCost: "30" },
      { ageRange: "80代", event: "相続準備", income: "22", expense: "26", singleCost: "なし" }
    ],
    
    // Chart rendering data (for visual positioning)
    lifeEventsChart: [
      { ageRange: "20代", income: "69", expense: "64", singleCost: "129" },
      { ageRange: "30代", income: "73", expense: "72", singleCost: "230" },
      { ageRange: "40代", income: "74", expense: "71", singleCost: "86" },
      { ageRange: "50代", income: "75", expense: "70", singleCost: "86" },
      { ageRange: "60代", income: "67", expense: "66", singleCost: "なし" },
      { ageRange: "70代", income: "65", expense: "66", singleCost: "70" },
      { ageRange: "80代", income: "63", expense: "66", singleCost: "なし" }
    ],
    
    sixMonths: [
      { ageRange: "20代", totalRequired: "90", existingBenefit: "10", shortfall: "80" },
      { ageRange: "30代", totalRequired: "132", existingBenefit: "10", shortfall: "122" },
      { ageRange: "40代", totalRequired: "102", existingBenefit: "10", shortfall: "92" },
      { ageRange: "50代", totalRequired: "96", existingBenefit: "10", shortfall: "86" },
      { ageRange: "60代", totalRequired: "70", existingBenefit: "10", shortfall: "60" },
      { ageRange: "70代", totalRequired: "90", existingBenefit: "10", shortfall: "80" },
      { ageRange: "80代", totalRequired: "110", existingBenefit: "10", shortfall: "100" }
    ],
    
    // Chart rendering data for 6 months scenario
    sixMonthsChart: [
      { ageRange: "20代", shortfall: "80" },
      { ageRange: "30代", shortfall: "122" },
      { ageRange: "40代", shortfall: "92" },
      { ageRange: "50代", shortfall: "86" },
      { ageRange: "60代", shortfall: "60" },
      { ageRange: "70代", shortfall: "80" },
      { ageRange: "80代", shortfall: "100" }
    ],
    threeMonths: [
      { ageRange: "20代", totalRequired: "45", existingBenefit: "10", shortfall: "35" },
      { ageRange: "30代", totalRequired: "66", existingBenefit: "10", shortfall: "56" },
      { ageRange: "40代", totalRequired: "51", existingBenefit: "10", shortfall: "41" },
      { ageRange: "50代", totalRequired: "48", existingBenefit: "10", shortfall: "38" },
      { ageRange: "60代", totalRequired: "35", existingBenefit: "10", shortfall: "25" },
      { ageRange: "70代", totalRequired: "40", existingBenefit: "10", shortfall: "30" },
      { ageRange: "80代", totalRequired: "50", existingBenefit: "10", shortfall: "40" }
    ],
    
    // Chart rendering data for 3 months scenario
    threeMonthsChart: [
      { ageRange: "20代", shortfall: "35" },
      { ageRange: "30代", shortfall: "56" },
      { ageRange: "40代", shortfall: "41" },
      { ageRange: "50代", shortfall: "38" },
      { ageRange: "60代", shortfall: "25" },
      { ageRange: "70代", shortfall: "30" },
      { ageRange: "80代", shortfall: "40" }
    ],
    
    // Chart data for plan comparison (Plan A - comprehensive coverage)
    planAChart: [
      { ageRange: "20代", required: "115", existing: "35" },
      { ageRange: "30代", required: "175", existing: "53" },
      { ageRange: "40代", required: "135", existing: "43" },
      { ageRange: "50代", required: "125", existing: "39" },
      { ageRange: "60代", required: "105", existing: "45" },
      { ageRange: "70代", required: "140", existing: "60" },
      { ageRange: "80代", required: "165", existing: "65" }
    ],
    
    // Chart data for plan comparison (Plan B - basic coverage)
    planBChart: [
      { ageRange: "20代", required: "90", existing: "55" },
      { ageRange: "30代", required: "145", existing: "89" },
      { ageRange: "40代", required: "150", existing: "109" },
      { ageRange: "50代", required: "140", existing: "102" },
      { ageRange: "60代", required: "105", existing: "80" },
      { ageRange: "70代", required: "130", existing: "100" },
      { ageRange: "80代", required: "165", existing: "125" }
    ]
  };

  // Generate chart data based on age
  const generateChartData = () => {
    const currentAge = formData.age || 30;
    const data = [];
    
    // Generate data points from current age to 90
    for (let age = Math.floor(currentAge / 10) * 10; age <= 90; age += 10) {
      const ageGroup = `${age}代`;
      const lifePlanRow = lifePlanTableData.find(row => row.ageRange === ageGroup);
      
      if (lifePlanRow) {
        // Parse income range
        const incomeRange = lifePlanRow.expectedIncome.replace('（年金等）', '').split('-');
        const avgIncome = (parseInt(incomeRange[0]) + parseInt(incomeRange[1] || incomeRange[0])) / 2;
        
        // Parse required amount
        const requiredRange = showMinimumAmount 
          ? lifePlanRow.minimumRequired.split('-') 
          : lifePlanRow.emergencyRequired.split('-');
        const avgRequired = (parseInt(requiredRange[0]) + parseInt(requiredRange[1])) / 2;
        
        data.push({
          age,
          income: avgIncome,
          required: avgRequired,
          gap: avgIncome - avgRequired,
          salaryIncome: age < 60 ? avgIncome * 0.8 : 0,
          pensionIncome: age >= 60 ? avgIncome * 0.7 : 0,
          insuranceIncome: avgIncome * 0.2,
          otherIncome: avgIncome * 0.1
        });
      }
    }
    
    return data;
  };

  const chartData = generateChartData();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">ライフプラン分析</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Life Plan Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">年代別ライフプラン表</h2>
            {isSampleCase1 && (
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTableTab("lifeEvents")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTableTab === "lifeEvents" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  ライフイベント
                </button>
                <button
                  onClick={() => setActiveTableTab("sixMonths")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTableTab === "sixMonths" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  三大疾病6か月
                </button>
                <button
                  onClick={() => setActiveTableTab("threeMonths")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTableTab === "threeMonths" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  三大疾病3か月
                </button>
              </div>
            )}
          </div>
          <div className="overflow-x-auto">
            {isSampleCase1 && activeTableTab === "lifeEvents" ? (
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">項目＼年代</th>
                    {sampleCase1Tables.lifeEvents.map((data) => (
                      <th key={data.ageRange} className="px-4 py-3 text-center text-sm font-semibold text-gray-700 min-w-[100px]">
                        {data.ageRange}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">イベント</td>
                    {sampleCase1Tables.lifeEvents.map((data) => (
                      <td key={data.ageRange} className="px-4 py-3 text-center text-sm text-gray-600">
                        {data.event}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">想定手取り</td>
                    {sampleCase1Tables.lifeEvents.map((data) => (
                      <td key={data.ageRange} className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                        {data.income}万円
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">想定生活費</td>
                    {sampleCase1Tables.lifeEvents.map((data) => (
                      <td key={data.ageRange} className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                        {data.expense}万円
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">単発費用の目安</td>
                    {sampleCase1Tables.lifeEvents.map((data) => (
                      <td key={data.ageRange} className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                        {data.singleCost}{data.singleCost !== "なし" && "万円"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            ) : isSampleCase1 && activeTableTab === "sixMonths" ? (
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">指標＼年代</th>
                    {sampleCase1Tables.sixMonths.map((data) => (
                      <th key={data.ageRange} className="px-4 py-3 text-center text-sm font-semibold text-gray-700 min-w-[100px]">
                        {data.ageRange}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">総必要資金</td>
                    {sampleCase1Tables.sixMonths.map((data) => (
                      <td key={data.ageRange} className="px-4 py-3 text-center text-sm text-gray-600">
                        {data.totalRequired}万円
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">既契約給付（入院）</td>
                    {sampleCase1Tables.sixMonths.map((data) => (
                      <td key={data.ageRange} className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                        {data.existingBenefit}万円
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">加入前の不足</td>
                    {sampleCase1Tables.sixMonths.map((data) => (
                      <td key={data.ageRange} className="px-4 py-3 text-center text-sm font-semibold text-red-600">
                        -{data.shortfall}万円
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            ) : isSampleCase1 && activeTableTab === "threeMonths" ? (
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">指標＼年代</th>
                    {sampleCase1Tables.threeMonths.map((data) => (
                      <th key={data.ageRange} className="px-4 py-3 text-center text-sm font-semibold text-gray-700 min-w-[100px]">
                        {data.ageRange}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">総必要資金</td>
                    {sampleCase1Tables.threeMonths.map((data) => (
                      <td key={data.ageRange} className="px-4 py-3 text-center text-sm text-gray-600">
                        {data.totalRequired}万円
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">既契約給付（入院）</td>
                    {sampleCase1Tables.threeMonths.map((data) => (
                      <td key={data.ageRange} className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                        {data.existingBenefit}万円
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">加入前の不足</td>
                    {sampleCase1Tables.threeMonths.map((data) => (
                      <td key={data.ageRange} className="px-4 py-3 text-center text-sm font-semibold text-red-600">
                        -{data.shortfall}万円
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            ) : (
              <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">項目＼年代</th>
                  {lifePlanTableData.map((data) => (
                    <th key={data.ageRange} className="px-4 py-3 text-center text-sm font-semibold text-gray-700 min-w-[100px]">
                      {data.ageRange}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 text-sm font-medium text-gray-700">主なライフイベント</td>
                  {lifePlanTableData.map((data) => (
                    <td key={data.ageRange} className="px-4 py-3 text-center text-sm text-gray-600">
                      {data.mainLifeEvents}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-700">最低限必要な金額</td>
                  {lifePlanTableData.map((data) => (
                    <td key={data.ageRange} className="px-4 py-3 text-center text-sm text-gray-600">
                      {data.minimumRequired}万円
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 text-sm font-medium text-gray-700">万が一の時に必要な金額</td>
                  {lifePlanTableData.map((data) => (
                    <td key={data.ageRange} className="px-4 py-3 text-center text-sm text-gray-600">
                      {data.emergencyRequired}万円
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100 bg-blue-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-700">予測収入（世帯）</td>
                  {lifePlanTableData.map((data) => (
                    <td key={data.ageRange} className="px-4 py-3 text-center text-sm text-gray-600">
                      {data.expectedIncome}万円
                    </td>
                  ))}
                </tr>
                <tr className="bg-yellow-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-700">過不足（ギャップ）</td>
                  {lifePlanTableData.map((data) => (
                    <td key={data.ageRange} className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      {data.gap}万円
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            )}
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">収入・支出グラフ</h2>
            <div className="flex gap-2">
              {isSampleCase1 ? (
                <>
                  <button
                    onClick={() => setActiveChartTab("incomeExpense")}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeChartTab === "incomeExpense" 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ライフイベント
                  </button>
                  <button
                    onClick={() => setActiveChartTab("planA")}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeChartTab === "planA" 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    三大疾病6か月
                  </button>
                  <button
                    onClick={() => setActiveChartTab("planB")}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeChartTab === "planB" 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    三大疾病3か月
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowMinimumAmount(true)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      showMinimumAmount
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    最低限必要な額
                  </button>
                  <button
                    onClick={() => setShowMinimumAmount(false)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      !showMinimumAmount
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    万が一の時
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Chart */}
          <div className="bg-gray-50 rounded-lg p-6">
            {isSampleCase1 && activeChartTab === "incomeExpense" ? (
              // Chart 1: Income, Expense, and Life Event costs
              <>
                <div className="relative h-96">
                  <div className="absolute left-0 top-0 bottom-13 flex flex-col justify-between text-sm text-gray-600">
                    <span>300万円</span>
                    <span>250万円</span>
                    <span>200万円</span>
                    <span>150万円</span>
                    <span>100万円</span>
                    <span>50万円</span>
                    <span>0万円</span>
                  </div>
                  
                  <div className="ml-16 h-full relative">
                    <svg className="w-full h-full" viewBox="0 0 700 350">
                      {/* Grid lines */}
                      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                        <line
                          key={`grid-y-${i}`}
                          x1="0"
                          y1={i * 50}
                          x2="700"
                          y2={i * 50}
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                      ))}
                      
                      {/* Income line */}
                      <path
                        d={`M ${sampleCase1Tables.lifeEventsChart.map((data, index) => {
                          const x = index * 100 + 50;
                          const y = 350 - (parseInt(data.income) / 300 * 350);
                          return `${x},${y}`;
                        }).join(' L ')}`}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                      />
                      
                      {/* Expense line */}
                      <path
                        d={`M ${sampleCase1Tables.lifeEventsChart.map((data, index) => {
                          const x = index * 100 + 50;
                          const y = 350 - (parseInt(data.expense) / 300 * 350);
                          return `${x},${y}`;
                        }).join(' L ')}`}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                      />
                      
                      {/* Life event costs points */}
                      {sampleCase1Tables.lifeEventsChart.map((data, index) => {
                        const x = index * 100 + 50;
                        const incomeY = 350 - (parseInt(data.income) / 300 * 350);
                        const expenseY = 350 - (parseInt(data.expense) / 300 * 350);
                        const eventCostY = data.singleCost !== "なし" ? 350 - (parseInt(data.singleCost) / 300 * 350) : null;
                        
                        return (
                          <g key={`points-${index}`}>
                            <circle cx={x} cy={incomeY} r="5" fill="#10b981" />
                            <circle cx={x} cy={expenseY} r="5" fill="#3b82f6" />
                            {eventCostY !== null && (
                              <circle cx={x} cy={eventCostY} r="8" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
                            )}
                          </g>
                        );
                      })}
                    </svg>
                    
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-sm text-gray-600">
                      {sampleCase1Tables.lifeEventsChart.map((data) => (
                        <span key={data.ageRange} className="w-[100px] text-center">{data.ageRange}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center gap-8">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-600">想定手取り</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-600">想定生活費</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-amber-500 rounded"></div>
                    <span className="text-sm text-gray-600">単発費用</span>
                  </div>
                </div>
              </>
            ) : isSampleCase1 && activeChartTab === "planA" ? (
              // Chart 2: Plan A comparison (comprehensive coverage)
              <>
                <div className="relative h-96">
                  <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-sm text-gray-600">
                    <span>200万円</span>
                    <span>160万円</span>
                    <span>120万円</span>
                    <span>80万円</span>
                    <span>40万円</span>
                    <span>0万円</span>
                  </div>
                  
                  <div className="ml-16 h-full relative">
                    <svg className="w-full h-full" viewBox="0 0 600 350" preserveAspectRatio="none">
                      {/* Grid lines */}
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <line
                          key={`grid-y-${i}`}
                          x1="0"
                          y1={i * 70}
                          x2="600"
                          y2={i * 70}
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                      ))}
                      
                      {/* Vertical grid lines for each age */}
                      {sampleCase1Tables.planAChart.map((_, index) => {
                        const x = (index / (sampleCase1Tables.planAChart.length - 1)) * 600;
                        return (
                          <line
                            key={`grid-x-${index}`}
                            x1={x}
                            y1="0"
                            x2={x}
                            y2="350"
                            stroke="#e5e7eb"
                            strokeWidth="1"
                            strokeDasharray="2,2"
                          />
                        );
                      })}
                      
                      {/* Required amount line */}
                      <path
                        d={`M ${sampleCase1Tables.planAChart.map((data, index) => {
                          const x = (index / (sampleCase1Tables.planAChart.length - 1)) * 600;
                          const y = 350 - (parseInt(data.required) / 200 * 350);
                          return `${x},${y}`;
                        }).join(' L ')}`}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="3"
                      />
                      
                      {/* Existing coverage line */}
                      <path
                        d={`M ${sampleCase1Tables.planAChart.map((data, index) => {
                          const x = (index / (sampleCase1Tables.planAChart.length - 1)) * 600;
                          const y = 350 - (parseInt(data.existing) / 200 * 350);
                          return `${x},${y}`;
                        }).join(' L ')}`}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                      />
                      
                      {/* Data points */}
                      {sampleCase1Tables.planAChart.map((data, index) => {
                        const x = (index / (sampleCase1Tables.planAChart.length - 1)) * 600;
                        const requiredY = 350 - (parseInt(data.required) / 200 * 350);
                        const existingY = 350 - (parseInt(data.existing) / 200 * 350);
                        
                        return (
                          <g key={`points-${index}`}>
                            <circle cx={x} cy={requiredY} r="6" fill="#ef4444" />
                            <circle cx={x} cy={existingY} r="6" fill="#3b82f6" />
                          </g>
                        );
                      })}
                    </svg>
                    
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-sm text-gray-600 px-1">
                      {sampleCase1Tables.planAChart.map((data) => (
                        <span key={data.ageRange} className="text-center">{data.ageRange}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center gap-8">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm text-gray-600">必要になる額</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-600">既契約でもらえる分</span>
                  </div>
                </div>
              </>
            ) : isSampleCase1 && activeChartTab === "planB" ? (
              // Chart 3: Plan B comparison (basic coverage)
              <>
                <div className="relative h-96">
                  <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-sm text-gray-600">
                    <span>200万円</span>
                    <span>160万円</span>
                    <span>120万円</span>
                    <span>80万円</span>
                    <span>40万円</span>
                    <span>0万円</span>
                  </div>
                  
                  <div className="ml-16 h-full relative">
                    <svg className="w-full h-full" viewBox="0 0 600 350" preserveAspectRatio="none">
                      {/* Grid lines */}
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <line
                          key={`grid-y-${i}`}
                          x1="0"
                          y1={i * 70}
                          x2="600"
                          y2={i * 70}
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                      ))}
                      
                      {/* Vertical grid lines for each age */}
                      {sampleCase1Tables.planBChart.map((_, index) => {
                        const x = (index / (sampleCase1Tables.planBChart.length - 1)) * 600;
                        return (
                          <line
                            key={`grid-x-${index}`}
                            x1={x}
                            y1="0"
                            x2={x}
                            y2="350"
                            stroke="#e5e7eb"
                            strokeWidth="1"
                            strokeDasharray="2,2"
                          />
                        );
                      })}
                      
                      {/* Required amount line */}
                      <path
                        d={`M ${sampleCase1Tables.planBChart.map((data, index) => {
                          const x = (index / (sampleCase1Tables.planBChart.length - 1)) * 600;
                          const y = 350 - (parseInt(data.required) / 200 * 350);
                          return `${x},${y}`;
                        }).join(' L ')}`}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="3"
                      />
                      
                      {/* Existing coverage line */}
                      <path
                        d={`M ${sampleCase1Tables.planBChart.map((data, index) => {
                          const x = (index / (sampleCase1Tables.planBChart.length - 1)) * 600;
                          const y = 350 - (parseInt(data.existing) / 200 * 350);
                          return `${x},${y}`;
                        }).join(' L ')}`}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                      />
                      
                      {/* Data points */}
                      {sampleCase1Tables.planBChart.map((data, index) => {
                        const x = (index / (sampleCase1Tables.planBChart.length - 1)) * 600;
                        const requiredY = 350 - (parseInt(data.required) / 200 * 350);
                        const existingY = 350 - (parseInt(data.existing) / 200 * 350);
                        
                        return (
                          <g key={`points-${index}`}>
                            <circle cx={x} cy={requiredY} r="6" fill="#ef4444" />
                            <circle cx={x} cy={existingY} r="6" fill="#3b82f6" />
                          </g>
                        );
                      })}
                    </svg>
                    
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-sm text-gray-600 px-1">
                      {sampleCase1Tables.planBChart.map((data) => (
                        <span key={data.ageRange} className="text-center">{data.ageRange}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center gap-8">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm text-gray-600">必要になる額</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-600">既契約でもらえる分</span>
                  </div>
                </div>
              </>
            ) : (
              // Default chart (non-sample case 1)
              <>
                <div className="relative h-96">
                  <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-sm text-gray-600">
                    <span>1000万円</span>
                    <span>800万円</span>
                    <span>600万円</span>
                    <span>400万円</span>
                    <span>200万円</span>
                    <span>0万円</span>
                  </div>
                  
                  <div className="ml-16 h-full relative">
                    <svg className="w-full h-full" viewBox="0 0 800 400">
                      {/* Grid lines */}
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <line
                          key={`grid-y-${i}`}
                          x1="0"
                          y1={i * 80}
                          x2="800"
                          y2={i * 80}
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                      ))}
                      
                      {/* Income line */}
                      <path
                        d={`M ${chartData.map((data, index) => {
                          const x = (index / (chartData.length - 1)) * 800;
                          const y = 400 - (data.income / 1000) * 400;
                          return `${x},${y}`;
                        }).join(' L ')}`}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                      />
                      
                      {/* Income area fill */}
                      <path
                        d={`M 0,400 L ${chartData.map((data, index) => {
                          const x = (index / (chartData.length - 1)) * 800;
                          const y = 400 - (data.income / 1000) * 400;
                          return `${x},${y}`;
                        }).join(' L ')} L 800,400 Z`}
                        fill="#10b981"
                        fillOpacity="0.1"
                      />
                      
                      {/* Required amount line */}
                      <path
                        d={`M ${chartData.map((data, index) => {
                          const x = (index / (chartData.length - 1)) * 800;
                          const y = 400 - (data.required / 1000) * 400;
                          return `${x},${y}`;
                        }).join(' L ')}`}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="3"
                        strokeDasharray="5,5"
                      />
                      
                      {/* Data points */}
                      {chartData.map((data, index) => {
                        const x = (index / (chartData.length - 1)) * 800;
                        const incomeY = 400 - (data.income / 1000) * 400;
                        const requiredY = 400 - (data.required / 1000) * 400;
                        
                        return (
                          <g key={`point-${index}`}>
                            <circle cx={x} cy={incomeY} r="5" fill="#10b981" />
                            <circle cx={x} cy={requiredY} r="5" fill="#ef4444" />
                          </g>
                        );
                      })}
                    </svg>
                    
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-sm text-gray-600">
                      {chartData.map((data, index) => (
                        <span key={`x-label-${index}`}>{data.age}代</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center gap-8">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-600">予測収入（総額）</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm text-gray-600">
                      {showMinimumAmount ? '最低限必要な額' : '万が一の時に必要な額'}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Income Breakdown */}
          

          {/* AIレコメンドプラン提示ボタン */}
          {onNext && (
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">次のステップ</h3>
                <p className="text-gray-600 mb-6">
                  ライフプラン分析結果を基に、あなたに最適な保険プランをAIが提案いたします
                </p>
                <button
                  onClick={onNext}
                  className="inline-flex items-center gap-2 bg-green-600 text-white py-3 px-8 rounded-md hover:bg-green-700 transition-all duration-200 font-medium text-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  AIレコメンドプラン提示
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}