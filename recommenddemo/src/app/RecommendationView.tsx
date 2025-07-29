"use client";

import { useState } from "react";

interface RecommendationViewProps {
  formData: any;
  onBack: () => void;
}

type InsurancePlan = {
  id: string;
  name: string;
  type: string;
  paymentMethod: string;
  purpose: string;
  additionalContract: string;
  monthlyPremium: string;
  futurePrice?: string;
};

export default function RecommendationView({ formData, onBack }: RecommendationViewProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<"3months" | "6months">("3months");

  // Check if this is sample case 1
  const isSampleCase1 = formData.gender === "female" && formData.age === 28 && formData.birthDate === "1996-03-15";

  // Sample case 1 coverage gap data
  const sampleCase1CoverageGaps = {
    "3months": {
      planA: [
        { ageRange: "20代", shortage: "35", hospitalization: "15", critical: "90", result: "+70" },
        { ageRange: "30代", shortage: "56", hospitalization: "15", critical: "90", result: "+49" },
        { ageRange: "40代", shortage: "41", hospitalization: "15", critical: "90", result: "+64" },
        { ageRange: "50代", shortage: "38", hospitalization: "15", critical: "90", result: "+67" },
        { ageRange: "60代", shortage: "25", hospitalization: "15", critical: "90", result: "+80" },
        { ageRange: "70代", shortage: "30", hospitalization: "15", critical: "90", result: "+75" },
        { ageRange: "80代", shortage: "40", hospitalization: "15", critical: "90", result: "+65" }
      ],
      planB: [
        { ageRange: "20代", shortage: "35", hospitalization: "30", critical: "150", result: "+145" },
        { ageRange: "30代", shortage: "56", hospitalization: "30", critical: "150", result: "+124" },
        { ageRange: "40代", shortage: "41", hospitalization: "30", critical: "150", result: "+139" },
        { ageRange: "50代", shortage: "38", hospitalization: "30", critical: "150", result: "+142" },
        { ageRange: "60代", shortage: "25", hospitalization: "30", critical: "150", result: "+155" },
        { ageRange: "70代", shortage: "30", hospitalization: "30", critical: "150", result: "+150" },
        { ageRange: "80代", shortage: "40", hospitalization: "30", critical: "150", result: "+140" }
      ],
      planC: [
        { ageRange: "20代", shortage: "35", hospitalization: "30", critical: "150", result: "+145" },
        { ageRange: "30代", shortage: "56", hospitalization: "30", critical: "150", result: "+124" },
        { ageRange: "40代", shortage: "41", hospitalization: "30", critical: "150", result: "+139" },
        { ageRange: "50代", shortage: "38", hospitalization: "30", critical: "150", result: "+142" },
        { ageRange: "60代", shortage: "25", hospitalization: "30", critical: "150", result: "+155" },
        { ageRange: "70代", shortage: "30", hospitalization: "30", critical: "150", result: "+150" },
        { ageRange: "80代", shortage: "40", hospitalization: "30", critical: "150", result: "+140" }
      ]
    },
    "6months": {
      planA: [
        { ageRange: "20代", shortage: "80", hospitalization: "15", critical: "90", result: "+25" },
        { ageRange: "30代", shortage: "122", hospitalization: "15", critical: "90", result: "-17" },
        { ageRange: "40代", shortage: "92", hospitalization: "15", critical: "90", result: "+13" },
        { ageRange: "50代", shortage: "86", hospitalization: "15", critical: "90", result: "+19" },
        { ageRange: "60代", shortage: "60", hospitalization: "15", critical: "90", result: "+45" },
        { ageRange: "70代", shortage: "80", hospitalization: "15", critical: "90", result: "+25" },
        { ageRange: "80代", shortage: "100", hospitalization: "15", critical: "90", result: "+5" }
      ],
      planB: [
        { ageRange: "20代", shortage: "80", hospitalization: "30", critical: "150", result: "+100" },
        { ageRange: "30代", shortage: "122", hospitalization: "30", critical: "150", result: "+58" },
        { ageRange: "40代", shortage: "92", hospitalization: "30", critical: "150", result: "+88" },
        { ageRange: "50代", shortage: "86", hospitalization: "30", critical: "150", result: "+94" },
        { ageRange: "60代", shortage: "60", hospitalization: "30", critical: "150", result: "+120" },
        { ageRange: "70代", shortage: "80", hospitalization: "30", critical: "150", result: "+100" },
        { ageRange: "80代", shortage: "100", hospitalization: "30", critical: "150", result: "+80" }
      ],
      planC: [
        { ageRange: "20代", shortage: "80", hospitalization: "30", critical: "150", result: "+100" },
        { ageRange: "30代", shortage: "122", hospitalization: "30", critical: "150", result: "+58" },
        { ageRange: "40代", shortage: "92", hospitalization: "30", critical: "150", result: "+88" },
        { ageRange: "50代", shortage: "86", hospitalization: "30", critical: "150", result: "+94" },
        { ageRange: "60代", shortage: "60", hospitalization: "30", critical: "150", result: "+120" },
        { ageRange: "70代", shortage: "80", hospitalization: "30", critical: "150", result: "+100" },
        { ageRange: "80代", shortage: "100", hospitalization: "30", critical: "150", result: "+80" }
      ]
    }
  };

  // Generate personalized recommendations based on form data
  const generateRecommendations = (): InsurancePlan[] => {
    // Return special plans for sample case 1
    if (isSampleCase1) {
      return [
        {
          id: "planA",
          name: "A：ミニマム",
          type: "終身医療（保障終身）",
          paymentMethod: "終身払",
          purpose: "最低コストで両対応を確保",
          additionalContract: "入院一時金 15万円 / 三大疾病一時金 90万円 / 先進医療 ON /（既契約：日額5,000は据置）",
          monthlyPremium: "約 ¥2,275"
        },
        {
          id: "planB",
          name: "B：厚め＆老後無払",
          type: "終身医療（保障終身）",
          paymentMethod: "60歳払済",
          purpose: "30代ピークと老後の負担ゼロ化",
          additionalContract: "入院一時金 30万円 / 三大疾病一時金 150万円 / 先進医療 ON /（既契約：日額5,000→必要なら1万円へ見直しも可）",
          monthlyPremium: "約 ¥4,780"
        },
        {
          id: "planC",
          name: "C：初期安",
          type: "定期医療（10年更新）",
          paymentMethod: "更新時年齢で料率UP",
          purpose: "いったん安く、後で見直す前提",
          additionalContract: "（Bと同等保障）入院一時金 30万円 / 三大疾病 150万円 / 先進医療 ON",
          monthlyPremium: "初年度 約 ¥2,700",
          futurePrice: "※38歳更新予想 約 ¥3,450、48歳 約 ¥4,650"
        }
      ];
    }

    // Default plans for other cases
    const age = formData.age || 30;
    const gender = formData.gender;
    const healthStatus = formData.healthStatus;
    const budget = formData.monthlyPremiumBudget;

    const plans: InsurancePlan[] = [
      {
        id: "recommended-1",
        name: "プランA",
        type: "終身医療（保障終身）",
        paymentMethod: "65歳払済",
        purpose: "バランス型プラン",
        additionalContract: "三大疾病一時金 / がん治療特約 / 入院日額1万円",
        monthlyPremium: "¥3,500"
      },
      {
        id: "recommended-2",
        name: "プランB",
        type: "終身医療（保障終身）",
        paymentMethod: "終身払",
        purpose: "コストパフォーマンス重視",
        additionalContract: gender === "female" ? "女性疾病特約 / 入院日額8千円" : "生活習慣病特約 / 入院日額8千円",
        monthlyPremium: "¥2,800"
      },
      {
        id: "recommended-3",
        name: "プランC",
        type: "終身医療（保障終身）",
        paymentMethod: "60歳払済",
        purpose: "充実保障プラン",
        additionalContract: "三大疾病一時金 / がん治療特約 / 先進医療特約 / 介護一時金 / 入院日額1.2万円",
        monthlyPremium: "¥4,200"
      }
    ];

    return plans;
  };

  const recommendedPlans = generateRecommendations();

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
              <h1 className="text-2xl font-semibold text-gray-900">おすすめプラン提示</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* AI Recommend Title */}
        {isSampleCase1 && (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AIレコメンドプラン</h1>
            <p className="text-gray-600">お客様の状況に最適な保険プランをAIが分析しました</p>
          </div>
        )}

        {/* Recommended Plans Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">推奨プラン比較表</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">プラン</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">形態 / 払込</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ねらい</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">追加の契約内容</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">月額</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recommendedPlans.map((plan, idx) => (
                  <tr 
                    key={plan.id} 
                    className={`cursor-pointer transition-all ${
                      selectedPlan === plan.id 
                        ? 'bg-blue-100 ring-2 ring-blue-500 ring-inset' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        {plan.name}
                        {selectedPlan === plan.id && (
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div>{plan.type}</div>
                      <div className="text-gray-500">{plan.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{plan.purpose}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{plan.additionalContract}</td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-900">
                      <div>{plan.monthlyPremium}</div>
                      {plan.futurePrice && (
                        <div className="text-xs text-gray-500 mt-1">{plan.futurePrice}</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isSampleCase1 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">どれを勧めるか（短評）</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>A：</strong>いちばん通しやすい"最安セット"。3か月/6か月の三大疾病シナリオでも黒字化を狙える初期値。</p>
                <p><strong>B：</strong>30代前半の家計ピークや長期休業に強く、定年後の支払いゼロが明確な安心。</p>
                <p><strong>C：</strong>初期予算が厳しい層向け。更新の度に上がる前提で、将来Bへ乗換計画とセット提案が現実的。</p>
              </div>
            </div>
          )}
        </div>

        {/* Coverage Gap Analysis for Sample Case 1 */}
        {isSampleCase1 && selectedPlan && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">年代別加入後保障分析</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedScenario("3months")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedScenario === "3months"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  3か月シナリオ
                </button>
                <button
                  onClick={() => setSelectedScenario("6months")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedScenario === "6months"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  6か月シナリオ
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      項目
                    </th>
                    {sampleCase1CoverageGaps[selectedScenario][selectedPlan as keyof typeof sampleCase1CoverageGaps["3months"]]?.map((row, idx) => (
                      <th key={idx} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {row.ageRange}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="bg-red-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                      加入前の不足
                    </td>
                    {sampleCase1CoverageGaps[selectedScenario][selectedPlan as keyof typeof sampleCase1CoverageGaps["3months"]]?.map((row, idx) => (
                      <td key={idx} className="px-4 py-4 whitespace-nowrap text-center">
                        <div className="text-base text-gray-900">
                          -{row.shortage}万円
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                      追加：入院一時金
                    </td>
                    {sampleCase1CoverageGaps[selectedScenario][selectedPlan as keyof typeof sampleCase1CoverageGaps["3months"]]?.map((row, idx) => (
                      <td key={idx} className="px-4 py-4 whitespace-nowrap text-center">
                        <div className="text-base text-gray-900">
                          +{row.hospitalization}万円
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                      追加：三大疾病一時金
                    </td>
                    {sampleCase1CoverageGaps[selectedScenario][selectedPlan as keyof typeof sampleCase1CoverageGaps["3months"]]?.map((row, idx) => (
                      <td key={idx} className="px-4 py-4 whitespace-nowrap text-center">
                        <div className="text-base text-gray-900">
                          +{row.critical}万円
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t-2 border-gray-300 bg-green-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      加入後の保障状況
                    </td>
                    {sampleCase1CoverageGaps[selectedScenario][selectedPlan as keyof typeof sampleCase1CoverageGaps["3months"]]?.map((row, idx) => {
                      const value = parseInt(row.result);
                      const isShortage = value < 0;
                      const isSurplus = value > 0;
                      return (
                        <td key={idx} className="px-4 py-4 whitespace-nowrap text-center">
                          <div className="text-base text-gray-900">
                            {isSurplus ? "+" : ""}{value}万円
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <span className="font-semibold">
                  {selectedScenario === "3months" ? "3か月（中期）シナリオ" : "6か月（長期・三大疾病）シナリオ"}
                </span>
                での保障分析結果です。
                {selectedPlan === "planC" && (
                  <span className="block mt-1">
                    ※プランC（定期10年）はプランBと同じ保障額です。違いは保険料が更新で上がる点のみ。
                  </span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {selectedPlan && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">次のステップ</h3>
            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium">
                このプランで申し込み手続きへ
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-200 transition-colors font-medium">
                詳細な見積もりを依頼
              </button>
              <button 
                onClick={onBack}
                className="flex-1 bg-green-100 text-green-700 py-3 px-6 rounded-md hover:bg-green-200 transition-colors font-medium"
              >
                ライフプラン分析に戻る
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}