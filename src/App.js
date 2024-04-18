const MyUtils = require("../Utils/MyUtils");

class App {
  async play() {
    MyUtils.Console.print("업다운 게임을 시작합니다.");
    const version = await this.versionCheck();

    this.generateAnswer();
    if (version == 1) {
      await this.numCheck();
    } else await this.alphaCheck();
  }

  async versionCheck() {
    MyUtils.Console.print("버전을 입력해주세요. (숫자 버전: 1, 영어 버전: 2) ");
    const version = await MyUtils.Console.readLineAsync();
    if (!(version == 1 || version == 2)) {
      throw new Error("[ERROR] 존재하지 않는 버전입니다.");
    }
    return version;
  }

  //정답 리턴
  async generateAnswer(version) {
    if (version == 1) {
      return Math.floor(Math.random() * 101);
    } else if (version == 2) {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      const answerIndex = Math.floor(Math.random() * alphabet.length);
      return alphabet.charAt(answerIndex);
    }
  }

  async numCheck() {
    MyUtils.Console.print("숫자를 입력해주세요(1 ~ 100) :");
    const answerNum = await this.generateAnswer(1);
    let InputNum = await MyUtils.Console.readLineAsync();

    await this.compareUntilMatch(answerNum, InputNum);
    return answerNum;
  }

  async alphaCheck() {
    MyUtils.Console.print("영어를 입력해주세요(A ~ z) :");
    const answerAlphabet = await this.generateAnswer(2);
    let InputAlphabet = await MyUtils.Console.readLineAsync();

    this.compareUntilMatch(answerAlphabet, InputAlphabet);
    return answerAlphabet;
  }

  // 입력값과 정답값 비교
  async compareUntilMatch(answer, input) {
    let try_count = 0;

    while (true) {
      try_count++;

      // 범위 내 숫자 혹은 영어인지 확인
      //숫자일 때
      if (typeof answer === "number" && typeof answer === "number") {
        if (!(1 <= input && input <= 100)) {
          MyUtils.Console.print("[ERROR] 범위 내의 숫자를 입력하세요.");
          input = await MyUtils.Console.readLineAsync();
        }
      }
      // 영어일 때
      else {
        if (!/^[A-Za-z]$/.test(input)) {
          MyUtils.Console.print(
            "[ERROR] 범위 내의 알파벳을 입력해주세요(A ~ z) : "
          );
          input = await MyUtils.Console.readLineAsync();
        }
      }

      // 입력값이 정답값보다 클 때

      if (answer < input) {
        MyUtils.Console.print("DOWN");
        if (typeof answer === "number" && typeof answer === "number") {
          MyUtils.Console.print(`숫자를 입력해주세요(1 ~ ${input - 1} ):`);
        } else {
          MyUtils.Console.print(
            `영어를 입력해주세요(A ~ ${String.fromCharCode(
              input.charCodeAt(0) - 1
            )}):`
          );
        }
        input = await MyUtils.Console.readLineAsync();

        // if (!(1 <= input && input < input - 1) {
        //   MyUtils.Console.print("[ERROR] 범위 내의 숫자를 입력하세요.");
        // }
      }
      // 입력값이 정답값보다 작을 때
      else if (answer > input) {
        MyUtils.Console.print("UP");
        if (typeof answer === "number" && typeof answer === "number") {
          MyUtils.Console.print(
            `숫자를 입력해주세요(${parseInt(input) + 1} ~ 100) : `
          );
        } else {
          MyUtils.Console.print(
            `영어를 입력해주세요(${String.fromCharCode(
              input.charCodeAt(0) + 1
            )} ~ z): `
          );
        }
        input = await MyUtils.Console.readLineAsync();

        // if (!(input + 1 <= answer && answer <= 100)) {
        //   MyUtils.Console.print("[ERROR] 범위 내의 숫자를 입력하세요.");
        //   continue;
        // }
      }
      // 정답값 === 입력값
      else {
        MyUtils.Console.print("정답!");
        MyUtils.Console.print(`시도한 횟수 : ${try_count}회`);
        break;
      }
    }
  }
}

module.exports = App;
