// ====== 質問文と選択肢 ======
const questions = [
  {
    question: "Q1. 衛生学的手洗いの注意すべきポイントは？",
    choices: [
      { text: "指先、母指、手首まで洗う", score: 1 },
      { text: "洗い終わったら自分のハンカチで手を拭く", score: 0 },
      { text: "消毒液が乾く前にケアを始める", score: 0 }
    ]
  },
  {
    question: "Q2. 注射器を扱うときに触ってはいけないのは？",
    choices: [
      { text: "針管", score: 1 },
      { text: "外筒", score: 0 },
      { text: "内筒頭", score: 0 }
    ]
  },
  {
    question: "Q3. 病室の環境整備として最適な湿度は？",
    choices: [
      { text: "50%", score: 1 },
      { text: "30%", score: 0 },
      { text: "70%", score: 0 }
    ]
  },
  {
    question: "Q4. 脈拍測定を行うときに確認する動脈は？",
    choices: [
      { text: "橈骨動脈", score: 1 },
      { text: "尺骨動脈", score: 0 },
      { text: "上腕動脈", score: 0 }
    ]
  },
  {
    question: "Q5. 体位変換で仰臥位から側臥位とするときに<br>支えるべき場所は？",
    choices: [
      { text: "肩と膝", score: 1 },
      { text: "肩と背中", score: 0 },
      { text: "頭と膝", score: 0 }
    ]
  },
  {
    question: "Q6. 臥床患者さんがいるとき、<br>2人でシーツ交換を行う場合のポイントは？",
    choices: [
      { text: "シーツは内巻きに丸める", score: 1 },
      { text: "はじめに枕カバーを交換する", score: 0 },
      { text: "患者さんの背面にベッド柵を設置する", score: 0 }
    ]
  },
  {
    question: "Q7. 清拭時に皮膚にあたるタオルの<br>適切な表面温度は次のうちどれ？",
    choices: [
      { text: "40～45℃", score: 1 },
      { text: "50～55°C", score: 0 },
      { text: "60～65℃", score: 0 }
    ]
  },
  {
    question: "Q8. 患者さんの意識障害レベルを<br>評価する指標は？",
    choices: [
      { text: "JCS", score: 1 },
      { text: "NRS", score: 0 },
      { text: "FIM", score: 0 }
    ]
  },
  {
    question: "Q9. 血小板の数値が基準値を下回っているとき、<br>まず疑うべき症状は次のうちどれ？",
    choices: [
      { text: "出血", score: 1 },
      { text: "高血糖", score: 0 },
      { text: "低栄養", score: 0 }
    ]
  },
  {
    question: "Q10. 食事介助をはじめるとき<br>誤嚥を防ぐためとるべき行動は？",
    choices: [
      { text: "患者さんに最初に水分摂取をしてもらう", score: 1 },
      { text: "患者さんにエプロンを身に着けてもらう", score: 0 },
      { text: "患者さんに頸部を後屈してもらう", score: 0 }
    ]
  }
];

// ====== 結果パターン ======
const results = [
  {
    range: [0, 5],
    text: "【これからの準備がカギ】タイプ！<br>クイックノートで<br>実習中に指導者さんに<br>聞かれやすい内容を<br>チェックしておこう！"
  },
  {
    range: [6, 8],
    text: "【とりあえず準備完了】タイプ！<br>クイックノートで<br>実習で受け持つ患者さんの<br>疾患やケアについて<br>再度チェックしておこう！"
  },
  {
    range: [9, 10],
    text: "【準備ばっちり】タイプ！<br>友だちもサポートできるように<br>さらに必要だと思うことを<br>クイックノートに書き込もう！"
  }
];

// ====== 状態変数 ======
let currentQuestion = 0;
let score = 0;

const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const startBtn = document.getElementById("startBtn");
const startImage = document.getElementById("startImage"); // ← 追加

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  startBtn.style.display = "none";
  if (startImage) startImage.style.display = "none"; // ← スタート時に画像を非表示
  showQuestion();
}

function showQuestion() {
  if (currentQuestion < questions.length) {
    const q = questions[currentQuestion];
    const shuffledChoices = [...q.choices].sort(() => Math.random() - 0.5);
    quizEl.innerHTML = `
      <h2>${q.question}</h2>
      ${shuffledChoices
        .map(
          (choice) =>
            `<button class="choice-btn" onclick="answer(event, ${choice.score}, this)">${choice.text}</button>`
        )
        .join("")}
    `;
  } else {
    showResult();
  }
}

function answer(event, scoreValue, btn) {
  if (event) event.preventDefault();

  // いったんすべての選択肢ボタンから「selected」を外す
  const buttons = quizEl.querySelectorAll("button");
  buttons.forEach((b) => b.classList.remove("selected"));

  // 今押されたボタンに「selected」を付ける
  if (btn) {
    btn.classList.add("selected");
  }

  score += scoreValue;

  // 0.3秒後に次の質問へ
  setTimeout(() => {
    currentQuestion++;
    showQuestion();
  }, 300);
}

function showResult() {
  quizEl.innerHTML = "";
  let resultText = "診断結果が見つかりませんでした。";

  for (let r of results) {
    if (score >= r.range[0] && score <= r.range[1]) {
      resultText = r.text;
    }
  }

  resultEl.innerHTML = `
    <div class="result-card">
      <h2>診断結果</h2>
      <p>${resultText}</p>
      <p>(あなたのスコア: ${score} / 10)</p>
      <img src="nezumi_b.png" alt="診断結果画像" class="result-image">
      <a href="https://www.shorinsha.co.jp/search/s100883.html" 
         class="result-link" target="_blank">
        クイックノートのサイトを<br>チェックしてみる
      </a>
    </div>
  `;
}
