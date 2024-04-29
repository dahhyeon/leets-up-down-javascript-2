const MyUtils = require("../Utils/MyUtils");

class App {
  async play() {
    MyUtils.Console.print("업다운 게임을 시작합니다.\n");
    try {
      const version = await this.versionCheck();
      const answer = this.generateAnswer(version);
      await this.upDownGame(version, answer);
    } catch (error) {
      throw new Error(`[ERROR] ${error.message}`);
    }
  }

  async versionCheck() {
    MyUtils.Console.print(
      "버전을 입력해주세요 (숫자 버전: 1, 영어 버전: 2) : "
    );
    const version = await MyUtils.Console.readLineAsync();
    if (!(version === "1" || version === "2")) {
      throw new Error("존재하지 않는 버전입니다.");
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

  async upDownGame(version, answer) {
    let try_count = 0;
    let inputNum;
    let inputAlphabet;
    let min;
    let max;
    let minEng;
    let maxEng;
    if (version === "1") {
      min = 1;
      max = 100;
    } else {
      minEng = "A";
      maxEng = "z";
    }

    while (true) {
      //숫자일 때
      try {
        if (version === "1") {
          MyUtils.Console.print(`숫자를 입력해주세요(${min} ~ ${max}) : `);
          inputNum = await MyUtils.Console.readLineAsync();
          try_count++;

          if (!inputNum.match(/^[0-9]+$/)) {
            throw new Error("입력 문자의 타입이 맞지 않습니다. ");
          }

          if (min > inputNum || inputNum > max) {
            throw new Error("범위 내의 숫자를 입력하세요.");
          }
        }
        //영어일 때
        else if (version === "2") {
          MyUtils.Console.print(
            `영어를 입력해주세요(${minEng} ~ ${maxEng}) : `
          );
          inputAlphabet = await MyUtils.Console.readLineAsync();
          try_count++;

          if (!inputAlphabet.match(/^[A-Za-z]$/)) {
            throw new Error("입력 문자의 타입이 맞지 않습니다.");
          }

          if (minEng > inputAlphabet || inputAlphabet > maxEng) {
            throw new Error("범위 내의 알파벳을 입력하세요.");
          }
        }

        // 숫자일 경우
        if (version === "1") {
          if (parseInt(inputNum) === parseInt(answer)) {
            MyUtils.Console.print("정답!");
            break;
          } else if (parseInt(inputNum) < parseInt(answer)) {
            MyUtils.Console.print("UP");
            min = parseInt(inputNum) + 1;
          } else {
            MyUtils.Console.print("DOWN");
            max = parseInt(inputNum) - 1;
          }
        }
        // 영어일 경우
        else {
          if (String(inputAlphabet) === String(answer)) {
            MyUtils.Console.print("정답!");
            break;
          } else if (String(inputAlphabet) < String(answer)) {
            MyUtils.Console.print("UP");
            minEng = String.fromCharCode(inputAlphabet.charCodeAt(0) + 1);
          } else {
            MyUtils.Console.print("DOWN");
            maxEng = String.fromCharCode(inputAlphabet.charCodeAt(0) - 1);
          }
        }
      } catch (error) {
        MyUtils.Console.print(`[ERROR] ${error.message}`);
      }
    }

    MyUtils.Console.print(`시도한 횟수 : ${try_count}회`);
  }
}

module.exports = App;
