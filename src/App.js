const MyUtils = require("../Utils/MyUtils");

class App {
  async play() {
    MyUtils.Console.print("업다운 게임을 시작합니다.");
    const version = await this.versionCheck();

    this.generateAnswer(version);

    this.upDownGame(version);
  }

  async versionCheck() {
    MyUtils.Console.print("버전을 입력해주세요. (숫자 버전: 1, 영어 버전: 2) ");
    const version = await MyUtils.Console.readLineAsync();
    if (!(version === "1" || version === "2")) {
      throw new Error("[ERROR] 존재하지 않는 버전입니다.");
    }
    return version;
  }

  //정답 리턴
  generateAnswer(version) {
    if (version === "1") {
      return Math.floor(Math.random() * 100) + 1;
    } else if (version === "2") {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      const answerIndex = Math.floor(Math.random() * alphabet.length);
      return alphabet.charAt(answerIndex);
    }
  }

  async upDownGame(version) {
    let try_count = 0;
    let inputNum, inputAlphabet;
    let answerNum = this.generateAnswer("1");
    // console.log(answerNum);
    let answerAlphabet = this.generateAnswer("2");
    console.log(answerAlphabet);
    let min = 1,
      max = 100;
    let minEng = "A",
      maxEng = "z";

    while (true) {
      //숫자일 때
      try {
        if (version === "1") {
          MyUtils.Console.print(`숫자를 입력해주세요(${min} ~ ${max}) :`);
          inputNum = await MyUtils.Console.readLineAsync();
          try_count++;
          // 예외1. 입력 문자의 타입
          if (!inputNum.match(/^[0-9]+$/)) {
            MyUtils.Console.print("[ERROR] 입력 문자의 타입이 맞지 않습니다. ");
            continue;
          }

          // 예외2. 범위 내 값 입력
          if (min > inputNum || inputNum > max) {
            MyUtils.Console.print("[ERROR] 범위 내의 숫자를 입력하세요.");
            continue;
          }
        }
        //영어일 때
        else if (version === "2") {
          MyUtils.Console.print(`영어를 입력해주세요(${minEng} ~ ${maxEng}) :`);
          inputAlphabet = await MyUtils.Console.readLineAsync();
          try_count++;
          //예외1. 입력문자의 타입
          if (!inputAlphabet.match(/^[A-Za-z]$/)) {
            MyUtils.Console.print("[ERROR] 입력 문자의 타입이 맞지 않습니다.");
            continue;
          }
          //예외2. 범위 내 값 입력   -> 수정 요망
          if (minEng > inputAlphabet || inputAlphabet > maxEng) {
            MyUtils.Console.print("[ERROR] 범위 내의 영어를 입력하세요.");
            continue;
          }
        }
      } catch (error) {
        throw new Error(`[ERROR] ${error.message}`);
      }

      // 숫자일 경우
      if (version === "1") {
        if (parseInt(inputNum) === parseInt(answerNum)) {
          MyUtils.Console.print("정답!");
          break;
        } else if (parseInt(inputNum) < parseInt(answerNum)) {
          MyUtils.Console.print("UP");
          min = parseInt(inputNum) + 1;
        } else {
          MyUtils.Console.print("DOWN");
          max = parseInt(inputNum) - 1;
        }
      }

      // 영어일 경우
      else {
        // 입력값 == 정답값
        if (String(inputAlphabet) === String(answerAlphabet)) {
          MyUtils.Console.print("정답!");
          break;
        }
        // 입력값 < 정답값
        else if (String(inputAlphabet) < String(answerAlphabet)) {
          MyUtils.Console.print("UP");
          minEng = String.fromCharCode(inputAlphabet.charCodeAt(0) + 1);
          console.log(minEng);
        } else {
          MyUtils.Console.print("DOWN");
          maxEng = String.fromCharCode(inputAlphabet.charCodeAt(0) - 1);
          console.log(maxEng);
        }
      }
    }
    MyUtils.Console.print(`시도한 횟수 : ${try_count}`);
  }
}

module.exports = App;
