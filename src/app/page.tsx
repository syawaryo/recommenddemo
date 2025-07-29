"use client";

import { useState } from "react";
import LifePlanView from "./LifePlanView";
import RecommendationView from "./RecommendationView";

type FormData = {
  birthDate: string;
  age: number;
  gender: string;
  healthStatus: string;
  recentHospitalization: string;
  currentTreatment: string;
  employmentType: string;
  sicknessBenefit: string;
  existingCoverage: string;
  existingBenefits: string;
  familyStructure: string;
  annualIncome: string;
  monthlyPremiumBudget: string;
  occupation: string;
  lifeEvents: string;
  lifestyle: string;
  medicalLiteracy: string;
  investmentExperience: string;
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"form" | "lifeplan" | "recommendation">("form");
  const [formData, setFormData] = useState<Partial<FormData>>({});

  // サンプルケースデータ
  const sampleCases = {
    case1: {
      name: "田中 美咲 (28)",
      description: "都内IT企業・SE",
      data: {
        birthDate: "1996-03-15",
        age: 28,
        gender: "female",
        healthStatus: "excellent",
        recentHospitalization: "none",
        currentTreatment: "定期通院なし",
        employmentType: "fulltime",
        sicknessBenefit: "yes",
        existingCoverage: "basic",
        existingBenefits: "日額5,000円、60日限度、先進医療特約のみ",
        familyStructure: "single",
        annualIncome: "5to7m",
        monthlyPremiumBudget: "5to10k",
        occupation: "IT企業勤務、テレワーク中心、残業多め",
        lifeEvents: "2年以内に結婚予定、住宅購入検討中",
        lifestyle: "非喫煙、週2回ジム通い、BMI 21",
        medicalLiteracy: "high",
        investmentExperience: "beginner"
      }
    },
    case2: {
      name: "佐々木 健一 (45)",
      description: "地方でパン屋経営",
      data: {
        birthDate: "1980-11-07",
        age: 45,
        gender: "male",
        healthStatus: "fair",
        recentHospitalization: "3years",
        currentTreatment: "高血圧で月1回通院、降圧剤服用中",
        employmentType: "selfemployed",
        sicknessBenefit: "no",
        existingCoverage: "none",
        existingBenefits: "",
        familyStructure: "married_with_kids",
        annualIncome: "3to5m",
        monthlyPremiumBudget: "5to10k",
        occupation: "パン屋経営、立ち仕事、深夜仕込み作業あり",
        lifeEvents: "3年後に長女大学進学、住宅ローン残15年",
        lifestyle: "喫煙（1日10本）、毎晩飲酒、BMI 27",
        medicalLiteracy: "low",
        investmentExperience: "intermediate"
      }
    },
    case3: {
      name: "大村 和子 (62)",
      description: "嘱託勤務の薬剤師",
      data: {
        birthDate: "1963-08-21",
        age: 62,
        gender: "female",
        healthStatus: "poor",
        recentHospitalization: "1year",
        currentTreatment: "糖尿病Ⅱ型で週1回通院、インスリン治療中、半年前に人工股関節置換術",
        employmentType: "contract",
        sicknessBenefit: "yes",
        existingCoverage: "comprehensive",
        existingBenefits: "日額10,000円、120日限度、先進医療特約、三大疾病一時金50万円",
        familyStructure: "married_no_kids",
        annualIncome: "under3m",
        monthlyPremiumBudget: "2to3k",
        occupation: "薬剤師（嘱託）、週4日勤務、立ち仕事だが短時間",
        lifeEvents: "65歳で完全リタイア予定、夫婦で地方移住検討",
        lifestyle: "非喫煙、飲酒少量、BMI 24、週3回ウォーキング",
        medicalLiteracy: "high",
        investmentExperience: "advanced"
      }
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const loadSampleCase = (caseKey: keyof typeof sampleCases) => {
    const sampleData = sampleCases[caseKey].data;
    setFormData(sampleData);
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleBirthDateChange = (value: string) => {
    const age = calculateAge(value);
    setFormData(prev => ({ ...prev, birthDate: value, age }));
  };

  // ライフプラン分析ページを表示
  if (currentPage === "lifeplan") {
    return (
      <LifePlanView 
        formData={formData} 
        onBack={() => setCurrentPage("form")}
        onNext={() => setCurrentPage("recommendation")}
      />
    );
  }

  // プラン提示ページを表示
  if (currentPage === "recommendation") {
    return (
      <RecommendationView 
        formData={formData} 
        onBack={() => setCurrentPage("lifeplan")}
      />
    );
  }

  // フォームページを表示
  return (
    <div className="min-h-screen bg-gray-25" style={{ backgroundColor: '#fafafa' }}>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">AI医療保険レコメンドシステム</h1>
                <p className="text-sm text-gray-600">あなたに最適な保険プランをAIが分析・ご提案</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">お客様情報入力</h2>
              <p className="text-gray-600">下記の項目をご入力いただき、最適なプランをご提案いたします</p>
            </div>

            {/* サンプルケースボタン */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-4 font-medium">サンプルデータで試す</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.entries(sampleCases).map(([key, sampleCase]) => (
                  <button
                    key={key}
                    onClick={() => loadSampleCase(key as keyof typeof sampleCases)}
                    className="p-4 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-left"
                  >
                    <div className="font-medium text-sm text-gray-700 mb-1">{sampleCase.name}</div>
                    <div className="text-xs text-gray-500">{sampleCase.description}</div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              {/* A. 生年月日 */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center text-xs font-bold text-gray-600">A</span>
                  生年月日（満年齢）
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={formData.birthDate || ""}
                  onChange={(e) => handleBirthDateChange(e.target.value)}
                />
                {formData.age !== undefined && (
                  <span className="text-sm text-gray-600 mt-2 inline-block">満 {formData.age} 歳</span>
                )}
              </div>

              {/* B. 性別 */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center text-xs font-bold text-gray-600">B</span>
                  性別
                </label>
                <select
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                  value={formData.gender || ""}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                >
                  <option value="">選択してください</option>
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                  <option value="other">その他</option>
                </select>
              </div>

              {/* C. 健康状態・既往症 */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center text-xs font-bold text-gray-600">C</span>
                  健康状態・既往症
                </label>
                <select
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                  value={formData.healthStatus || ""}
                  onChange={(e) => handleInputChange("healthStatus", e.target.value)}
                >
                  <option value="">選択してください</option>
                  <option value="excellent">良好</option>
                  <option value="good">普通</option>
                  <option value="fair">既往症あり</option>
                  <option value="poor">治療中</option>
                </select>
              </div>

              {/* C-1. 直近の入院・手術歴 */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-7 h-6 bg-gray-100 rounded-md flex items-center justify-center text-xs font-bold text-gray-600">C-1</span>
                  直近の入院・手術歴
                </label>
                <select
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                  value={formData.recentHospitalization || ""}
                  onChange={(e) => handleInputChange("recentHospitalization", e.target.value)}
                >
                  <option value="">選択してください</option>
                  <option value="none">なし</option>
                  <option value="1year">1年以内</option>
                  <option value="3years">3年以内</option>
                  <option value="5years">5年以内</option>
                  <option value="over5years">5年以上前</option>
                </select>
              </div>

              {/* C-2. 現在の通院・持病・服薬状況 */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-7 h-6 bg-gray-100 rounded-md flex items-center justify-center text-xs font-bold text-gray-600">C-2</span>
                  現在の通院・持病・服薬状況
                </label>
                <textarea
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                  rows={2}
                  value={formData.currentTreatment || ""}
                  onChange={(e) => handleInputChange("currentTreatment", e.target.value)}
                  placeholder="例：高血圧で月1回通院、降圧剤服用中"
                />
              </div>

              {/* D. 雇用形態 */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center text-xs font-bold text-gray-600">D</span>
                  雇用形態
                </label>
                <select
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                  value={formData.employmentType || ""}
                  onChange={(e) => handleInputChange("employmentType", e.target.value)}
                >
                  <option value="">選択してください</option>
                  <option value="fulltime">会社員（正社員）</option>
                  <option value="contract">契約社員</option>
                  <option value="parttime">パート・アルバイト</option>
                  <option value="selfemployed">自営業</option>
                  <option value="freelance">フリーランス</option>
                  <option value="unemployed">無職</option>
                  <option value="other">その他</option>
                </select>
              </div>

              {/* E. 傷病手当金の有無 */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center text-xs font-bold text-gray-600">E</span>
                  傷病手当金の有無
                </label>
                <select
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                  value={formData.sicknessBenefit || ""}
                  onChange={(e) => handleInputChange("sicknessBenefit", e.target.value)}
                >
                  <option value="">選択してください</option>
                  <option value="yes">あり</option>
                  <option value="no">なし</option>
                  <option value="unknown">不明</option>
                </select>
              </div>

              {/* F. 既契約の医療保障内容 */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center text-xs font-bold text-gray-600">F</span>
                  既契約の医療保障内容
                </label>
                <select
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                  value={formData.existingCoverage || ""}
                  onChange={(e) => handleInputChange("existingCoverage", e.target.value)}
                >
                  <option value="">選択してください</option>
                  <option value="none">なし</option>
                  <option value="basic">基本保障のみ</option>
                  <option value="standard">標準的な保障</option>
                  <option value="comprehensive">充実した保障</option>
                </select>
              </div>

              {/* F-1. 入院日額・限度日数 */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-7 h-6 bg-gray-100 rounded-md flex items-center justify-center text-xs font-bold text-gray-600">F-1</span>
                  入院日額・限度日数
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={formData.existingBenefits || ""}
                  onChange={(e) => handleInputChange("existingBenefits", e.target.value)}
                  placeholder="例：日額5,000円、60日限度"
                />
              </div>

              {/* G. 家族構成・扶養状況 */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center text-xs font-bold text-gray-600">G</span>
                  家族構成・扶養状況
                </label>
                <select
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                  value={formData.familyStructure || ""}
                  onChange={(e) => handleInputChange("familyStructure", e.target.value)}
                >
                  <option value="">選択してください</option>
                  <option value="single">独身</option>
                  <option value="married_no_kids">既婚・子供なし</option>
                  <option value="married_with_kids">既婚・子供あり</option>
                  <option value="single_parent">ひとり親</option>
                  <option value="other">その他</option>
                </select>
              </div>

              {/* H. 年収レンジ・家計余力 */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center text-xs font-bold text-gray-600">H</span>
                  年収レンジ
                </label>
                <select
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                  value={formData.annualIncome || ""}
                  onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                >
                  <option value="">選択してください</option>
                  <option value="under3m">300万円未満</option>
                  <option value="3to5m">300〜500万円</option>
                  <option value="5to7m">500〜700万円</option>
                  <option value="7to10m">700〜1000万円</option>
                  <option value="over10m">1000万円以上</option>
                </select>
              </div>

              {/* I. 月々の保険料許容額 */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center text-xs font-bold text-gray-600">I</span>
                  月々の保険料許容額
                </label>
                <select
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                  value={formData.monthlyPremiumBudget || ""}
                  onChange={(e) => handleInputChange("monthlyPremiumBudget", e.target.value)}
                >
                  <option value="">選択してください</option>
                  <option value="under2k">2,000円未満</option>
                  <option value="2to3k">2,000〜3,000円</option>
                  <option value="3to5k">3,000〜5,000円</option>
                  <option value="5to10k">5,000〜10,000円</option>
                  <option value="over10k">10,000円以上</option>
                </select>
              </div>

              {/* J. 職業・働き方 */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center text-xs font-bold text-gray-600">J</span>
                  職業・働き方
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={formData.occupation || ""}
                  onChange={(e) => handleInputChange("occupation", e.target.value)}
                  placeholder="例：IT企業勤務、在宅勤務メイン"
                />
              </div>

              {/* K. 予定しているライフイベント */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center text-xs font-bold text-gray-600">K</span>
                  予定しているライフイベント
                </label>
                <textarea
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                  rows={2}
                  value={formData.lifeEvents || ""}
                  onChange={(e) => handleInputChange("lifeEvents", e.target.value)}
                  placeholder="例：2年後に結婚予定、5年後に住宅購入検討"
                />
              </div>

              {/* L. ライフスタイル・嗜好 */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center text-xs font-bold text-gray-600">L</span>
                  ライフスタイル・嗜好
                </label>
                <textarea
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                  rows={2}
                  value={formData.lifestyle || ""}
                  onChange={(e) => handleInputChange("lifestyle", e.target.value)}
                  placeholder="例：非喫煙、週2回ジム通い、BMI 22"
                />
              </div>

              {/* M. 医療リテラシー／価値観 */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center text-xs font-bold text-gray-600">M</span>
                  医療リテラシー／価値観
                </label>
                <select
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                  value={formData.medicalLiteracy || ""}
                  onChange={(e) => handleInputChange("medicalLiteracy", e.target.value)}
                >
                  <option value="">選択してください</option>
                  <option value="high">高い（先進医療に関心あり）</option>
                  <option value="medium">普通</option>
                  <option value="low">低い（基本的な保障で十分）</option>
                </select>
              </div>

              {/* N. 投資経験・貯蓄規模 */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center text-xs font-bold text-gray-600">N</span>
                  投資経験・貯蓄規模
                </label>
                <select
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
                  value={formData.investmentExperience || ""}
                  onChange={(e) => handleInputChange("investmentExperience", e.target.value)}
                >
                  <option value="">選択してください</option>
                  <option value="none">投資経験なし</option>
                  <option value="beginner">初心者（1年未満）</option>
                  <option value="intermediate">中級者（1〜5年）</option>
                  <option value="advanced">上級者（5年以上）</option>
                </select>
              </div>

              {/* ライフプラン分析へボタン */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={() => setCurrentPage("lifeplan")}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-md hover:bg-blue-700 transition-all duration-200 font-medium flex items-center justify-center gap-2 text-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  ライフプラン分析へ進む
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}