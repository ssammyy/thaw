/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DiagnosticToolData, ToolType } from '../types';

const likert = (scores: number[], labels: string[]) =>
  labels.map((label, i) => ({ label, value: scores[i] }));

const AGREE = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'];

// Weights for the Investment Analyzer (index-aligned with its questions)
const INVESTMENT_WEIGHTS = [15, 15, 15, 12, 12, 10, 10, 8, 8, 5];

export const TOOLS_DATA: Record<ToolType, DiagnosticToolData> = {
  vulnerability: {
    id: 'vulnerability',
    title: 'Vulnerability Diagnostic',
    description: '20 questions. 4 profiles. Discovers exactly how exposed you are to forex, betting, and quick-money predation — before you lose anything.',
    questions: [
      // Section 1 — Confidence Calibration
      {
        id: 'c1',
        section: 'Confidence Calibration',
        sectionDesc: 'How sharp is your financial instinct — really?',
        text: 'I can spot a financial scam or trap before putting money in.',
        options: likert([5, 4, 3, 2, 1], AGREE),
      },
      {
        id: 'c2',
        section: 'Confidence Calibration',
        sectionDesc: 'How sharp is your financial instinct — really?',
        text: 'I research every opportunity thoroughly before committing any money.',
        options: likert([5, 4, 3, 2, 1], AGREE),
      },
      {
        id: 'c3',
        section: 'Confidence Calibration',
        sectionDesc: 'How sharp is your financial instinct — really?',
        text: 'I understand exactly how brokers, platforms, and betting companies make their money.',
        options: likert([5, 4, 3, 2, 1], AGREE),
      },
      {
        id: 'c4',
        section: 'Confidence Calibration',
        sectionDesc: 'How sharp is your financial instinct — really?',
        text: 'I trust my instincts when evaluating financial opportunities.',
        options: likert([5, 4, 3, 2, 1], AGREE),
      },
      {
        id: 'c5',
        section: 'Confidence Calibration',
        sectionDesc: 'How sharp is your financial instinct — really?',
        text: 'I am more financially educated than the average person who loses money in these systems.',
        options: likert([5, 4, 3, 2, 1], AGREE),
      },
      // Section 2 — Behavioral History
      {
        id: 'b1',
        section: 'Behavioral History',
        sectionDesc: "Your past decisions don't lie.",
        text: 'Have you ever invested in something primarily because someone you respect recommended it?',
        options: likert([5, 4, 3, 2, 1], ['Yes, definitely', 'Yes, probably', 'Not sure', 'Unlikely', 'Never']),
      },
      {
        id: 'b2',
        section: 'Behavioral History',
        sectionDesc: "Your past decisions don't lie.",
        text: 'Have you ever held a losing position longer than planned — hoping it would recover?',
        options: likert([5, 4, 3, 2, 1], ['Yes, more than once', 'Yes, once', 'Maybe once', "I don't think so", 'Never']),
      },
      {
        id: 'b3',
        section: 'Behavioral History',
        sectionDesc: "Your past decisions don't lie.",
        text: 'Have you ever felt excitement rather than analytical calm when entering a financial opportunity?',
        options: likert([5, 4, 3, 2, 1], ['Always excited', 'Usually excited', 'Sometimes', 'Rarely', 'Never — always analytical']),
      },
      {
        id: 'b4',
        section: 'Behavioral History',
        sectionDesc: "Your past decisions don't lie.",
        text: 'Have you ever dismissed a warning about an opportunity you were already committed to?',
        options: likert([5, 4, 3, 2, 1], ['Yes, clearly', 'Probably yes', 'Maybe once', "I don't think so", 'Never']),
      },
      {
        id: 'b5',
        section: 'Behavioral History',
        sectionDesc: "Your past decisions don't lie.",
        text: 'Have you ever added more money to a losing trade, bet, or investment?',
        options: likert([5, 4, 3, 2, 1], ['Yes, multiple times', 'Yes, once', 'Came close', 'Never seriously', 'Never']),
      },
      // Section 3 — Systems Knowledge
      {
        id: 'k1',
        section: 'Systems Knowledge',
        sectionDesc: 'Intelligence without knowledge is just confidence.',
        text: "Can you explain precisely how a broker's spread affects your profitability from the first trade?",
        options: likert([1, 2, 3, 4, 5], ['Yes, in detail', 'Roughly yes', 'Vaguely', 'Not really', 'No idea']),
      },
      {
        id: 'k2',
        section: 'Systems Knowledge',
        sectionDesc: 'Intelligence without knowledge is just confidence.',
        text: 'Do you know the documented percentage of retail forex traders who make consistent profits?',
        options: likert([1, 2, 3, 4, 5], ['Yes, exactly', 'Yes, approximately', "I've heard a stat", 'Not really', 'No idea']),
      },
      {
        id: 'k3',
        section: 'Systems Knowledge',
        sectionDesc: 'Intelligence without knowledge is just confidence.',
        text: "Can you explain mathematically why a betting platform's margin guarantees long-term loss?",
        options: likert([1, 2, 3, 4, 5], ['Yes, clearly', 'Mostly yes', 'Partially', 'Not really', 'No']),
      },
      {
        id: 'k4',
        section: 'Systems Knowledge',
        sectionDesc: 'Intelligence without knowledge is just confidence.',
        text: 'Can you identify the difference between a structured loss system and a legitimate investment vehicle?',
        options: likert([1, 2, 3, 4, 5], ['Easily', 'Usually', 'Sometimes', 'Rarely', 'No']),
      },
      {
        id: 'k5',
        section: 'Systems Knowledge',
        sectionDesc: 'Intelligence without knowledge is just confidence.',
        text: 'Do you understand how affiliate marketing drives recruitment into financial schemes?',
        options: likert([1, 2, 3, 4, 5], ['Yes, fully', 'Mostly', 'Vaguely', 'Not really', 'No']),
      },
      // Section 4 — The Ego Traps
      {
        id: 'e1',
        section: 'The Ego Traps',
        sectionDesc: 'This is where the clever people fall hardest.',
        text: 'Successful people I personally know have made money from forex or betting.',
        options: likert([5, 4, 3, 2, 1], ['Yes, several', 'Yes, one or two', 'I think so', 'Not sure', 'No']),
      },
      {
        id: 'e2',
        section: 'The Ego Traps',
        sectionDesc: 'This is where the clever people fall hardest.',
        text: 'I have a system or strategy that gives me a genuine edge over other participants.',
        options: likert([5, 4, 3, 2, 1], AGREE),
      },
      {
        id: 'e3',
        section: 'The Ego Traps',
        sectionDesc: 'This is where the clever people fall hardest.',
        text: "I know when to stop — I have the discipline to walk away when I'm losing.",
        options: likert([1, 2, 3, 4, 5], ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never tested it']),
      },
      {
        id: 'e4',
        section: 'The Ego Traps',
        sectionDesc: 'This is where the clever people fall hardest.',
        text: "People who lose money in these systems simply didn't do enough homework.",
        options: likert([5, 4, 3, 2, 1], AGREE),
      },
      {
        id: 'e5',
        section: 'The Ego Traps',
        sectionDesc: 'This is where the clever people fall hardest.',
        text: 'If I lost money in a quick-money system, I would know exactly why and never repeat it.',
        options: likert([5, 4, 3, 2, 1], ['Absolutely', 'Probably', 'Maybe', 'Not sure', 'Unlikely']),
      },
    ],
    outcomes: [
      {
        id: 'confident-fool',
        title: 'The Confident Fool',
        description: 'High confidence. Low protection. Maximum exposure.',
        detail: "You are the primary target. Not because you're stupid — but because you're certain you aren't. Every quick-money system on earth was engineered specifically for your profile. Your confidence is the product they sell to their shareholders. The data is unambiguous: overconfidence is the single greatest predictor of financial loss in speculative markets. The good news? Awareness is the first exit.",
        nextSteps: ['Your profile is the reason this book was written.'],
      },
      {
        id: 'architect',
        title: 'The Architect',
        description: 'You understand the blueprint. But you still walk into the building.',
        detail: 'You have genuine intellectual understanding of how these systems work. But knowledge and behavior are two different things. When emotion enters — when a friend succeeds, when a loss triggers the urge to recover, when FOMO strikes — your intellectual framework dissolves. You know the architecture of the trap. You just keep finding reasons why this time is different.',
        nextSteps: ['The masterclass was built for people exactly like you.'],
      },
      {
        id: 'reluctant-participant',
        title: 'The Reluctant Participant',
        description: 'You sense something is wrong. But the pressure keeps pulling.',
        detail: "Your instincts are functioning. Something in you resists. But social proof, peer pressure, and the fear of missing out create a gravitational pull that your skepticism alone can't overcome. You need a framework — not just a feeling. Right now you're protecting yourself with discomfort rather than knowledge. That's fragile.",
        nextSteps: ['Turn your instinct into an unshakeable system.'],
      },
      {
        id: 'informed-skeptic',
        title: 'The Informed Skeptic',
        description: 'Rare. Genuinely rare.',
        detail: "You've done the work. Your knowledge and your behavior are aligned. You understand the architecture of these systems and your decisions reflect that understanding. You are in the top percentile of financial self-awareness. But here's your challenge — the people around you aren't. Your circle is vulnerable even if you aren't.",
        nextSteps: ['The question now is — who in your life needs this?'],
      },
    ],
    calculateResult: (scores) => {
      const total = scores.reduce((a, b) => a + b, 0);
      const max = 100; // 20 questions × max 5
      const pct = Math.round((total / max) * 100);
      let outcomeId = 'informed-skeptic';
      if (pct >= 75) outcomeId = 'confident-fool';
      else if (pct >= 55) outcomeId = 'architect';
      else if (pct >= 35) outcomeId = 'reluctant-participant';
      return { score: total, maxScore: max, outcomeId };
    },
  },

  investment: {
    id: 'investment',
    title: 'Investment Analyzer',
    description: '10 weighted questions across regulation, returns, recruitment, and liquidity. Gives a legitimacy score and verdict.',
    questions: [
      {
        id: 'returns',
        section: 'Returns',
        text: 'What kind of returns are being promised?',
        options: [
          { label: 'Guaranteed fixed returns (e.g. 20%+ monthly)', value: 0 },
          { label: 'Very high returns with vague explanation', value: 20 },
          { label: 'High returns tied to market performance', value: 50 },
          { label: 'Modest realistic returns with full explanation', value: 85 },
          { label: 'Returns vary, risk clearly disclosed', value: 100 },
        ],
      },
      {
        id: 'regulation',
        section: 'Regulation',
        text: 'What is the regulatory status of this opportunity?',
        options: [
          { label: 'Offshore registration only (Seychelles, Vanuatu, Belize)', value: 0 },
          { label: 'Claims regulation but I cannot verify it', value: 20 },
          { label: 'Registered locally but minimal oversight', value: 50 },
          { label: 'Licensed by a credible local regulator', value: 80 },
          { label: 'Fully regulated with verifiable public record', value: 100 },
        ],
      },
      {
        id: 'revenue',
        section: 'Revenue Model',
        text: 'How does the operator make money?',
        options: [
          { label: 'Unclear — I do not know how they profit', value: 0 },
          { label: 'They profit when I lose (market maker)', value: 5 },
          { label: 'Through spreads, fees, and commissions on trades', value: 40 },
          { label: 'Through product or service sales to end users', value: 80 },
          { label: 'Transparent fee structure clearly documented', value: 100 },
        ],
      },
      {
        id: 'recruitment',
        section: 'Recruitment',
        text: 'How were you introduced to this opportunity?',
        options: [
          { label: 'WhatsApp group or social media DM', value: 0 },
          { label: 'Friend or family member who earns commissions for referrals', value: 10 },
          { label: 'Influencer or social media advertisement', value: 25 },
          { label: 'Professional network or verified institutional channel', value: 75 },
          { label: 'I researched and found it independently', value: 100 },
        ],
      },
      {
        id: 'access',
        section: 'Liquidity',
        text: 'Can you access your money at any time without penalty?',
        options: [
          { label: 'No — locked in with conditions to withdraw', value: 0 },
          { label: 'Technically yes but withdrawal has been difficult for others', value: 20 },
          { label: 'Yes but with fees or waiting periods', value: 55 },
          { label: 'Yes with minor standard processing time', value: 85 },
          { label: 'Full liquidity, instant withdrawal, no conditions', value: 100 },
        ],
      },
      {
        id: 'track',
        section: 'Track Record',
        text: 'What is the verifiable track record of this opportunity?',
        options: [
          { label: 'Screenshots and testimonials only — unverified', value: 0 },
          { label: 'Some positive reviews but no audited records', value: 25 },
          { label: 'Operating for 1–2 years with mixed reviews', value: 45 },
          { label: '3+ years operating with verifiable public record', value: 80 },
          { label: 'Audited financial records and independent verification', value: 100 },
        ],
      },
      {
        id: 'urgency',
        section: 'Pressure',
        text: 'Is there urgency or pressure to decide quickly?',
        options: [
          { label: 'Yes — limited spots, countdown timer, act now', value: 0 },
          { label: 'Soft pressure — offer expires soon', value: 25 },
          { label: 'Mild encouragement but no hard deadline', value: 60 },
          { label: 'No pressure — take your time', value: 85 },
          { label: 'They actively discourage rushing', value: 100 },
        ],
      },
      {
        id: 'lifestyle',
        section: 'Marketing',
        text: 'How is this opportunity primarily marketed?',
        options: [
          { label: 'Luxury lifestyle — cars, travel, cash displays', value: 0 },
          { label: 'Success stories and testimonials without verification', value: 15 },
          { label: 'Mix of lifestyle and product explanation', value: 40 },
          { label: 'Primarily product/service explanation with some social proof', value: 75 },
          { label: 'Educational, transparent, data-backed marketing', value: 100 },
        ],
      },
      {
        id: 'understanding',
        section: 'Comprehension',
        text: 'How well do you understand how this investment works?',
        options: [
          { label: 'I do not understand it at all', value: 0 },
          { label: 'I have a vague idea but cannot explain it clearly', value: 20 },
          { label: 'I understand the basics but not the fee structure', value: 45 },
          { label: 'I understand it well and can explain the risks', value: 80 },
          { label: 'I fully understand it including how they profit if I lose', value: 100 },
        ],
      },
      {
        id: 'loss',
        section: 'Risk Disclosure',
        text: 'Has the operator disclosed what happens if you lose money?',
        options: [
          { label: 'No — only success scenarios are presented', value: 0 },
          { label: 'Vague disclaimer buried in fine print', value: 20 },
          { label: 'Basic risk warning mentioned briefly', value: 50 },
          { label: 'Clear risk disclosure with examples', value: 80 },
          { label: 'Full risk documentation including historical loss rates', value: 100 },
        ],
      },
    ],
    outcomes: [
      {
        id: 'legitimate',
        title: 'Likely Legitimate',
        description: 'Strong indicators of legitimacy. But no tool replaces independent due diligence.',
        detail: 'This opportunity shows strong indicators of legitimacy. However, no tool replaces thorough independent due diligence. Verify regulatory status independently before committing capital.',
        nextSteps: [
          'Proceed with standard due diligence',
          'Verify regulatory registration independently',
          'Start with a small amount you can afford to lose entirely',
        ],
      },
      {
        id: 'caution',
        title: 'Proceed With Caution',
        description: 'Some positive indicators. But the gaps in your assessment are real risks.',
        detail: 'This opportunity has some positive indicators but also significant red flags. The gaps in your assessment represent real risks that need answers before you commit any capital.',
        nextSteps: [
          'Do not invest until every unanswered question has verified information',
          'Get independent advice',
          'If you cannot get clear answers — that is your answer',
        ],
      },
      {
        id: 'high-risk',
        title: 'High Risk — Likely Extractive',
        description: 'Multiple red flags. The architecture of extraction, not creation.',
        detail: 'Multiple red flags are present. This opportunity shows characteristics consistent with predatory financial systems — forex platforms, betting operators, or quick-money schemes designed to extract rather than create value. The pattern of your answers is consistent with systems documented in The House Always Wins.',
        nextSteps: [
          'Do not commit capital until every red flag is resolved',
          'Demand verified independent evidence',
          'Cross-reference against the documented extraction patterns in the book',
        ],
      },
      {
        id: 'critical',
        title: 'Critical — Almost Certainly Predatory',
        description: 'The documented architecture of financial predation in Africa.',
        detail: 'This opportunity scores in the range consistent with forex scams, pyramid schemes, HYIP platforms, and other predatory extraction systems. The combination of factors present here is the documented architecture of financial predation in Africa.',
        nextSteps: [
          'Do not proceed — protect your capital',
          'If you have already invested, seek to withdraw immediately',
          'Share this assessment with anyone introduced to the same opportunity',
        ],
      },
    ],
    calculateResult: (scores) => {
      const totalWeight = INVESTMENT_WEIGHTS.reduce((a, b) => a + b, 0);
      const weighted = Math.round(
        scores.reduce((sum, s, i) => sum + s * (INVESTMENT_WEIGHTS[i] ?? 0), 0) / totalWeight
      );
      let outcomeId = 'critical';
      if (weighted >= 80) outcomeId = 'legitimate';
      else if (weighted >= 60) outcomeId = 'caution';
      else if (weighted >= 35) outcomeId = 'high-risk';
      return { score: weighted, maxScore: 100, outcomeId };
    },
  },

  recovery: {
    id: 'recovery',
    title: 'Recovery Index',
    description: '15 questions across psychological, financial, and behavioral dimensions. Your recovery profile and next step.',
    questions: [
      // Dimension 1 — Psychological Position
      {
        id: 'p1',
        section: 'Psychological Position',
        sectionDesc: 'Where your mind is right now',
        text: 'When you think about the money you lost in forex, betting, or a quick-money scheme — what is your dominant feeling?',
        options: [
          { label: 'Shame and embarrassment — I should have known better', value: 1 },
          { label: 'Anger at myself — I was stupid to fall for it', value: 2 },
          { label: 'Confusion — I still do not fully understand what happened', value: 3 },
          { label: 'Clarity — I understand the system was designed against me', value: 4 },
          { label: 'Acceptance — I have processed it and moved forward', value: 5 },
        ],
      },
      {
        id: 'p2',
        section: 'Psychological Position',
        sectionDesc: 'Where your mind is right now',
        text: 'How do you explain what happened to people close to you?',
        options: [
          { label: 'I do not talk about it — it is too embarrassing', value: 1 },
          { label: 'I say I made a bad decision and leave it at that', value: 2 },
          { label: 'I explain I was misled but am not sure exactly how', value: 3 },
          { label: 'I can explain the system and why it extracted from me', value: 4 },
          { label: 'I actively use my experience to warn and educate others', value: 5 },
        ],
      },
      {
        id: 'p3',
        section: 'Psychological Position',
        sectionDesc: 'Where your mind is right now',
        text: 'How do you feel about people who are still in the forex, betting, or scheme that affected you?',
        options: [
          { label: 'Envious — maybe they will succeed where I failed', value: 1 },
          { label: 'Indifferent — it is their choice', value: 2 },
          { label: 'Concerned but unsure what to say', value: 3 },
          { label: 'I want to warn them but do not know how', value: 4 },
          { label: 'I have already had the conversation with at least one person', value: 5 },
        ],
      },
      {
        id: 'p4',
        section: 'Psychological Position',
        sectionDesc: 'Where your mind is right now',
        text: 'When a new quick-money opportunity appears in your WhatsApp or social media — what is your first reaction?',
        options: [
          { label: 'Curiosity — maybe this one is different', value: 1 },
          { label: 'Temptation — especially if I need to recover what I lost', value: 2 },
          { label: 'Skepticism — but I cannot always explain why', value: 3 },
          { label: 'Recognition — I can identify the red flags immediately', value: 4 },
          { label: 'Complete immunity — I see the architecture instantly and move on', value: 5 },
        ],
      },
      {
        id: 'p5',
        section: 'Psychological Position',
        sectionDesc: 'Where your mind is right now',
        text: 'How do you think about the people who ran the platform or scheme that cost you money?',
        options: [
          { label: 'I blame myself more than them', value: 1 },
          { label: 'I am angry at them but mostly feel foolish', value: 2 },
          { label: 'I see them as dishonest but do not fully understand their model', value: 3 },
          { label: 'I understand they operated a designed extraction system', value: 4 },
          { label: 'I understand the full commercial chain — operator, affiliate, recruiter', value: 5 },
        ],
      },
      // Dimension 2 — Financial Position
      {
        id: 'f1',
        section: 'Financial Position',
        sectionDesc: 'The real state of the damage',
        text: 'How significant was the financial loss relative to your income or savings at the time?',
        options: [
          { label: 'Catastrophic — it wiped out most of what I had', value: 1 },
          { label: 'Severe — it set me back significantly and I am still recovering', value: 2 },
          { label: 'Moderate — painful but manageable over time', value: 3 },
          { label: 'Minor — it did not change my financial position materially', value: 4 },
          { label: 'Minimal — it was a small amount I could afford to lose', value: 5 },
        ],
      },
      {
        id: 'f2',
        section: 'Financial Position',
        sectionDesc: 'The real state of the damage',
        text: 'Did you borrow money — from family, friends, a bank, or a mobile lender — to fund your participation?',
        options: [
          { label: 'Yes — and I still have outstanding debt from it', value: 1 },
          { label: 'Yes — but I have repaid it', value: 2 },
          { label: 'No — but I used money that was earmarked for something important', value: 3 },
          { label: 'No — I used disposable income only', value: 4 },
          { label: 'No — I treated it as a defined risk with money I could lose', value: 5 },
        ],
      },
      {
        id: 'f3',
        section: 'Financial Position',
        sectionDesc: 'The real state of the damage',
        text: 'How long do you realistically estimate full financial recovery will take?',
        options: [
          { label: 'I do not know — it feels impossible right now', value: 1 },
          { label: 'Several years — it is a long road', value: 2 },
          { label: '12 to 24 months with disciplined saving', value: 3 },
          { label: '6 to 12 months — it is manageable', value: 4 },
          { label: 'I have already recovered financially', value: 5 },
        ],
      },
      {
        id: 'f4',
        section: 'Financial Position',
        sectionDesc: 'The real state of the damage',
        text: 'Have you been able to maintain your essential financial commitments since the loss?',
        options: [
          { label: 'No — the loss has directly affected rent, food, or essential bills', value: 1 },
          { label: 'Barely — I have had to make very difficult choices', value: 2 },
          { label: 'Mostly — with some adjustments and sacrifices', value: 3 },
          { label: 'Yes — the loss hurt but did not affect essentials', value: 4 },
          { label: 'Yes — my essential commitments were never at risk', value: 5 },
        ],
      },
      {
        id: 'f5',
        section: 'Financial Position',
        sectionDesc: 'The real state of the damage',
        text: 'Do you currently have any active financial plan to rebuild what you lost?',
        options: [
          { label: 'No — I do not know where to start', value: 1 },
          { label: 'No formal plan — just trying to spend less', value: 2 },
          { label: 'A rough idea but nothing structured', value: 3 },
          { label: 'A clear plan that I am actively following', value: 4 },
          { label: 'A documented plan with specific milestones I am hitting', value: 5 },
        ],
      },
      // Dimension 3 — Behavioral Position
      {
        id: 'b1',
        section: 'Behavioral Position',
        sectionDesc: 'Whether the pattern has actually changed',
        text: 'Since the loss — have you participated in or been tempted by another forex, betting, or quick-money opportunity?',
        options: [
          { label: 'Yes — I have already joined another one to try to recover', value: 1 },
          { label: 'Yes — I have been seriously tempted and almost participated', value: 2 },
          { label: 'I have been approached but held back without fully understanding why', value: 3 },
          { label: 'I have been approached and declined using what I now know', value: 4 },
          { label: 'I identify and dismiss them immediately — no temptation at all', value: 5 },
        ],
      },
      {
        id: 'b2',
        section: 'Behavioral Position',
        sectionDesc: 'Whether the pattern has actually changed',
        text: 'When you think about recovering the money you lost — what is your primary instinct?',
        options: [
          { label: 'Find a faster opportunity to make it back quickly', value: 1 },
          { label: 'Try the same system again but with more discipline this time', value: 2 },
          { label: 'Wait and see if something better comes along', value: 3 },
          { label: 'Build it back slowly through income and savings', value: 4 },
          { label: 'I have accepted the loss and am focused on forward progress only', value: 5 },
        ],
      },
      {
        id: 'b3',
        section: 'Behavioral Position',
        sectionDesc: 'Whether the pattern has actually changed',
        text: 'How have your financial decision-making habits changed since the loss?',
        options: [
          { label: 'They have not changed — I respond the same way to opportunities', value: 1 },
          { label: 'I am more cautious but still get drawn in by the right pitch', value: 2 },
          { label: 'I ask more questions but do not always know what to look for', value: 3 },
          { label: 'I apply a clear framework before considering any opportunity', value: 4 },
          { label: 'My decision architecture is completely rebuilt — I have specific tools I use', value: 5 },
        ],
      },
      {
        id: 'b4',
        section: 'Behavioral Position',
        sectionDesc: 'Whether the pattern has actually changed',
        text: 'Have you avoided all financial decisions since the loss — including legitimate ones?',
        options: [
          { label: 'Yes — I am completely paralyzed and avoiding all financial decisions', value: 1 },
          { label: 'Mostly — I am very risk-averse even about obviously safe choices', value: 2 },
          { label: 'Somewhat — I am cautious but still making basic financial decisions', value: 3 },
          { label: 'No — I distinguish between the systems that hurt me and legitimate options', value: 4 },
          { label: 'No — I am more financially active and deliberate than before', value: 5 },
        ],
      },
      {
        id: 'b5',
        section: 'Behavioral Position',
        sectionDesc: 'Whether the pattern has actually changed',
        text: 'Have you shared what happened to you with anyone who might benefit from knowing?',
        options: [
          { label: 'No — I am too ashamed to talk about it with anyone', value: 1 },
          { label: 'Only with people I completely trust in private', value: 2 },
          { label: 'I have mentioned it but without going into detail', value: 3 },
          { label: 'I have had a meaningful conversation with at least one person about it', value: 4 },
          { label: 'I actively use my experience to protect others from the same systems', value: 5 },
        ],
      },
    ],
    outcomes: [
      {
        id: 'still-exposed',
        title: 'The Still Exposed',
        description: 'The loss happened. The pattern has not changed.',
        detail: 'You experienced a financial loss in a forex platform, betting operator, or quick-money scheme — but the underlying vulnerability that led to that loss is still present. This is the highest-risk recovery profile because the same systems that extracted from you are still capable of doing so again. The urgency to recover lost money quickly is itself the most dangerous psychological state these platforms exploit.',
        nextSteps: [
          'Watch Module 3 of the masterclass: Forex, Betting, Crypto and MLM — The Full Breakdown',
          'Your priority is pattern interruption, not financial recovery',
          'Apply the Investment Analyzer to every opportunity before any decision',
        ],
      },
      {
        id: 'frozen',
        title: 'The Frozen',
        description: 'Psychologically ready to move. Financially paralyzed.',
        detail: 'You have done significant work processing what happened to you. You understand the system that extracted from you. But the financial damage has created a paralysis that is now preventing you from making even legitimate, sensible financial decisions. This avoidance is understandable — but it compounds the damage over time by preventing recovery.',
        nextSteps: [
          'Start with Module 6 of the masterclass: Building Anti-Fragile Financial Habits',
          'Write a simple 90-day financial reset plan — three specific actions',
          'No investment decisions — just income management, debt tracking, and one small saving habit',
        ],
      },
      {
        id: 'rebuilder-carrying',
        title: 'The Rebuilder',
        description: 'Financially recovering. Still carrying the weight of it.',
        detail: 'Your financial recovery is underway and your behavioral patterns have shifted. But the psychological processing of what happened is incomplete. You may still carry shame, confusion, or unexplained guilt. Understanding that the system that extracted from you was architecturally designed to do exactly that — not a reflection of your intelligence — is the missing piece.',
        nextSteps: [
          'Re-read The House Always Wins with your specific experience in mind',
          'The architecture chapters reframe personal failure as structural extraction',
          'Have the conversation you have been avoiding — teaching it is what internalizes it',
        ],
      },
      {
        id: 'recovered',
        title: 'The Recovered',
        description: 'Through it. Genuinely through it.',
        detail: 'You have done the work. Psychologically, financially, and behaviorally — you have processed what happened, you are rebuilding with clarity, and your decision-making has genuinely changed. You are in the rarest recovery profile. The platform that extracted from you did not define you. What you do with the understanding you have now is what matters.',
        nextSteps: [
          'Module 7 of the masterclass — Protecting Your Circle — is built for you',
          'Your experience and recovery is the most powerful resource this ecosystem has',
          'One conversation can protect someone from going through what you went through',
        ],
      },
      {
        id: 'rebuilder-middle',
        title: 'The Rebuilder',
        description: 'In progress. Moving forward but not yet through it.',
        detail: 'Your recovery is underway across all three dimensions but none is fully complete. This is the most common recovery profile — and the most honest one. You are not still exposed, not frozen, and not fully recovered. You are in the messy middle of genuine recovery from a forex, betting, or quick-money scheme loss.',
        nextSteps: [
          'Work through the masterclass in sequence',
          'Identify your lowest dimension — psychological, financial, or behavioral',
          'Focus your energy there first — recovery does not have to be simultaneous',
        ],
      },
    ],
    calculateResult: (scores) => {
      const p = scores.slice(0, 5).reduce((a, b) => a + b, 0);
      const f = scores.slice(5, 10).reduce((a, b) => a + b, 0);
      const b = scores.slice(10, 15).reduce((a, b) => a + b, 0);
      const total = p + f + b;
      const max = 75;
      const pct = Math.round((total / max) * 100);

      let outcomeId = 'rebuilder-middle';
      if (b <= 10 || (p <= 10 && b <= 12)) outcomeId = 'still-exposed';
      else if (b >= 18 && f <= 12) outcomeId = 'frozen';
      else if (p <= 12 && f >= 15) outcomeId = 'rebuilder-carrying';
      else if (pct >= 70) outcomeId = 'recovered';

      return {
        score: total,
        maxScore: max,
        outcomeId,
        dimensionScores: { Psychological: p, Financial: f, Behavioral: b },
      };
    },
  },
};
